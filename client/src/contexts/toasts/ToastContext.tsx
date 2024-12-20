import { createContext, useState, ReactNode } from 'react';
import { Toast, ToastContextType } from './ToastContext.types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type']) => {
    setToasts((prev) => [...prev, { message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((_, index) => index !== 0));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast toast-end">
        {toasts.map((toast, index) => (
          <div
            key={index}
            className={`alert text-white shadow-sm shadow-[#595959] ${
              toast.type === 'success' ? 'alert-success' : 'alert-error'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
