import { Link } from 'react-router-dom';
import { FiClipboard, FiAlertTriangle, FiCheckCircle, FiClock, FiTool } from 'react-icons/fi';
import { tickets, STATUS_LIST, getClientById, getTechnicianById, getStatusInfo, getPriorityInfo } from '../data/mockData';
import { getSlaStatus, formatTimeAgo } from '../utils/sla';
import Badge from '../components/Badge';
import './Dashboard.css';

const CATEGORY_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444',
];

export default function Dashboard() {
  const statusCounts = STATUS_LIST.map(s => ({
    ...s,
    count: tickets.filter(t => t.status === s.key).length,
  }));

  const recentTickets = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  // SLA alerts: tickets with SLA close to expiring or expired (exclude finalized)
  const slaAlerts = tickets
    .filter(t => t.status !== 'finalizado' && t.status !== 'pronto_retirada')
    .map(t => ({ ...t, sla: getSlaStatus(t.slaDeadline) }))
    .filter(t => t.sla.status === 'expired' || t.sla.status === 'critical' || t.sla.status === 'warning')
    .sort((a, b) => (a.sla.hoursLeft || 0) - (b.sla.hoursLeft || 0));

  // Category distribution
  const categoryMap = {};
  tickets.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + 1;
  });
  const categories = Object.entries(categoryMap)
    .map(([name, count], i) => ({ name, count, color: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }))
    .sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...categories.map(c => c.count), 1);

  const statCards = [
    { label: 'Total de Chamados', value: tickets.length, icon: <FiClipboard />, color: 'var(--primary-500)' },
    { label: 'Abertos', value: statusCounts.find(s => s.key === 'aberto')?.count || 0, icon: <FiAlertTriangle />, color: 'var(--status-open)' },
    { label: 'Em Andamento', value: tickets.filter(t => ['em_diagnostico', 'em_manutencao', 'aguardando_peca'].includes(t.status)).length, icon: <FiTool />, color: 'var(--status-maintenance)' },
    { label: 'Finalizados', value: statusCounts.find(s => s.key === 'finalizado')?.count || 0, icon: <FiCheckCircle />, color: 'var(--success)' },
    { label: 'SLA Crítico', value: slaAlerts.filter(a => a.sla.status === 'expired' || a.sla.status === 'critical').length, icon: <FiClock />, color: 'var(--danger)' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral do sistema de chamados</p>
      </div>

      <div className="dashboard-stats">
        {statCards.map((card) => (
          <div className="stat-card" key={card.label} style={{ '--stat-color': card.color }}>
            <div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
            <div className="stat-icon">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Chamados Recentes</h2>
          <Link to="/chamados">Ver todos →</Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Técnico</th>
              <th>Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.map(ticket => {
              const client = getClientById(ticket.clientId);
              const tech = getTechnicianById(ticket.technicianId);
              const status = getStatusInfo(ticket.status);
              const priority = getPriorityInfo(ticket.priority);
              return (
                <tr key={ticket.id}>
                  <td><Link to={`/chamados/${ticket.id}`} className="ticket-id">#{ticket.id}</Link></td>
                  <td className="ticket-title text-truncate">{ticket.title}</td>
                  <td>{client?.name || '—'}</td>
                  <td><Badge label={status?.label} color={status?.color} /></td>
                  <td><Badge label={priority?.label} color={priority?.color} variant="priority" /></td>
                  <td>{tech?.name || <span style={{ color: 'var(--text-tertiary)' }}>Não atribuído</span>}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{formatTimeAgo(ticket.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="dashboard-grid">
        {/* Category Distribution */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Distribuição por Categoria</h2>
          </div>
          <div className="category-bars">
            {categories.map(cat => (
              <div className="category-bar-item" key={cat.name}>
                <span className="category-bar-label">{cat.name}</span>
                <div className="category-bar-track">
                  <div
                    className="category-bar-fill"
                    style={{ width: `${(cat.count / maxCount) * 100}%`, background: cat.color }}
                  />
                </div>
                <span className="category-bar-count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Alerts */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Alertas de SLA</h2>
          </div>
          <div className="sla-alert-list">
            {slaAlerts.length === 0 && (
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', padding: '20px', textAlign: 'center' }}>
                ✅ Nenhum chamado com SLA crítico no momento.
              </div>
            )}
            {slaAlerts.map(ticket => (
              <Link to={`/chamados/${ticket.id}`} key={ticket.id} className="sla-alert-card">
                <div className="sla-alert-info">
                  <span className="sla-alert-title">{ticket.title}</span>
                  <span className="sla-alert-id">#{ticket.id} • {getClientById(ticket.clientId)?.name}</span>
                </div>
                <Badge label={ticket.sla.label} color={ticket.sla.color} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
