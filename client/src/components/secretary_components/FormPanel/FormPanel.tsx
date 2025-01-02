import FormPanelProps from './FormPanel.types';

export default function FormPanel({ title, children }: FormPanelProps) {
  return (
    <article>
      <h3 className="text-primary-dark">{title}</h3>
      <div className="rounded-xl border border-primary-light p-2">
        {children}
      </div>
    </article>
  );
}
