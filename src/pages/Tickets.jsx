import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { tickets, STATUS_LIST, PRIORITY_LIST, CATEGORY_LIST, technicians, getClientById, getTechnicianById, getStatusInfo, getPriorityInfo } from '../data/mockData';
import { formatDateShort } from '../utils/sla';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './Tickets.css';

const PAGE_SIZE = 6;

export default function Tickets() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...tickets];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t => {
        const client = getClientById(t.clientId);
        return (
          String(t.id).includes(q) ||
          t.title.toLowerCase().includes(q) ||
          (client?.name || '').toLowerCase().includes(q) ||
          (client?.cpf || '').includes(q) ||
          (client?.cnpj || '').includes(q)
        );
      });
    }

    if (statusFilter) result = result.filter(t => t.status === statusFilter);
    if (priorityFilter) result = result.filter(t => t.priority === priorityFilter);
    if (categoryFilter) result = result.filter(t => t.category === categoryFilter);
    if (techFilter) result = result.filter(t => String(t.technicianId) === techFilter);

    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [search, statusFilter, priorityFilter, categoryFilter, techFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageTickets = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="animate-fade-in">
      <div className="page-header page-header-actions">
        <div>
          <h1>Chamados</h1>
          <p>Gerencie todos os chamados de suporte</p>
        </div>
        <Link to="/chamados/novo">
          <Button icon={<FiPlus />}>Novo Chamado</Button>
        </Link>
      </div>

      <div className="tickets-filters">
        <div style={{ position: 'relative' }}>
          <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            className="filter-input filter-input-search"
            type="text"
            placeholder="Buscar por ID, título, CPF/CNPJ..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ paddingLeft: 36 }}
            id="search-tickets"
          />
        </div>
        <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} id="filter-status">
          <option value="">Todos os Status</option>
          {STATUS_LIST.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <select className="filter-select" value={priorityFilter} onChange={e => { setPriorityFilter(e.target.value); setPage(1); }} id="filter-priority">
          <option value="">Todas Prioridades</option>
          {PRIORITY_LIST.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
        </select>
        <select className="filter-select" value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }} id="filter-category">
          <option value="">Todas Categorias</option>
          {CATEGORY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={techFilter} onChange={e => { setTechFilter(e.target.value); setPage(1); }} id="filter-tech">
          <option value="">Todos Técnicos</option>
          <option value="null">Não atribuído</option>
          {technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="results-count">{filtered.length} chamado(s) encontrado(s)</div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Técnico</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          {pageTickets.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' }}>
                Nenhum chamado encontrado com os filtros selecionados.
              </td>
            </tr>
          )}
          {pageTickets.map(ticket => {
            const client = getClientById(ticket.clientId);
            const tech = getTechnicianById(ticket.technicianId);
            const status = getStatusInfo(ticket.status);
            const priority = getPriorityInfo(ticket.priority);
            return (
              <tr key={ticket.id}>
                <td><Link to={`/chamados/${ticket.id}`} className="ticket-id">#{ticket.id}</Link></td>
                <td className="ticket-title text-truncate">{ticket.title}</td>
                <td style={{ fontSize: '0.8rem' }}>{ticket.category}</td>
                <td>{client?.name || '—'}</td>
                <td><Badge label={status?.label} color={status?.color} /></td>
                <td><Badge label={priority?.label} color={priority?.color} variant="priority" /></td>
                <td>{tech?.name || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Sem técnico</span>}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{formatDateShort(ticket.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="tickets-pagination">
          <button className="page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Próximo</button>
        </div>
      )}
    </div>
  );
}
