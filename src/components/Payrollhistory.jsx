import { useState } from "react"
import {
  Calendar,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
} from "lucide-react"
import Button from "@/components/Button"
import Badge from "@/components/Badge"
import SearchInput from "@/components/SearchInput"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import Chart from "@/components/Chart"

const PayrollHistory = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Dummy historical data
  const payrollHistory = [
    {
      period: "Februari 2025",
      month: "Feb 2025",
      totalPayroll: 1850000000,
      employeeCount: 248,
      avgSalary: 7460000,
      status: "completed",
      paidDate: "01 Feb 2025",
      trend: "+12.5%",
    },
    {
      period: "Januari 2025",
      month: "Jan 2025",
      totalPayroll: 1645000000,
      employeeCount: 235,
      avgSalary: 7000000,
      status: "completed",
      paidDate: "01 Jan 2025",
      trend: "+8.2%",
    },
    {
      period: "Desember 2024",
      month: "Dec 2024",
      totalPayroll: 1820000000,
      employeeCount: 230,
      avgSalary: 7913000,
      status: "completed",
      paidDate: "01 Dec 2024",
      trend: "+15.3%",
    },
    {
      period: "November 2024",
      month: "Nov 2024",
      totalPayroll: 1580000000,
      employeeCount: 225,
      avgSalary: 7022000,
      status: "completed",
      paidDate: "01 Nov 2024",
      trend: "+5.1%",
    },
    {
      period: "Oktober 2024",
      month: "Oct 2024",
      totalPayroll: 1503000000,
      employeeCount: 220,
      avgSalary: 6831000,
      status: "completed",
      paidDate: "01 Oct 2024",
      trend: "+3.8%",
    },
    {
      period: "September 2024",
      month: "Sep 2024",
      totalPayroll: 1448000000,
      employeeCount: 215,
      avgSalary: 6734000,
      status: "completed",
      paidDate: "01 Sep 2024",
      trend: "+6.7%",
    },
  ]

  // Chart data
  const trendData = payrollHistory
    .slice()
    .reverse()
    .map((item) => ({
      month: item.month,
      total: item.totalPayroll / 1000000, // Convert to millions
      employees: item.employeeCount,
      average: item.avgSalary / 1000, // Convert to thousands
    }))

  const filteredHistory = payrollHistory.filter((item) =>
    item.period.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Riwayat Payroll</h1>
          <p className="text-sm text-slate-500 mt-1">
            Lihat history pembayaran gaji bulanan
          </p>
        </div>
        <Button variant="outline" icon={Download}>
          Export History
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Trend */}
        <Chart title="Trend Total Payroll" subtitle="6 bulan terakhir (dalam juta)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                formatter={(value) => `Rp ${value.toFixed(2)}jt`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Total Payroll"
              />
            </LineChart>
          </ResponsiveContainer>
        </Chart>

        {/* Employee Count Trend */}
        <Chart title="Jumlah Karyawan" subtitle="6 bulan terakhir">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="employees"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                name="Jumlah Karyawan"
              />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari periode..."
          className="max-w-md"
        />
        <div className="text-sm text-slate-600">
          Total: <span className="font-semibold">{filteredHistory.length}</span> periode
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Periode
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Total Payroll
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Jumlah Karyawan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Rata-rata Gaji
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredHistory.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.period}
                        </p>
                        <p className="text-xs text-slate-500">
                          Dibayar: {item.paidDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-500" />
                      <span className="text-sm font-semibold text-slate-800">
                        {formatCurrency(item.totalPayroll)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {item.employeeCount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {formatCurrency(item.avgSalary)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1 ${
                        item.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.trend.startsWith("+") ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      <span className="text-sm font-medium">{item.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Selesai</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" icon={Eye}>
                        Detail
                      </Button>
                      <Button variant="ghost" size="sm" icon={Download}>
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Payroll (6 Bulan)</p>
              <p className="text-2xl font-bold text-slate-800">
                {formatCurrency(
                  payrollHistory.reduce((sum, item) => sum + item.totalPayroll, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Rata-rata Karyawan</p>
              <p className="text-2xl font-bold text-slate-800">
                {Math.round(
                  payrollHistory.reduce((sum, item) => sum + item.employeeCount, 0) /
                    payrollHistory.length
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Growth Rate</p>
              <p className="text-2xl font-bold text-slate-800">+8.9%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayrollHistory