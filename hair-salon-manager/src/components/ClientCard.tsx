import type { Client } from "../db/database";
import { t } from "../i18n/i18n";
import { formatEthiopian } from "../utils/ethiopianCalendar";
import { FREQUENCY_LABEL_KEY } from "../utils/dateCalc";

interface Props {
  client: Client;
  showSmsStatus?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMarkDone: () => void;
  onSendSms?: () => void;
}

export default function ClientCard({ client, showSmsStatus, onEdit, onDelete, onMarkDone, onSendSms }: Props) {
  return (
    <div className="card client-card">
      <div className="client-card-top">
        <div>
          <div className="client-name">{client.fullName}</div>
          <div className="client-phone">{client.phone}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <span className={`badge ${client.status === "new" ? "badge-new" : "badge-returning"}`}>
            {client.status === "new" ? t("client.status_new") : t("client.status_returning")}
          </span>
          {client.cyclesCompleted > 0 && (
            <span className="badge badge-loyal">{t("client.loyal_badge", { count: client.cyclesCompleted })}</span>
          )}
        </div>
      </div>

      <div className="client-meta-row">
        <span>{t(FREQUENCY_LABEL_KEY[client.frequency])}</span>
        <span>{client.nextExpectedDate ? formatEthiopian(client.nextExpectedDate) : "-"}</span>
      </div>

      {showSmsStatus && (
        <div>
          <span className={`badge ${client.smsSentForNextDate ? "badge-sent" : "badge-not-sent"}`}>
            {client.smsSentForNextDate ? `\u2713 ${t("sms.sent")}` : `\u25cb ${t("sms.not_sent")}`}
          </span>
        </div>
      )}

      <div className="client-actions">
        {onSendSms && (
          <button className="btn btn-primary" onClick={onSendSms}>{t("sms.send")}</button>
        )}
        <button className="btn btn-success" onClick={onMarkDone}>{t("client.mark_done")}</button>
      </div>
      <div className="client-actions">
        <button className="btn btn-secondary" onClick={onEdit}>{t("common.edit")}</button>
        <button className="btn btn-danger" onClick={onDelete}>{t("common.delete")}</button>
      </div>
    </div>
  );
}
