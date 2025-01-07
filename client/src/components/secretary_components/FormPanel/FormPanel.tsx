import FormPanelProps from './FormPanel.types';

export default function FormPanel({
  title,
  children,
  onReturn
}: FormPanelProps) {
  return (
    <article>
      <div className="flex items-center gap-4">
        <h3 className="text-primary-dark">{title}</h3>
        {onReturn && (
          <button
            onClick={onReturn}
            className="btn-xs rounded bg-primary-light text-primary-darker"
          >
            ↩ nouvelle recherche
          </button>
        )}
      </div>
      <div className="rounded-xl border border-primary-light p-2">
        {children}
      </div>
    </article>
  );
}
