export interface AgentChoiceListProps<T> {
  isLoading: boolean;
  error?: Error | null;
  items: T[];
  emptyMessage: string;
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
}
