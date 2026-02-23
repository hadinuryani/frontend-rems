import { useState, useEffect } from "react"
import {
  Users,
  UserCheck,
  Calendar,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Clock,
  Building2,
  FileText,
  Award,
  AlertCircle,
  Download,
  BarChart3,
} from "lucide-react"
import StatCard from "@/components/StatCard"
import Chart from "@/components/Chart"
import QuickAction from "@/components/QuickAction"
import Badge from "@/components/Badge"
import Button from "@/components/Button"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

import {
  GetDashboardStats,
  GetDepartmentDistribution,
  GetAttendanceTrend,
  GetDashboardAlerts,
  GetStatusDistribution,
  GetNewestEmployees,
} from "../service/dashboard_api"

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [attendanceTrendData, setAttendanceTrendData] = useState([])
  const [alerts, setAlerts] = useState(null)
  const [statusDistribution, setStatusDistribution] = useState([])
  const [newestEmployees, setNewestEmployees] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      const [statsRes, deptRes, trendRes, alertsRes, statusRes, newestRes] = await Promise.all([
        GetDashboardStats().catch(err => ({ success: false, error: err })),
        GetDepartmentDistribution().catch(err => ({ success: false, error: err })),
        GetAttendanceTrend(6).catch(err => ({ success: false, error: err })),
        GetDashboardAlerts().catch(err => ({ success: false, error: err })),
        GetStatusDistribution().catch(err => ({ success: false, error: err })),
        GetNewestEmployees(5).catch(err => ({ success: false, error: err })),
      ])

      // Format stats
      if (statsRes.success) {
        const statsData = [
          {
            title: "Total Karyawan",
            value: statsRes.data.total_karyawan?.toString() || "0",
            icon: Users,
            trend: "up",
            trendValue: "+12%",
            subtitle: "Total keseluruhan",
            variant: "primary",
          },
          {
            title: "Karyawan Aktif",
            value: statsRes.data.karyawan_aktif?.toString() || "0",
            icon: UserCheck,
            trend: "up",
            trendValue: `${Math.round(statsRes.data.active_percentage || 0)}%`,
            subtitle: "Dari total karyawan",
            variant: "success",
          },
          {
            title: "Tingkat Kehadiran",
            value: `${Math.round(statsRes.data.tingkat_kehadiran || 0)}%`,
            icon: ClipboardList,
            trend: "up",
            trendValue: "+2.1%",
            subtitle: "Hari ini",
            variant: "warning",
          },
        ]
        setStats(statsData)
      }

      // Format department data
      if (deptRes.success && Array.isArray(deptRes.data) && deptRes.data.length > 0) {
        setDepartmentData(deptRes.data)
      } else {
        setDepartmentData([])
      }

      // Format attendance trend
      if (trendRes.success && Array.isArray(trendRes.data) && trendRes.data.length > 0) {
        setAttendanceTrendData(trendRes.data)
      } else {
        // Generate default months if no data
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        setAttendanceTrendData(monthNames.map(month => ({
          month,
          hadir: 0,
          terlambat: 0,
          izin: 0
        })))
      }

      // Format alerts
      if (alertsRes.success) {
        setAlerts(alertsRes.data)
      }

      // Format status distribution
      if (statusRes.success && Array.isArray(statusRes.data) && statusRes.data.length > 0) {
        setStatusDistribution(statusRes.data)
      } else {
        setStatusDistribution([])
      }

      // Format newest employees
      if (newestRes.success && Array.isArray(newestRes.data) && newestRes.data.length > 0) {
        setNewestEmployees(newestRes.data)
      } else {
        setNewestEmployees([])
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Quick Actions
  const quickActions = [
    {
      icon: ClipboardList,
      title: "Input Absensi Manual",
      description: "Catat kehadiran karyawan secara manual",
      variant: "success",
    },
    {
      icon: FileText,
      title: "Buat Laporan",
      description: "Generate laporan HR & absensi",
      variant: "warning",
    },
    {
      icon: Award,
      title: "Penilaian Kinerja",
      description: "Evaluasi performa karyawan",
      variant: "default",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
            Dashboard HRD
          </h1>
          <p className="text-slate-500 text-sm">
            Manajemen Sumber Daya Manusia - {new Date().toLocaleDateString('id-ID')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Download} size="md">
            Export Report
          </Button>
          <Button variant="primary" icon={BarChart3} size="md">
            Analytics
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Trend */}
          <Chart
            title="Tren Kehadiran"
            subtitle="Persentase kehadiran 6 bulan terakhir"
            actions={
              <select className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                <option value="month">6 Bulan</option>
                <option value="year">1 Tahun</option>
              </select>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrendData}>
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hadir"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Hadir"
                  dot={{ fill: "#10b981", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="terlambat"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Terlambat"
                  dot={{ fill: "#f59e0b", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="izin"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Izin/Sakit"
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Chart>

          {/* Two columns for charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee by Department */}
            <Chart title="Karyawan per Departemen" subtitle="Distribusi saat ini">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Chart>

            {/* Data Kosong untuk Funnel - Dihapus */}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Alerts */}
        <div className="space-y-6">
          {/* Alerts/Notifications */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 text-sm mb-2">
                  Perhatian Diperlukan
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  {alerts?.ending_contracts > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      <span>{alerts.ending_contracts} kontrak karyawan akan berakhir bulan ini</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Pantau kehadiran karyawan secara berkala</span>
                  </li>
                </ul>
                <Button
                  variant="warning"
                  size="sm"
                  className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <Chart title="Distribusi Status Karyawan" subtitle="Breakdown per status">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status_name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="total_employees" fill="#3b82f6" name="Jumlah Karyawan" />
              </BarChart>
            </ResponsiveContainer>
          </Chart>

          {/* Newest Employees */}
          <Chart title="Karyawan Terbaru" subtitle="5 karyawan terakhir bergabung">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 text-slate-600 font-medium">Nama</th>
                    <th className="text-left py-2 px-3 text-slate-600 font-medium">Posisi</th>
                    <th className="text-left py-2 px-3 text-slate-600 font-medium">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {newestEmployees.length > 0 ? (
                    newestEmployees.map((emp, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-3">
                          <div>
                            <p className="font-medium text-slate-800">{emp.name || emp.employee_name || 'N/A'}</p>
                            <p className="text-xs text-slate-500">{emp.email || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{emp.role || emp.role_name || 'N/A'}</td>
                        <td className="py-3 px-3 text-slate-600">
                          {emp.created_at 
                            ? new Date(emp.created_at).toLocaleDateString('id-ID')
                            : 'N/A'
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-3 px-3 text-center text-slate-500 col-span-3">
                        Tidak ada data karyawan baru
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Chart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard