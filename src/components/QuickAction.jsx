const QuickAction = ({ icon: Icon, title, description, onClick, variant = "default" }) => {
  const variants = {
    default: "hover:bg-slate-50 border-slate-200",
    primary: "hover:bg-blue-50 border-blue-200",
    success: "hover:bg-green-50 border-green-200",
    warning: "hover:bg-yellow-50 border-yellow-200",
    purple: "hover:bg-purple-50 border-purple-200",
  }

  const iconVariants = {
    default: "text-slate-600",
    primary: "text-blue-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    purple: "text-purple-600",
  }

  return (
    <button
      onClick={onClick}
      className={`bg-white border ${variants[variant]} rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md active:scale-95 group w-full`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform ${iconVariants[variant]}`}
        >
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2">{description}</p>
        </div>
      </div>
    </button>
  )
}

export default QuickAction