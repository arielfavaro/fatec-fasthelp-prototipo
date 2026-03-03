import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiPaperclip, FiFile, FiCheck, FiX, FiSend, FiDollarSign } from 'react-icons/fi';
import { tickets, STATUS_LIST, getClientById, getEquipmentById, getTechnicianById, getStatusInfo, getPriorityInfo, technicians } from '../data/mockData';
import { formatDate, formatTimeAgo, getSlaStatus, formatCurrency } from '../utils/sla';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import './TicketDetail.css';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticket = tickets.find(t => t.id === Number(id));

  const [noteTab, setNoteTab] = useState('all');
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('public');
  const [localNotes, setLocalNotes] = useState(ticket?.notes || []);
  const [localStatus, setLocalStatus] = useState(ticket?.status || 'aberto');
  const [localBudget, setLocalBudget] = useState(ticket?.budget || null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetForm, setBudgetForm] = useState({ value: '', description: '' });
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [localTechId, setLocalTechId] = useState(ticket?.technicianId);

  if (!ticket) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>Chamado não encontrado</h2>
        <Link to="/chamados" style={{ marginTop: 12, display: 'inline-block' }}>Voltar aos chamados</Link>
      </div>
    );
  }

  const client = getClientById(ticket.clientId);
  const equip = getEquipmentById(ticket.equipmentId);
  const tech = getTechnicianById(localTechId);
  const status = getStatusInfo(localStatus);
  const priority = getPriorityInfo(ticket.priority);
  const sla = getSlaStatus(ticket.slaDeadline);

  const currentStepIndex = STATUS_LIST.findIndex(s => s.key === localStatus);

  function handleAddNote() {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now(),
      author: 'Admin',
      type: noteType,
      content: noteText,
      createdAt: new Date().toISOString(),
    };
    setLocalNotes(prev => [...prev, newNote]);
    setNoteText('');
  }

  function advanceStatus() {
    const idx = STATUS_LIST.findIndex(s => s.key === localStatus);
    if (idx < STATUS_LIST.length - 1) {
      // If advancing to 'em_manutencao' and budget is pending, block
      if (STATUS_LIST[idx + 1].key === 'em_manutencao' && localBudget && localBudget.status === 'pendente') {
        alert('O orçamento precisa ser aprovado antes de avançar para "Em Manutenção".');
        return;
      }
      setLocalStatus(STATUS_LIST[idx + 1].key);
    }
  }

  function handleApproveBudget() {
    setLocalBudget(prev => ({ ...prev, status: 'aprovado', approvedAt: new Date().toISOString() }));
  }

  function handleRejectBudget() {
    setLocalBudget(prev => ({ ...prev, status: 'rejeitado' }));
  }

  function handleCreateBudget() {
    if (!budgetForm.value || !budgetForm.description) return;
    setLocalBudget({ value: Number(budgetForm.value), description: budgetForm.description, status: 'pendente' });
    setShowBudgetModal(false);
    setBudgetForm({ value: '', description: '' });
  }

  function handleAssign(techId) {
    setLocalTechId(techId);
    setShowAssignModal(false);
  }

  const filteredNotes = noteTab === 'all'
    ? localNotes
    : localNotes.filter(n => n.type === noteTab);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 16 }}>
        <Button variant="ghost" size="sm" icon={<FiArrowLeft />} onClick={() => navigate('/chamados')}>
          Voltar
        </Button>
      </div>

      <div className="ticket-header">
        <div className="ticket-header-info">
          <h1 style={{ fontSize: '1.375rem' }}>
            <span style={{ color: 'var(--primary-400)', marginRight: 8 }}>#{ticket.id}</span>
            {ticket.title}
          </h1>
          <div className="ticket-header-meta">
            <Badge label={status?.label} color={status?.color} />
            <Badge label={priority?.label} color={priority?.color} variant="priority" />
            <Badge label={sla.label} color={sla.color} dot={false} />
            <span>Categoria: {ticket.category}</span>
          </div>
        </div>
        <div className="ticket-header-actions">
          {localStatus !== 'finalizado' && (
            <Button size="sm" onClick={advanceStatus}>Avançar Status</Button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="status-timeline">
        {STATUS_LIST.map((s, i) => (
          <div key={s.key} className={`status-step ${i < currentStepIndex ? 'completed' : ''} ${i === currentStepIndex ? 'current' : ''}`}>
            <div className="status-step-dot">{i < currentStepIndex ? '✓' : i + 1}</div>
            {i < STATUS_LIST.length - 1 && <div className="status-step-line" />}
          </div>
        ))}
      </div>

      <div className="ticket-detail-grid">
        {/* Main column */}
        <div>
          {/* Description */}
          <div className="ticket-description">{ticket.description}</div>

          {/* Notes */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3>Notas e Interações</h3>
            </div>
            <div className="detail-card-body">
              <div className="notes-tabs">
                <button className={`notes-tab ${noteTab === 'all' ? 'active' : ''}`} onClick={() => setNoteTab('all')}>Todas ({localNotes.length})</button>
                <button className={`notes-tab ${noteTab === 'public' ? 'active' : ''}`} onClick={() => setNoteTab('public')}>Públicas</button>
                <button className={`notes-tab ${noteTab === 'internal' ? 'active' : ''}`} onClick={() => setNoteTab('internal')}>Internas</button>
              </div>

              {filteredNotes.length === 0 && (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', padding: '16px 0', textAlign: 'center' }}>
                  Nenhuma nota registrada.
                </p>
              )}

              {filteredNotes.map(note => (
                <div className={`note-item ${note.type}`} key={note.id}>
                  <div className="note-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="note-author">{note.author}</span>
                      <span className={`note-type-tag ${note.type}`}>{note.type === 'public' ? 'Pública' : 'Interna'}</span>
                    </div>
                    <span className="note-date">{formatTimeAgo(note.createdAt)}</span>
                  </div>
                  <p className="note-content">{note.content}</p>
                </div>
              ))}

              <div className="add-note-area">
                <textarea
                  placeholder="Adicionar uma nota..."
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                />
                <div className="add-note-controls">
                  <select
                    className="filter-select"
                    value={noteType}
                    onChange={e => setNoteType(e.target.value)}
                    style={{ fontSize: '0.8rem', padding: '6px 28px 6px 10px' }}
                  >
                    <option value="public">Nota Pública</option>
                    <option value="internal">Nota Interna</option>
                  </select>
                  <Button size="sm" icon={<FiSend />} onClick={handleAddNote}>Enviar</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3>Anexos ({ticket.attachments.length})</h3>
              <Button variant="ghost" size="sm" icon={<FiPaperclip />}>Adicionar</Button>
            </div>
            <div className="detail-card-body">
              {ticket.attachments.length === 0 && (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center' }}>Nenhum anexo.</p>
              )}
              {ticket.attachments.map(att => (
                <div className="attachment-item" key={att.id}>
                  <div className="attachment-info">
                    <FiFile className="attachment-icon" />
                    <div>
                      <div className="attachment-name">{att.name}</div>
                      <div className="attachment-meta">{att.size} • {formatDate(att.uploadedAt)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Info */}
          <div className="detail-card">
            <div className="detail-card-header"><h3>Informações</h3></div>
            <div className="detail-card-body">
              <div className="detail-info-row">
                <span className="detail-info-label">Cliente</span>
                <span className="detail-info-value">{client?.name || '—'}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">CPF/CNPJ</span>
                <span className="detail-info-value">{client?.cpf || client?.cnpj || '—'}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">E-mail</span>
                <span className="detail-info-value">{client?.email || '—'}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">Equipamento</span>
                <span className="detail-info-value">{equip ? `${equip.brand} ${equip.model}` : '—'}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">Nº Série</span>
                <span className="detail-info-value">{equip?.serialNumber || '—'}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">Service Tag</span>
                <span className="detail-info-value">{equip?.serviceTag || '—'}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">Criado em</span>
                <span className="detail-info-value">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">Atualizado</span>
                <span className="detail-info-value">{formatDate(ticket.updatedAt)}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">Prazo SLA</span>
                <span className="detail-info-value" style={{ color: sla.color }}>{formatDate(ticket.slaDeadline)}</span>
              </div>
            </div>
          </div>

          {/* Technician */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3>Técnico Responsável</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAssignModal(true)}>Alterar</Button>
            </div>
            <div className="detail-card-body">
              {tech ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 600, fontSize: '0.85rem'
                  }}>
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{tech.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{tech.specialty}</div>
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Nenhum técnico atribuído</p>
              )}
            </div>
          </div>

          {/* Budget */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3>Orçamento</h3>
              {!localBudget && (
                <Button variant="ghost" size="sm" icon={<FiDollarSign />} onClick={() => setShowBudgetModal(true)}>Criar</Button>
              )}
            </div>
            <div className="detail-card-body">
              {localBudget ? (
                <div className="budget-card">
                  <div className="budget-value">{formatCurrency(localBudget.value)}</div>
                  <div className="budget-desc">{localBudget.description}</div>
                  <Badge
                    label={localBudget.status === 'aprovado' ? 'Aprovado' : localBudget.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'}
                    color={localBudget.status === 'aprovado' ? 'var(--success)' : localBudget.status === 'rejeitado' ? 'var(--danger)' : 'var(--warning)'}
                  />
                  {localBudget.status === 'pendente' && (
                    <div className="budget-actions" style={{ marginTop: 12 }}>
                      <Button size="sm" variant="success" icon={<FiCheck />} onClick={handleApproveBudget}>Aprovar</Button>
                      <Button size="sm" variant="danger" icon={<FiX />} onClick={handleRejectBudget}>Rejeitar</Button>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Nenhum orçamento cadastrado</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Modal */}
      {showBudgetModal && (
        <Modal title="Criar Orçamento" onClose={() => setShowBudgetModal(false)} footer={
          <>
            <Button variant="secondary" onClick={() => setShowBudgetModal(false)}>Cancelar</Button>
            <Button onClick={handleCreateBudget}>Enviar Orçamento</Button>
          </>
        }>
          <div className="form-group">
            <label>Valor (R$)</label>
            <input className="form-control" type="number" step="0.01" placeholder="0,00" value={budgetForm.value} onChange={e => setBudgetForm(prev => ({ ...prev, value: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea className="form-control" placeholder="Detalhe os itens e serviços inclusos no orçamento..." value={budgetForm.description} onChange={e => setBudgetForm(prev => ({ ...prev, description: e.target.value }))} />
          </div>
        </Modal>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <Modal title="Atribuir Técnico" onClose={() => setShowAssignModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {technicians.map(t => (
              <div
                key={t.id}
                onClick={() => handleAssign(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  background: localTechId === t.id ? 'rgba(99,102,241,0.1)' : 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  border: localTechId === t.id ? '1px solid var(--primary-500)' : '1px solid transparent',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 600, fontSize: '0.75rem'
                }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{t.specialty} • {t.activeTickets} chamados ativos</div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
