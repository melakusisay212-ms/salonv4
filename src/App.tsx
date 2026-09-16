import { useEffect, useState } from "react";
import Header from "./components/Header";
import BottomNav, { TabKey } from "./components/BottomNav";
import DueListPage from "./pages/DueListPage";
import ClientsPage from "./pages/ClientsPage";
import SettingsPage from "./pages/SettingsPage";
import { onLangChange, t } from "./i18n/i18n";
import { todayIso, tomorrowIso } from "./utils/ethiopianCalendar";

export default function App() {
  const [tab, setTab] = useState<TabKey>("today");
  const [, forceRerender] = useState(0);

  useEffect(() => onLangChange(() => forceRerender((n) => n + 1)), []);

  const titleForTab: Record<TabKey, string> = {
    today: t("nav.today"),
    tomorrow: t("nav.tomorrow"),
    clients: t("nav.clients"),
    settings: t("nav.settings"),
  };

  return (
    <div className="app-shell">
      <Header title={titleForTab[tab]} />
      <div className="app-content">
        {tab === "today" && (
          <DueListPage dateIso={todayIso()} titleKey="today_tab.title" emptyKey="today_tab.empty" />
        )}
        {tab === "tomorrow" && (
          <DueListPage dateIso={tomorrowIso()} titleKey="tomorrow_tab.title" emptyKey="tomorrow_tab.empty" />
        )}
        {tab === "clients" && <ClientsPage />}
        {tab === "settings" && <SettingsPage />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
