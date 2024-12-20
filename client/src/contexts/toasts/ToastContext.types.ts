export type Toast = {
  message: string;
  type: 'success' | 'error';
};

export type ToastContextType = {
  showToast: (message: string, type: Toast['type']) => void;
};
