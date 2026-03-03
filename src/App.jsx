import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import NewTicket from './pages/NewTicket';
import TicketDetail from './pages/TicketDetail';
import Equipment from './pages/Equipment';
import Technicians from './pages/Technicians';
import Clients from './pages/Clients';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chamados" element={<Tickets />} />
          <Route path="/chamados/novo" element={<NewTicket />} />
          <Route path="/chamados/:id" element={<TicketDetail />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/equipamentos" element={<Equipment />} />
          <Route path="/tecnicos" element={<Technicians />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
