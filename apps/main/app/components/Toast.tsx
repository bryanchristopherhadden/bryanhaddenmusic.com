'use client';

import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <IconCheck size={18} />;
    case 'error':
      return <IconX size={18} />;
    case 'warning':
      return <IconAlertTriangle size={18} />;
    default:
      return <IconInfoCircle size={18} />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'teal';
    case 'error':
      return 'red';
    case 'warning':
      return 'yellow';
    default:
      return 'blue';
  }
};

export const showToast = ({ title, message, type = 'info', duration = 4000 }: ToastOptions) => {
  notifications.show({
    id: `toast-${Date.now()}`,
    title,
    message,
    color: getColor(type),
    icon: getIcon(type),
    autoClose: duration,
    position: 'top-right',
  });
};

export const showSuccessToast = (message: string, title?: string) => {
  showToast({ message, title, type: 'success' });
};

export const showErrorToast = (message: string, title?: string) => {
  showToast({ message, title, type: 'error' });
};

export const showInfoToast = (message: string, title?: string) => {
  showToast({ message, title, type: 'info' });
};

export const showWarningToast = (message: string, title?: string) => {
  showToast({ message, title, type: 'warning' });
};

// For backward compatibility with existing Toast component usage
const Toast = {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
  warning: showWarningToast,
  show: showToast,
};

export default Toast;
