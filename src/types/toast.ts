export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  groupKey?: string; // Para agrupar toasts similares
  count?: number; // Contador de itens agrupados
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const MAX_TOASTS = 3; // Máximo de toasts simultâneos
