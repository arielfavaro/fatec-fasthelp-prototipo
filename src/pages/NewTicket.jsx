import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiX, FiArrowLeft, FiSave } from 'react-icons/fi';
import { CATEGORY_LIST, PRIORITY_LIST, clients, equipment } from '../data/mockData';
import Button from '../components/Button';
import './NewTicket.css';

export default function NewTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    clientId: '',
    equipmentId: '',
  });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const clientEquipment = form.clientId
    ? equipment.filter(e => e.clientId === Number(form.clientId))
    : [];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'clientId') {
      setForm(prev => ({ ...prev, equipmentId: '' }));
    }
  }

  function handleFileAdd() {
    // Simulated upload
    const fakeFiles = [
      { name: 'foto_equipamento.jpg', size: '1.8 MB' },
      { name: 'log_erro.txt', size: '24 KB' },
    ];
    setFiles(prev => [...prev, fakeFiles[prev.length % fakeFiles.length]]);
  }

  function handleFileRemove(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/chamados'), 2000);
  }

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="success-msg">
          ✅ Chamado criado com sucesso! Redirecionando...
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <Button variant="ghost" size="sm" icon={<FiArrowLeft />} onClick={() => navigate('/chamados')} />
          <h1>Novo Chamado</h1>
        </div>
        <p>Preencha os dados para abrir um novo chamado de suporte</p>
      </div>

      <form className="new-ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título <span className="required">*</span></label>
          <input
            className="form-control"
            id="title"
            name="title"
            type="text"
            placeholder="Descreva brevemente o problema"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição Detalhada <span className="required">*</span></label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Forneça todos os detalhes sobre o problema, incluindo quando começou, os sintomas e o que já foi tentado..."
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Categoria <span className="required">*</span></label>
            <select className="form-control" id="category" name="category" value={form.category} onChange={handleChange} required>
              <option value="">Selecione uma categoria</option>
              {CATEGORY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Prioridade <span className="required">*</span></label>
            <select className="form-control" id="priority" name="priority" value={form.priority} onChange={handleChange} required>
              <option value="">Selecione a prioridade</option>
              {PRIORITY_LIST.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientId">Cliente <span className="required">*</span></label>
            <select className="form-control" id="clientId" name="clientId" value={form.clientId} onChange={handleChange} required>
              <option value="">Selecione o cliente</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} — {c.cpf || c.cnpj}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="equipmentId">Equipamento</label>
            <select className="form-control" id="equipmentId" name="equipmentId" value={form.equipmentId} onChange={handleChange} disabled={!form.clientId}>
              <option value="">{form.clientId ? 'Selecione o equipamento' : 'Selecione um cliente primeiro'}</option>
              {clientEquipment.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.brand} {eq.model} — SN: {eq.serialNumber}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Anexos</label>
          <div className="upload-zone" onClick={handleFileAdd}>
            <FiUploadCloud className="upload-zone-icon" />
            Clique para adicionar arquivos (fotos, screenshots, logs)
          </div>
          {files.length > 0 && (
            <div className="upload-files">
              {files.map((f, i) => (
                <div className="upload-file-item" key={i}>
                  <span className="upload-file-name">{f.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="upload-file-size">{f.size}</span>
                    <button type="button" onClick={() => handleFileRemove(i)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                      <FiX size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <Button type="submit" icon={<FiSave />}>Criar Chamado</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/chamados')}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}
