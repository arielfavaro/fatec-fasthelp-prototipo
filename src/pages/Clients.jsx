import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiMail, FiPhone, FiMonitor, FiClipboard, FiUser } from 'react-icons/fi';
import { clients, equipment, tickets, getStatusInfo } from '../data/mockData';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import './Clients.css';

export default function Clients() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [localClients, setLocalClients] = useState(clients);
  const [form, setForm] = useState({ name: '', cpf: '', cnpj: '', email: '', phone: '' });
  const [docType, setDocType] = useState('cpf');

  const filtered = useMemo(() => {
    if (!search.trim()) return localClients;
    const q = search.toLowerCase();
    return localClients.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.cpf || '').includes(q) ||
      (c.cnpj || '').includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q)
    );
  }, [search, localClients]);

  function handleAdd() {
    if (!form.name || (!form.cpf && !form.cnpj)) return;
    const newClient = {
      id: Date.now(),
      name: form.name,
      cpf: docType === 'cpf' ? form.cpf : undefined,
      cnpj: docType === 'cnpj' ? form.cnpj : undefined,
      email: form.email,
      phone: form.phone,
    };
    setLocalClients(prev => [...prev, newClient]);
    setShowModal(false);
    setForm({ name: '', cpf: '', cnpj: '', email: '', phone: '' });
  }

  function getClientEquipment(clientId) {
    return equipment.filter(e => e.clientId === clientId);
  }

  function getClientTickets(clientId) {
    return tickets.filter(t => t.clientId === clientId);
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header page-header-actions">
        <div>
          <h1>Clientes</h1>
          <p>Gerencie os clientes e veja seus equipamentos e chamados</p>
        </div>
        <Button icon={<FiPlus />} onClick={() => setShowModal(true)}>Novo Cliente</Button>
      </div>

      <div className="clients-toolbar">
        <div className="clients-search">
          <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Buscar por nome, CPF/CNPJ, e-mail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="search-clients"
          />
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{filtered.length} cliente(s)</span>
      </div>

      <div className="clients-grid">
        {filtered.map(client => {
          const clientEquip = getClientEquipment(client.id);
          const clientTickets = getClientTickets(client.id);
          const initials = client.name.split(' ').map(n => n[0]).slice(0, 2).join('');

          return (
            <div className="client-card" key={client.id}>
              <div className="client-card-top">
                <div className="client-avatar">{initials}</div>
                <div>
                  <div className="client-name">{client.name}</div>
                  <div className="client-doc">{client.cpf || client.cnpj}</div>
                </div>
              </div>

              <div className="client-contact">
                {client.email && (
                  <div className="client-contact-row">
                    <FiMail size={14} />
                    {client.email}
                  </div>
                )}
                {client.phone && (
                  <div className="client-contact-row">
                    <FiPhone size={14} />
                    {client.phone}
                  </div>
                )}
              </div>

              {/* Equipment */}
              <div className="client-section-title">
                <FiMonitor size={12} />
                Equipamentos ({clientEquip.length})
              </div>
              {clientEquip.length === 0 ? (
                <div className="client-empty">Nenhum equipamento cadastrado</div>
              ) : (
                <div className="client-equip-list">
                  {clientEquip.map(eq => (
                    <div className="client-equip-item" key={eq.id}>
                      <FiMonitor size={14} />
                      <span className="client-equip-model">{eq.brand} {eq.model}</span>
                      <span className="client-equip-serial">{eq.serialNumber}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tickets */}
              <div className="client-section-title" style={{ marginTop: 8 }}>
                <FiClipboard size={12} />
                Chamados ({clientTickets.length})
              </div>
              {clientTickets.length === 0 ? (
                <div className="client-empty">Nenhum chamado registrado</div>
              ) : (
                <div className="client-ticket-list">
                  {clientTickets.map(ticket => {
                    const st = getStatusInfo(ticket.status);
                    return (
                      <Link to={`/chamados/${ticket.id}`} className="client-ticket-link" key={ticket.id}>
                        <span>
                          <span className="ticket-id">#{ticket.id}</span>
                          {ticket.title.length > 28 ? ticket.title.substring(0, 28) + '...' : ticket.title}
                        </span>
                        <Badge label={st?.label} color={st?.color} dot={false} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px', fontSize: '0.9rem' }}>
          Nenhum cliente encontrado com os filtros selecionados.
        </div>
      )}

      {/* New Client Modal */}
      {showModal && (
        <Modal
          title="Novo Cliente"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleAdd}>Cadastrar</Button>
            </>
          }
        >
          <div className="modal-form">
            <div className="form-group">
              <label>Nome completo / Razão Social</label>
              <input className="form-control" placeholder="Nome do cliente" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Tipo de documento</label>
              <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <input type="radio" name="docType" checked={docType === 'cpf'} onChange={() => setDocType('cpf')} />
                  CPF (Pessoa Física)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <input type="radio" name="docType" checked={docType === 'cnpj'} onChange={() => setDocType('cnpj')} />
                  CNPJ (Pessoa Jurídica)
                </label>
              </div>
              {docType === 'cpf' ? (
                <input className="form-control" placeholder="000.000.000-00" value={form.cpf} onChange={e => setForm(p => ({ ...p, cpf: e.target.value }))} />
              ) : (
                <input className="form-control" placeholder="00.000.000/0000-00" value={form.cnpj} onChange={e => setForm(p => ({ ...p, cnpj: e.target.value }))} />
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>E-mail</label>
                <input className="form-control" type="email" placeholder="email@exemplo.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input className="form-control" placeholder="(00) 00000-0000" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
