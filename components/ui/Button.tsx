"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex touch-manipulation items-center justify-center rounded-full font-medium transition-[transform,box-shadow,background-color,color,border-color] duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-400 text-slate-950 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(34,211,238,.35)]",

        secondary:
          "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 active:bg-white/15",

        ghost:
          "text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10",
      },

      size: {
        sm: "px-4 py-2 text-sm",

        md: "px-6 py-3",

        lg: "px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}