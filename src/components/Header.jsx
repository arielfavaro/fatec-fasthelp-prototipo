import { FiSearch, FiBell } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <FiSearch className="header-search-icon" size={16} />
        <input
          type="text"
          placeholder="Buscar chamados por ID, cliente, técnico..."
          id="global-search"
        />
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
