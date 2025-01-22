import { useEffect, useRef } from 'react';
import { AgentModalProps } from './AgentModal.type';
import { addOneHour } from '../../../utils/dates.utils';

export default function AgentModal({
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
      <div className="absolute inset-0 backdrop-blur-md"></div>
      <article
        ref={modalRef}
        className="relative rounded border border-black bg-primary-lighter p-6 shadow-lg"
      >
        <button
          className="black absolute right-2 top-2 font-bold hover:text-black"
          onClick={onClose}
        >
          X
        </button>
        {selectedItem && (
          <>
            <h2 className="mb-4 mt-1 text-xl font-bold text-white">
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
              <strong>Heure :</strong> {addOneHour(selectedItem.startTime)}
            </p>
            <p className="text-black">
              <strong>Patient :</strong> {selectedItem.patient?.firstname || ''}{' '}
              {selectedItem.patient?.lastname || ''}
            </p>
          </>
        )}
      </article>
    </div>
  );
}
