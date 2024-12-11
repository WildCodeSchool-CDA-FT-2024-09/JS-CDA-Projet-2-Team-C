import React from 'react';

interface AgentListProps<T> {
  items: T[]; // Type générique pour tes données
  renderItem: (item: T) => React.ReactNode; // Fonction pour définir comment afficher chaque élément
  onItemClick?: (item: T) => void; // Optionnel : Fonction appelée lors du clic sur un élément
}

const AgentList = <T,>({
  items,
  renderItem,
  onItemClick
}: AgentListProps<T>) => {
  return (
    <ul className="flex flex-col items-center gap-4">
      {items.map((item) => (
        <li
          key={(item as { id: string | number }).id}
          className="flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-[rgba(24,121,205,0.6)] text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default AgentList;
