export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-surface-container border border-border ${className}`}
    >
      {children}
    </div>
  );
}
