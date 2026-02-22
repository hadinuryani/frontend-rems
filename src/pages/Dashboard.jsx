import { useState } from "react"
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Calendar,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Clock,
  Building2,
  FileText,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  Download,
  BarChart3,
} from "lucide-react"
import StatCard from "@/components/StatCard"
import Chart from "@/components/Chart"
import QuickAction from "@/components/QuickAction"
import ActivityItem from "@/components/ActivityItem"
import Badge from "@/components/Badge"
import Button from "@/components/Button"
import {
  BarChart,
  Bar,
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
} from "recharts"

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("month")

  // Statistics Data
  const stats = [
    {
      title: "Total Karyawan",
      value: "248",
      icon: Users,
      trend: "up",
      trendValue: "+12%",
      subtitle: "vs bulan lalu",
      variant: "primary",
    },
    {
      title: "Karyawan Aktif",
      value: "235",
      icon: UserCheck,
      trend: "up",
      trendValue: "+5%",
      subtitle: "94.8% dari total",
      variant: "success",
    },
    {
      title: "Rekrutmen Bulan Ini",
      value: "18",
      icon: UserPlus,
      trend: "up",
      trendValue: "+8%",
      subtitle: "New hires",
      variant: "purple",
    },
    {
      title: "Tingkat Kehadiran",
      value: "96.2%",
      icon: ClipboardList,
      trend: "up",
      trendValue: "+2.1%",
      subtitle: "Rata-rata bulan ini",
      variant: "warning",
    },
  ]

  // Employee by Department Data
  const departmentData = [
    { name: "Produksi", value: 85, color: "#3b82f6" },
    { name: "Marketing", value: 45, color: "#10b981" },
    { name: "Finance", value: 28, color: "#f59e0b" },
    { name: "IT", value: 35, color: "#8b5cf6" },
    { name: "HR", value: 22, color: "#ec4899" },
    { name: "Operations", value: 33, color: "#06b6d4" },
  ]

  // Attendance Trend Data
  const attendanceTrendData = [
    { month: "Jan", hadir: 95.5, terlambat: 3.2, izin: 1.3 },
    { month: "Feb", hadir: 94.8, terlambat: 3.8, izin: 1.4 },
    { month: "Mar", hadir: 96.2, terlambat: 2.5, izin: 1.3 },
    { month: "Apr", hadir: 95.8, terlambat: 2.9, izin: 1.3 },
    { month: "May", hadir: 96.5, terlambat: 2.2, izin: 1.3 },
    { month: "Jun", hadir: 96.2, terlambat: 2.5, izin: 1.3 },
  ]

  // Recruitment Funnel Data
  const recruitmentData = [
    { stage: "Aplikasi", jumlah: 145 },
    { stage: "Screening", jumlah: 89 },
    { stage: "Interview", jumlah: 52 },
    { stage: "Test", jumlah: 28 },
    { stage: "Offer", jumlah: 18 },
  ]

  // Quick Actions
  const quickActions = [
    {
      icon: UserPlus,
      title: "Tambah Karyawan Baru",
      description: "Registrasi karyawan baru ke sistem",
      variant: "primary",
    },
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
      icon: Calendar,
      title: "Jadwal Interview",
      description: "Atur jadwal wawancara kandidat",
      variant: "purple",
    },
    {
      icon: Award,
      title: "Penilaian Kinerja",
      description: "Evaluasi performa karyawan",
      variant: "default",
    },
    {
      icon: Send,
      title: "Kirim Pengumuman",
      description: "Broadcast info ke semua karyawan",
      variant: "primary",
    },
  ]

  // Recent Activities
  const recentActivities = [
    {
      icon: UserPlus,
      title: "Karyawan baru bergabung",
      description: "Ahmad Rizki - IT Department",
      time: "5 menit lalu",
      variant: "success",
    },
    {
      icon: CheckCircle,
      title: "Absensi disetujui",
      description: "15 permintaan izin disetujui",
      time: "1 jam lalu",
      variant: "primary",
    },
    {
      icon: AlertCircle,
      title: "Kontrak akan berakhir",
      description: "5 karyawan kontrak habis bulan ini",
      time: "2 jam lalu",
      variant: "warning",
    },
    {
      icon: FileText,
      title: "Laporan bulanan selesai",
      description: "Laporan HR bulan Januari 2025",
      time: "3 jam lalu",
      variant: "success",
    },
    {
      icon: XCircle,
      title: "Karyawan resign",
      description: "Siti Nurhaliza - Marketing",
      time: "5 jam lalu",
      variant: "danger",
    },
    {
      icon: Calendar,
      title: "Interview dijadwalkan",
      description: "3 kandidat untuk posisi developer",
      time: "6 jam lalu",
      variant: "purple",
    },
  ]

  // Upcoming Events
  const upcomingEvents = [
    {
      date: "15",
      month: "Feb",
      title: "Pelatihan Leadership",
      time: "09:00 - 16:00",
      participants: 25,
    },
    {
      date: "20",
      month: "Feb",
      title: "Performance Review Q1",
      time: "08:00 - 17:00",
      participants: 248,
    },
    {
      date: "28",
      month: "Feb",
      title: "Team Building Event",
      time: "08:00 - 15:00",
      participants: 180,
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
            Selamat datang kembali, Ahmad Hadi 
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

            {/* Recruitment Funnel */}
            <Chart title="Rekrutmen Funnel" subtitle="Proses rekrutmen aktif">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={recruitmentData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="jumlah" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
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

        {/* Right Column - Activities & Events (1/3 width) */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Aktivitas Terbaru
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Agenda Mendatang
              </h3>
              <Calendar size={20} className="text-slate-400" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-2 w-14 h-14 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-xl font-bold leading-none">
                      {event.date}
                    </span>
                    <span className="text-xs uppercase">{event.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-800 mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        {event.participants}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>5 kontrak karyawan akan berakhir bulan ini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>12 karyawan belum melakukan penilaian kinerja</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>3 posisi masih dalam proses rekrutmen</span>
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
        </div>
      </div>
    </div>
  )
}

export default Dashboard