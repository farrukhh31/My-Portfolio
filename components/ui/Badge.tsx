interface Props {
  children: React.ReactNode;
}

export default function Badge({ children }: Props) {
  return (
    <span
      className="
      inline-flex
      rounded-full
      border
      border-cyan-400/20
      bg-cyan-400/10
      px-3
      py-1
      text-xs
      font-medium
      text-cyan-300
      "
    >
      {children}
    </span>
  );
}