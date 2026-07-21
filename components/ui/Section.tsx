import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({
  children,
  id,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 lg:py-28 ${className}`}
    >
      {children}
    </section>
  );
}