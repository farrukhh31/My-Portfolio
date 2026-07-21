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
      px-2.5
      py-1
      text-[11px]
      font-medium
      text-cyan-300
      sm:px-3
      sm:text-xs
      "
    >
      {children}
    </span>
  );
}