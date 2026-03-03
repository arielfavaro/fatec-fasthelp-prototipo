import { useState, useMemo } from 'react';
import { FiPlus, FiSearch, FiMonitor } from 'react-icons/fi';
import { equipment, clients, getClientById } from '../data/mockData';
import Button from '../components/Button';
import Modal from '../components/Modal';
import './Equipment.css';

export default function Equipment() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [localEquipment, setLocalEquipment] = useState(equipment);
  const [form, setForm] = useState({ type: '', brand: '', model: '', serialNumber: '', serviceTag: '', clientId: '' });

  const filtered = useMemo(() => {
    if (!search.trim()) return localEquipment;
    const q = search.toLowerCase();
    return localEquipment.filter(e => {
      const client = getClientById(e.clientId);
      return (
        e.brand.toLowerCase().includes(q) ||
        e.model.toLowerCase().includes(q) ||
        e.serialNumber.toLowerCase().includes(q) ||
        e.serviceTag.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q) ||
        (client?.name || '').toLowerCase().includes(q)
      );
    });
  }, [search, localEquipment]);

  function handleAdd() {
    if (!form.type || !form.brand || !form.model || !form.serialNumber) return;
    const newEquip = {
      id: Date.now(),
      ...form,
      clientId: Number(form.clientId) || null,
    };
    setLocalEquipment(prev => [...prev, newEquip]);
    setShowModal(false);
    setForm({ type: '', brand: '', model: '', serialNumber: '', serviceTag: '', clientId: '' });
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header page-header-actions">
        <div>
          <h1>Equipamentos</h1>
          <p>Inventário de equipamentos cadastrados</p>
        </div>
        <Button icon={<FiPlus />} onClick={() => setShowModal(true)}>Novo Equipamento</Button>
      </div>

      <div className="equipment-toolbar">
        <div className="equipment-search">
          <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Buscar por marca, modelo, nº série..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="search-equipment"
          />
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{filtered.length} equipamento(s)</span>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Nº Série</th>
            <th>Service Tag</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: 40 }}>Nenhum equipamento encontrado.</td></tr>
          )}
          {filtered.map(eq => {
            const client = getClientById(eq.clientId);
            return (
              <tr key={eq.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FiMonitor style={{ color: 'var(--primary-400)' }} />
                    {eq.type}
                  </div>
                </td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{eq.brand}</td>
                <td>{eq.model}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{eq.serialNumber}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{eq.serviceTag}</td>
                <td>{client?.name || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <Modal
          title="Novo Equipamento"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleAdd}>Cadastrar</Button>
            </>
          }
        >
          <div className="modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Tipo</label>
                <select className="form-control" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  <option value="">Selecione</option>
                  <option value="Notebook">Notebook</option>
                  <option value="Desktop">Desktop</option>
                  <option value="All-in-One">All-in-One</option>
                  <option value="Servidor">Servidor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input className="form-control" placeholder="Ex: Dell, HP, Lenovo" value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Modelo</label>
              <input className="form-control" placeholder="Ex: Inspiron 15" value={form.model} onChange={e => setForm(p => ({ ...p, model: e.target.value }))} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Nº Série</label>
                <input className="form-control" placeholder="Número de série" value={form.serialNumber} onChange={e => setForm(p => ({ ...p, serialNumber: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Service Tag</label>
                <input className="form-control" placeholder="Service Tag" value={form.serviceTag} onChange={e => setForm(p => ({ ...p, serviceTag: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Cliente</label>
              <select className="form-control" value={form.clientId} onChange={e => setForm(p => ({ ...p, clientId: e.target.value }))}>
                <option value="">Selecione o cliente</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
