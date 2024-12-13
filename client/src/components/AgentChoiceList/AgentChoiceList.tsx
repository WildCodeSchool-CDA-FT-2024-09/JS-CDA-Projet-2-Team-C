import { AgentChoiceListProps } from './AgentChoiceList.type';

export default function AgentChoiceList<T>({
  isLoading,
  error,
  items,
  emptyMessage,
  renderItem,
  onItemClick
}: AgentChoiceListProps<T>) {
  if (isLoading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur lors du chargement</p>;
  if (!items.length) return <p>{emptyMessage}</p>;

  return (
    <ul className="flex flex-col items-center gap-4">
      {items.map((item) => (
        <li
          key={(item as { id: string | number }).id}
          className="flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-[rgba(24,121,205,0.6)] p-4 text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
