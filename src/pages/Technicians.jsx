import { Link } from 'react-router-dom';
import { FiTool } from 'react-icons/fi';
import { technicians, tickets, getStatusInfo } from '../data/mockData';
import Badge from '../components/Badge';
import './Technicians.css';

export default function Technicians() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Técnicos</h1>
        <p>Equipe técnica e seus chamados ativos</p>
      </div>

      <div className="technicians-grid">
        {technicians.map(tech => {
          const techTickets = tickets.filter(t => t.technicianId === tech.id);
          const activeTickets = techTickets.filter(t => t.status !== 'finalizado');
          const doneTickets = techTickets.filter(t => t.status === 'finalizado');

          return (
            <div className="tech-card" key={tech.id}>
              <div className="tech-card-top">
                <div className="tech-avatar">
                  {tech.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-email">{tech.email}</div>
                </div>
              </div>

              <div className="tech-specialty">
                <FiTool size={12} />
                {tech.specialty}
              </div>

              <div className="tech-stats">
                <div className="tech-stat">
                  <div className="tech-stat-value">{activeTickets.length}</div>
                  <div className="tech-stat-label">Ativos</div>
                </div>
                <div className="tech-stat">
                  <div className="tech-stat-value">{doneTickets.length}</div>
                  <div className="tech-stat-label">Finalizados</div>
                </div>
                <div className="tech-stat">
                  <div className="tech-stat-value">{techTickets.length}</div>
                  <div className="tech-stat-label">Total</div>
                </div>
              </div>

              {activeTickets.length > 0 && (
                <div className="tech-tickets-list">
                  {activeTickets.map(ticket => {
                    const status = getStatusInfo(ticket.status);
                    return (
                      <Link to={`/chamados/${ticket.id}`} className="tech-ticket-link" key={ticket.id}>
                        <span>
                          <span className="ticket-id">#{ticket.id}</span>
                          {ticket.title.length > 30 ? ticket.title.substring(0, 30) + '...' : ticket.title}
                        </span>
                        <Badge label={status?.label} color={status?.color} dot={false} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
