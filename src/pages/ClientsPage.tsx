import { useEffect, useState, useCallback, useMemo } from "react";
import type { Client } from "../db/database";
import { getAllClients, addClient, updateClient, deleteClient, markClientDone } from "../db/database";
import { t } from "../i18n/i18n";
import ClientCard from "../components/ClientCard";
import ClientFormModal, { ClientFormValue } from "../components/ClientFormModal";
import ConfirmModal from "../components/ConfirmModal";

type Filter = "all" | "new" | "returning";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Client | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const [doneTarget, setDoneTarget] = useState<Client | null>(null);

  const load = useCallback(async () => {
    setClients(await getAllClients());
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (filter !== "all" && c.status !== filter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return c.fullName.toLowerCase().includes(q) || c.phone.includes(q);
      }
      return true;
    });
  }, [clients, query, filter]);

  return (
    <div>
      <div className="search-bar">
        <span>{"\ud83d\udd0d"}</span>
        <input placeholder={t("common.search")} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="filter-chips">
        <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>{t("client.filter_all")}</button>
        <button className={`chip ${filter === "new" ? "active" : ""}`} onClick={() => setFilter("new")}>{t("client.filter_new")}</button>
        <button className={`chip ${filter === "returning" ? "active" : ""}`} onClick={() => setFilter("returning")}>{t("client.filter_returning")}</button>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">{clients.length === 0 ? t("client.no_clients") : t("client.no_results")}</div>
      )}

      {filtered.map((c) => (
        <ClientCard
          key={c.id}
          client={c}
          onEdit={() => setEditTarget(c)}
          onDelete={() => setDeleteTarget(c)}
          onMarkDone={() => setDoneTarget(c)}
        />
      ))}

      <button className="fab" onClick={() => setShowForm(true)}>+</button>

      {showForm && (
        <ClientFormModal
          onCancel={() => setShowForm(false)}
          onSave={async (value: ClientFormValue) => {
            await addClient(value);
            setShowForm(false);
            load();
          }}
        />
      )}

      {editTarget && (
        <ClientFormModal
          initial={editTarget}
          onCancel={() => setEditTarget(null)}
          onSave={async (value: ClientFormValue) => {
            await updateClient({ ...editTarget, ...value });
            setEditTarget(null);
            load();
          }}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          message={t("client.delete_confirm")}
          danger
          onCancel={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await deleteClient(deleteTarget.id);
            setDeleteTarget(null);
            load();
          }}
        />
      )}

      {doneTarget && (
        <ConfirmModal
          message={t("client.mark_done_confirm", { name: doneTarget.fullName })}
          onCancel={() => setDoneTarget(null)}
          onConfirm={async () => {
            await markClientDone(doneTarget.id);
            setDoneTarget(null);
            load();
          }}
        />
      )}
    </div>
  );
}
