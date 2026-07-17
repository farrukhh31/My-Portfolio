import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      transition-all
      duration-500
      hover:border-cyan-400/40
      hover:shadow-[0_0_40px_rgba(6,182,212,.15)]
      ${className}
      `}
    >
      {children}
    </div>
  );
}