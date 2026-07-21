import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  noPadding?: boolean;
}

const sizes = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  className,
  size = "xl",
  noPadding = false,
}: Props) {
  return (
    <div
      className={clsx(
        "mx-auto w-full",
        sizes[size],
        !noPadding && "px-4 sm:px-6 md:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}