import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';
import './Header.css';

export default function Header({ onMenuToggle }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Menu">
          <FiMenu size={22} />
        </button>
        <div className="header-search">
          <FiSearch className="header-search-icon" size={16} />
          <input
            type="text"
            placeholder="Buscar chamados por ID, cliente, técnico..."
            id="global-search"
          />
        </div>
      </div>
      <div className="header-actions">
        <button className="header-notif-btn" aria-label="Notificações">
          <FiBell size={20} />
          <span className="header-notif-dot" />
        </button>
      </div>
    </header>
  );
}
