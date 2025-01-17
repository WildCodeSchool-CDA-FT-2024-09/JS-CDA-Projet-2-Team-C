import { useState } from 'react';
import AgentModal from '../AgentModal/AgentModal';
import { AgentChoiceListProps } from './AgentChoiceList.type';

export default function AgentChoiceList<T>({
  isLoading,
  error,
  items,
  emptyMessage,
  renderItem,
  onItemClick,
  openModalOnItemClick = false
}: AgentChoiceListProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    if (openModalOnItemClick) {
      setIsModalOpen(true);
    }
    if (onItemClick) onItemClick(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur lors du chargement</p>;
  if (!items.length) return <p>{emptyMessage}</p>;

  return (
    <div>
      <ul className="mb-20 flex flex-col items-center gap-4">
        {items.map((item) => (
          <li
            key={(item as { id: string | number }).id}
            className="flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary-lighter p-4 text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
            onClick={() => handleItemClick(item)}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
      {openModalOnItemClick && selectedItem && (
        <AgentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}
