import { Loader2 } from "lucide-react"

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm",
    outline: "bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-300",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-sm",
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && Icon && iconPosition === "left" && <Icon size={18} />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon size={18} />}
    </button>
  )
}

export default Button