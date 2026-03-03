import { format, formatDistanceToNow, differenceInHours, parseISO, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SLA_HOURS } from '../data/mockData';

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'dd/MM/yyyy', { locale: ptBR });
}

export function formatTimeAgo(dateStr) {
  if (!dateStr) return '—';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}

export function calculateSlaDeadline(priority, createdAt) {
  const hours = SLA_HOURS[priority] || 48;
  const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
  return addHours(created, hours);
}

export function getSlaStatus(slaDeadline) {
  if (!slaDeadline) return { status: 'unknown', label: 'Indefinido', color: 'var(--slate-500)' };

  const deadline = typeof slaDeadline === 'string' ? parseISO(slaDeadline) : slaDeadline;
  const now = new Date();
  const hoursLeft = differenceInHours(deadline, now);

  if (hoursLeft < 0) {
    return { status: 'expired', label: 'SLA Expirado', color: 'var(--danger)', hoursLeft };
  }
  if (hoursLeft <= 4) {
    return { status: 'critical', label: `${hoursLeft}h restantes`, color: 'var(--priority-critical)', hoursLeft };
  }
  if (hoursLeft <= 12) {
    return { status: 'warning', label: `${hoursLeft}h restantes`, color: 'var(--warning)', hoursLeft };
  }
  return { status: 'ok', label: `${hoursLeft}h restantes`, color: 'var(--success)', hoursLeft };
}

export function formatCurrency(value) {
  if (value == null) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
