// ============================================
// FastShop - Mock Data
// ============================================

export const STATUS_LIST = [
  { key: 'aberto', label: 'Aberto', color: 'var(--status-open)' },
  { key: 'em_diagnostico', label: 'Em Diagnóstico', color: 'var(--status-diagnosis)' },
  { key: 'aguardando_peca', label: 'Aguardando Peça', color: 'var(--status-waiting-part)' },
  { key: 'em_manutencao', label: 'Em Manutenção', color: 'var(--status-maintenance)' },
  { key: 'pronto_retirada', label: 'Pronto para Retirada', color: 'var(--status-ready)' },
  { key: 'finalizado', label: 'Finalizado', color: 'var(--status-done)' },
];

export const PRIORITY_LIST = [
  { key: 'baixa', label: 'Baixa', color: 'var(--priority-low)' },
  { key: 'media', label: 'Média', color: 'var(--priority-medium)' },
  { key: 'alta', label: 'Alta', color: 'var(--priority-high)' },
  { key: 'critica', label: 'Crítica', color: 'var(--priority-critical)' },
];

export const CATEGORY_LIST = [
  'Limpeza',
  'Upgrade de Hardware',
  'Formatação',
  'Erro de Software',
  'Rede / Conectividade',
  'Periféricos',
  'Backup / Recuperação',
];

export const SLA_HOURS = {
  baixa: 72,
  media: 48,
  alta: 24,
  critica: 8,
};

export const technicians = [
  {
    id: 1,
    name: 'Carlos Silva',
    email: 'carlos.silva@fastshop.com',
    specialty: 'Hardware',
    avatar: null,
    activeTickets: 3,
  },
  {
    id: 2,
    name: 'Ana Rodrigues',
    email: 'ana.rodrigues@fastshop.com',
    specialty: 'Software',
    avatar: null,
    activeTickets: 5,
  },
  {
    id: 3,
    name: 'Pedro Santos',
    email: 'pedro.santos@fastshop.com',
    specialty: 'Redes',
    avatar: null,
    activeTickets: 2,
  },
  {
    id: 4,
    name: 'Juliana Costa',
    email: 'juliana.costa@fastshop.com',
    specialty: 'Hardware / Software',
    avatar: null,
    activeTickets: 4,
  },
];

export const clients = [
  { id: 1, name: 'Maria Oliveira', cpf: '123.456.789-00', email: 'maria@email.com', phone: '(11) 99999-1234' },
  { id: 2, name: 'João Pereira', cpf: '987.654.321-00', email: 'joao@email.com', phone: '(11) 98888-5678' },
  { id: 3, name: 'TechCorp Ltda', cnpj: '12.345.678/0001-90', email: 'contato@techcorp.com', phone: '(11) 3333-4444' },
  { id: 4, name: 'Ana Beatriz Lima', cpf: '456.789.123-00', email: 'ana.lima@email.com', phone: '(11) 97777-9012' },
  { id: 5, name: 'Digital Solutions SA', cnpj: '98.765.432/0001-10', email: 'suporte@digitalsolutions.com', phone: '(11) 4444-5555' },
];

export const equipment = [
  { id: 1, type: 'Notebook', brand: 'Dell', model: 'Inspiron 15', serialNumber: 'DLL-2024-001', serviceTag: 'SVCTG001', clientId: 1 },
  { id: 2, type: 'Desktop', brand: 'Lenovo', model: 'ThinkCentre M920', serialNumber: 'LNV-2024-002', serviceTag: 'SVCTG002', clientId: 2 },
  { id: 3, type: 'Notebook', brand: 'HP', model: 'ProBook 450', serialNumber: 'HP-2024-003', serviceTag: 'SVCTG003', clientId: 3 },
  { id: 4, type: 'Desktop', brand: 'Dell', model: 'OptiPlex 7090', serialNumber: 'DLL-2024-004', serviceTag: 'SVCTG004', clientId: 3 },
  { id: 5, type: 'Notebook', brand: 'Acer', model: 'Aspire 5', serialNumber: 'ACR-2024-005', serviceTag: 'SVCTG005', clientId: 4 },
  { id: 6, type: 'All-in-One', brand: 'Apple', model: 'iMac 24"', serialNumber: 'APL-2024-006', serviceTag: 'SVCTG006', clientId: 5 },
  { id: 7, type: 'Servidor', brand: 'Dell', model: 'PowerEdge T40', serialNumber: 'DLL-2024-007', serviceTag: 'SVCTG007', clientId: 5 },
];

export const tickets = [
  {
    id: 1001,
    title: 'Notebook não liga após queda',
    description: 'O notebook Dell Inspiron 15 sofreu uma queda da mesa e não liga mais. Ao pressionar o botão de energia, nenhum LED acende e não há sinal de vida.',
    category: 'Upgrade de Hardware',
    status: 'em_diagnostico',
    priority: 'alta',
    clientId: 1,
    equipmentId: 1,
    technicianId: 1,
    createdAt: '2025-12-28T10:30:00',
    updatedAt: '2025-12-28T14:00:00',
    slaDeadline: '2025-12-29T10:30:00',
    budget: null,
    attachments: [
      { id: 1, name: 'foto_notebook_danificado.jpg', type: 'image/jpeg', size: '2.4 MB', uploadedAt: '2025-12-28T10:35:00' },
      { id: 2, name: 'video_tentativa_ligar.mp4', type: 'video/mp4', size: '15.8 MB', uploadedAt: '2025-12-28T10:36:00' },
    ],
    notes: [
      { id: 1, author: 'Maria Oliveira', type: 'public', content: 'O notebook caiu da mesa pois o cabo de energia puxou. Precisa urgente pois uso para trabalho.', createdAt: '2025-12-28T10:32:00' },
      { id: 2, author: 'Carlos Silva', type: 'internal', content: 'Verificado dano físico na dobradiça e possível desconexão do flat da bateria. Abrir para inspeção interna.', createdAt: '2025-12-28T14:00:00' },
      { id: 3, author: 'Carlos Silva', type: 'public', content: 'Equipamento recebido e em análise. Retorno em até 24h com diagnóstico.', createdAt: '2025-12-28T14:05:00' },
    ],
  },
  {
    id: 1002,
    title: 'Formatação e instalação Windows 11',
    description: 'Computador está muito lento, travando frequentemente. Cliente solicita formatação completa com instalação limpa do Windows 11 Pro e pacote Office.',
    category: 'Formatação',
    status: 'em_manutencao',
    priority: 'media',
    clientId: 2,
    equipmentId: 2,
    technicianId: 2,
    createdAt: '2025-12-27T09:00:00',
    updatedAt: '2025-12-28T11:00:00',
    slaDeadline: '2025-12-29T09:00:00',
    budget: { value: 250.00, description: 'Formatação completa + Licença Office 365 (1 ano)', status: 'aprovado', approvedAt: '2025-12-27T16:00:00' },
    attachments: [
      { id: 3, name: 'screenshot_erro_tela_azul.png', type: 'image/png', size: '845 KB', uploadedAt: '2025-12-27T09:05:00' },
    ],
    notes: [
      { id: 4, author: 'João Pereira', type: 'public', content: 'Faz backup dos documentos da pasta Meus Documentos antes de formatar, por favor.', createdAt: '2025-12-27T09:10:00' },
      { id: 5, author: 'Ana Rodrigues', type: 'internal', content: 'Backup realizado em HD externo. Iniciar formatação.', createdAt: '2025-12-27T15:00:00' },
      { id: 6, author: 'Ana Rodrigues', type: 'public', content: 'Windows 11 Pro instalado com sucesso. Drivers atualizados. Falta instalar Office.', createdAt: '2025-12-28T11:00:00' },
    ],
  },
  {
    id: 1003,
    title: 'Upgrade de memória RAM para 16GB',
    description: 'Cliente solicita upgrade de memória RAM de 8GB para 16GB no notebook HP ProBook 450 para melhorar performance em software de design.',
    category: 'Upgrade de Hardware',
    status: 'aguardando_peca',
    priority: 'media',
    clientId: 3,
    equipmentId: 3,
    technicianId: 1,
    createdAt: '2025-12-26T14:00:00',
    updatedAt: '2025-12-27T10:00:00',
    slaDeadline: '2025-12-28T14:00:00',
    budget: { value: 380.00, description: 'Memória DDR4 8GB Kingston + Mão de obra', status: 'aprovado', approvedAt: '2025-12-26T18:00:00' },
    attachments: [],
    notes: [
      { id: 7, author: 'Carlos Silva', type: 'internal', content: 'Verificado modelo da RAM: DDR4 2666MHz SODIMM. Slot extra disponível.', createdAt: '2025-12-26T16:00:00' },
      { id: 8, author: 'Carlos Silva', type: 'public', content: 'Peça encomendada. Previsão de chegada: 2 dias úteis.', createdAt: '2025-12-27T10:00:00' },
    ],
  },
  {
    id: 1004,
    title: 'Vírus e malware - remoção completa',
    description: 'Computador Dell OptiPlex apresentando pop-ups constantes, lentidão extrema e programas desconhecidos instalados. Suspeita de ransomware.',
    category: 'Erro de Software',
    status: 'aberto',
    priority: 'critica',
    clientId: 3,
    equipmentId: 4,
    technicianId: null,
    createdAt: '2025-12-28T16:00:00',
    updatedAt: '2025-12-28T16:00:00',
    slaDeadline: '2025-12-29T00:00:00',
    budget: null,
    attachments: [
      { id: 4, name: 'screenshot_popup_virus.png', type: 'image/png', size: '1.2 MB', uploadedAt: '2025-12-28T16:05:00' },
      { id: 5, name: 'log_antivirus.txt', type: 'text/plain', size: '34 KB', uploadedAt: '2025-12-28T16:06:00' },
    ],
    notes: [
      { id: 9, author: 'TechCorp Ltda', type: 'public', content: 'URGENTE! Este computador tem dados financeiros importantes. Precisamos resolver o mais rápido possível.', createdAt: '2025-12-28T16:02:00' },
    ],
  },
  {
    id: 1005,
    title: 'Limpeza interna - superaquecimento',
    description: 'Notebook Acer Aspire 5 está desligando sozinho após poucos minutos de uso. Ventilador faz muito barulho. Provável acúmulo de poeira.',
    category: 'Limpeza',
    status: 'pronto_retirada',
    priority: 'baixa',
    clientId: 4,
    equipmentId: 5,
    technicianId: 3,
    createdAt: '2025-12-24T11:00:00',
    updatedAt: '2025-12-27T16:00:00',
    slaDeadline: '2025-12-27T11:00:00',
    budget: { value: 120.00, description: 'Limpeza interna + troca de pasta térmica', status: 'aprovado', approvedAt: '2025-12-24T15:00:00' },
    attachments: [
      { id: 6, name: 'foto_poeira_interna.jpg', type: 'image/jpeg', size: '3.1 MB', uploadedAt: '2025-12-25T10:00:00' },
    ],
    notes: [
      { id: 10, author: 'Pedro Santos', type: 'internal', content: 'Muita poeira acumulada no dissipador. Pasta térmica completamente seca.', createdAt: '2025-12-25T10:00:00' },
      { id: 11, author: 'Pedro Santos', type: 'public', content: 'Limpeza concluída. Pasta térmica trocada. Temperatura normalizada (45°C idle / 72°C load). Equipamento pronto para retirada.', createdAt: '2025-12-27T16:00:00' },
    ],
  },
  {
    id: 1006,
    title: 'Problema de rede - sem acesso à internet',
    description: 'iMac 24 não conecta na rede Wi-Fi da empresa. Outros dispositivos funcionam normalmente no mesmo local.',
    category: 'Rede / Conectividade',
    status: 'finalizado',
    priority: 'alta',
    clientId: 5,
    equipmentId: 6,
    technicianId: 3,
    createdAt: '2025-12-20T08:00:00',
    updatedAt: '2025-12-21T14:00:00',
    slaDeadline: '2025-12-21T08:00:00',
    budget: null,
    attachments: [],
    notes: [
      { id: 12, author: 'Pedro Santos', type: 'internal', content: 'Problema era conflito de IP. Configurado IP fixo e resolvido.', createdAt: '2025-12-20T15:00:00' },
      { id: 13, author: 'Pedro Santos', type: 'public', content: 'Problema resolvido. Era um conflito de endereço IP na rede. Configurado IP fixo para evitar recorrência.', createdAt: '2025-12-21T14:00:00' },
    ],
  },
  {
    id: 1007,
    title: 'Configuração de backup automático',
    description: 'Configurar backup automático diário do servidor Dell PowerEdge T40 para HD externo e também para nuvem (Google Drive).',
    category: 'Backup / Recuperação',
    status: 'em_diagnostico',
    priority: 'media',
    clientId: 5,
    equipmentId: 7,
    technicianId: 4,
    createdAt: '2025-12-28T09:00:00',
    updatedAt: '2025-12-28T13:00:00',
    slaDeadline: '2025-12-30T09:00:00',
    budget: { value: 450.00, description: 'Configuração de backup local + nuvem + HD externo 2TB Seagate', status: 'pendente' },
    attachments: [
      { id: 7, name: 'diagrama_rede_atual.pdf', type: 'application/pdf', size: '567 KB', uploadedAt: '2025-12-28T09:10:00' },
    ],
    notes: [
      { id: 14, author: 'Juliana Costa', type: 'internal', content: 'Servidor roda Windows Server 2022. Verificar compatibilidade com agente de backup.', createdAt: '2025-12-28T13:00:00' },
    ],
  },
  {
    id: 1008,
    title: 'Troca de teclado de notebook',
    description: 'Teclado do notebook Dell Inspiron com teclas grudando e falhando. Necessária troca completa do teclado.',
    category: 'Upgrade de Hardware',
    status: 'aberto',
    priority: 'baixa',
    clientId: 1,
    equipmentId: 1,
    technicianId: null,
    createdAt: '2025-12-28T17:00:00',
    updatedAt: '2025-12-28T17:00:00',
    slaDeadline: '2025-12-31T17:00:00',
    budget: null,
    attachments: [],
    notes: [],
  },
];

// Helper to get related data
export function getClientById(id) {
  return clients.find(c => c.id === id);
}

export function getEquipmentById(id) {
  return equipment.find(e => e.id === id);
}

export function getTechnicianById(id) {
  return technicians.find(t => t.id === id);
}

export function getStatusInfo(key) {
  return STATUS_LIST.find(s => s.key === key);
}

export function getPriorityInfo(key) {
  return PRIORITY_LIST.find(p => p.key === key);
}

export function getEquipmentByClient(clientId) {
  return equipment.filter(e => e.clientId === clientId);
}

export function getTicketsByTechnician(techId) {
  return tickets.filter(t => t.technicianId === techId && t.status !== 'finalizado');
}
