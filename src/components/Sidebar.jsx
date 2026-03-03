import { NavLink } from 'react-router-dom';
import { FiHome, FiClipboard, FiMonitor, FiUsers, FiZap, FiUserCheck, FiX } from 'react-icons/fi';
import { tickets } from '../data/mockData';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: <FiHome />, label: 'Dashboard' },
  { to: '/chamados', icon: <FiClipboard />, label: 'Chamados', badge: tickets.filter(t => t.status === 'aberto').length },
  { to: '/clientes', icon: <FiUserCheck />, label: 'Clientes' },
  { to: '/equipamentos', icon: <FiMonitor />, label: 'Equipamentos' },
  { to: '/tecnicos', icon: <FiUsers />, label: 'Técnicos' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <FiZap />
        </div>
        <div>
          <h1>FastShop</h1>
          <span>Service Desk</span>
        </div>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Fechar menu">
          <FiX size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-title">Menu Principal</span>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && <span className="sidebar-link-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">AD</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Admin</div>
          <div className="sidebar-user-role">Coordenador</div>
        </div>
      </div>
    </aside>
  );
}
