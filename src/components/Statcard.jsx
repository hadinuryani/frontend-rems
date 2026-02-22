import { TrendingUp, TrendingDown } from "lucide-react"

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  subtitle,
  variant = "default",
  iconBg,
}) => {
  const variants = {
    default: "from-slate-50 to-white border-slate-200",
    primary: "from-blue-50 to-white border-blue-200",
    success: "from-green-50 to-white border-green-200",
    warning: "from-yellow-50 to-white border-yellow-200",
    danger: "from-red-50 to-white border-red-200",
    purple: "from-purple-50 to-white border-purple-200",
  }

  const iconBgVariants = {
    default: "bg-slate-100 text-slate-600",
    primary: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    danger: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  }

  return (
    <div
      className={`bg-gradient-to-br ${variants[variant]} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 group-hover:scale-105 transition-transform">
            {value}
          </h3>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${
            iconBgVariants[iconBg || variant]
          } flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <Icon size={24} />
        </div>
      </div>

      {(trend || subtitle) && (
        <div className="flex items-center justify-between text-sm">
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
          {trend && (
            <div
              className={`flex items-center gap-1 ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StatCard