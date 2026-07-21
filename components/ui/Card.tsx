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
      rounded-2xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      transition-[border-color,box-shadow]
      duration-500
      hover:border-cyan-400/40
      hover:shadow-[0_0_40px_rgba(6,182,212,.15)]
      active:border-cyan-400/40
      active:shadow-[0_0_40px_rgba(6,182,212,.15)]
      sm:rounded-3xl
      ${className}
      `}
    >
      {children}
    </div>
  );
}