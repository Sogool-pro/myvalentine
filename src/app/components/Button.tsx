import { motion } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "px-8 py-4 rounded-full transition-all duration-300 cursor-pointer font-medium";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-[var(--pink)] to-[var(--gold-warm)] text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,107,157,0.5)] border-0",
    ghost: "border-2 border-[var(--pink)] text-[var(--pink)] hover:bg-[var(--pink)] hover:text-white bg-transparent"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      {...props}
    >
      <motion.span
        className="relative inline-block"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}