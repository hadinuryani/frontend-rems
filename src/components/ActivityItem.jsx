const ActivityItem = ({ icon: Icon, title, description, time, variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    primary: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    danger: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  }

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group">
      <div className={`w-8 h-8 rounded-lg ${variants[variant]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 mb-0.5">{title}</p>
        <p className="text-xs text-slate-500 line-clamp-1">{description}</p>
      </div>
      <span className="text-xs text-slate-400 flex-shrink-0">{time}</span>
    </div>
  )
}

export default ActivityItem