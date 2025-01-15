import { useEffect, useRef } from 'react';
import AgentModalProps from './AgentModal.type';
export default function Modal({
  isOpen,
  onClose,
  selectedItem
}: AgentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arrière-plan flou */}
      <div className="absolute inset-0 backdrop-blur-md"></div>

      {/* Contenu de la modale */}
      <div
        ref={modalRef}
        className="relative rounded bg-blue-400 p-6 shadow-lg"
      >
        <button
          className="black absolute right-2 top-2 font-bold hover:text-black"
          onClick={onClose}
        >
          X
        </button>
        {selectedItem && (
          <>
            <h2 className="mb-4 mt-1 text-xl font-bold text-black">
              Détails du rendez-vous
            </h2>
            <p className="text-black">
              <strong>Service :</strong>{' '}
              {selectedItem.doctor?.department?.label || 'Non spécifié'}
            </p>
            <p className="text-black">
              <strong>Docteur :</strong> {selectedItem.doctor?.firstname || ''}{' '}
              {selectedItem.doctor?.lastname || ''}
            </p>
            <p className="text-black">
              <strong>Heure :</strong>{' '}
              {selectedItem.startTime?.slice(0, 5) || 'Non spécifiée'}
            </p>
            <p className="text-black">
              <strong>Patient :</strong> {selectedItem.patient?.firstname || ''}{' '}
              {selectedItem.patient?.lastname || ''}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
