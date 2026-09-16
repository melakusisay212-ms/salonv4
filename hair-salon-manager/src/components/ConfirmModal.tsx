import { t } from "../i18n/i18n";

export default function ConfirmModal({
  message,
  danger,
  onCancel,
  onConfirm,
}: {
  message: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ paddingBottom: 24 }}>
        <div className="modal-title">{t("common.confirm")}</div>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: 18 }}>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>{t("common.cancel")}</button>
          <button className={`btn ${danger ? "btn-danger" : "btn-success"}`} onClick={onConfirm}>
            {t("common.yes")}
          </button>
        </div>
      </div>
    </div>
  );
}
