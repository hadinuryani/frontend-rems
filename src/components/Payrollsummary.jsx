import { TrendingUp, TrendingDown } from "lucide-react"

const PayrollSummary = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-blue-100 text-sm mb-2">Total Payroll Bulan Ini</p>
          <h2 className="text-4xl font-bold mb-1">
            {formatCurrency(data.totalPayroll)}
          </h2>
          {data.trend && (
            <div className="flex items-center gap-2 text-sm">
              {data.trend.direction === "up" ? (
                <TrendingUp size={16} className="text-blue-100" />
              ) : (
                <TrendingDown size={16} className="text-blue-100" />
              )}
              <span className="text-blue-100">
                {data.trend.value} vs bulan lalu
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-blue-100 text-xs mb-2">Total Karyawan</p>
          <p className="text-2xl font-bold">{data.totalEmployees}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-blue-100 text-xs mb-2">Sudah Dibayar</p>
          <p className="text-2xl font-bold">{data.paidCount}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-blue-100 text-xs mb-2">Pending</p>
          <p className="text-2xl font-bold">{data.pendingCount}</p>
        </div>
      </div>
    </div>
  )
}

export default PayrollSummary