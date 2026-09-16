import { t } from "../i18n/i18n";

export type TabKey = "today" | "tomorrow" | "clients" | "settings";

const TABS: { key: TabKey; icon: string; labelKey: string }[] = [
  { key: "today", icon: "\ud83d\udcc5", labelKey: "nav.today" },
  { key: "tomorrow", icon: "\u23e9", labelKey: "nav.tomorrow" },
  { key: "clients", icon: "\ud83d\udc65", labelKey: "nav.clients" },
  { key: "settings", icon: "\u2699\ufe0f", labelKey: "nav.settings" },
];

export default function BottomNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button key={tab.key} className={active === tab.key ? "active" : ""} onClick={() => onChange(tab.key)}>
          <span className="icon">{tab.icon}</span>
          <span>{t(tab.labelKey)}</span>
        </button>
      ))}
    </nav>
  );
}
