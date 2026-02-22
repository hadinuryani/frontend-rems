import { useState } from "react"
import {
  DollarSign,
  Calendar,
  Download,
  Send,
  Filter,
  Plus,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
} from "lucide-react"
import Button from "@/components/Button"
import Badge from "@/components/Badge"
import Tabs from "@/components/Tabs"
import Dropdown from "@/components/Dropdown"
import SearchInput from "@/components/SearchInput"
import Modal from "@/components/Modal"
import PayslipCard from "@/components/PayslipCard"
import PayrollSummary from "@/components/PayrollSummary"
import SalaryBreakdown from "@/components/SalaryBreakdown"
import StatCard from "@/components/StatCard"

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayslip, setSelectedPayslip] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("2025-02")

  // Dummy Data
  const payrollSummary = {
    totalPayroll: 1850000000,
    totalEmployees: 248,
    paidCount: 235,
    pendingCount: 13,
    trend: {
      direction: "up",
      value: "+12.5%",
    },
  }

  const stats = [
    {
      title: "Total Payroll",
      value: "1.85M",
      icon: DollarSign,
      trend: "up",
      trendValue: "+12.5%",
      subtitle: "Februari 2025",
      variant: "success",
    },
    {
      title: "Sudah Dibayar",
      value: "235",
      icon: CheckCircle,
      subtitle: "94.8% dari total",
      variant: "primary",
    },
    {
      title: "Pending",
      value: "13",
      icon: Clock,
      subtitle: "Perlu diproses",
      variant: "warning",
    },
    {
      title: "Rata-rata Gaji",
      value: "7.46jt",
      icon: TrendingUp,
      trend: "up",
      trendValue: "+3.2%",
      subtitle: "Per karyawan",
      variant: "purple",
    },
  ]

  const [payslips] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Dina Darius",
      position: "Owner",
      department: "Produksi",
      period: "Februari 2025",
      baseSalary: 15000000,
      allowances: [
        { name: "Tunjangan Jabatan", amount: 5000000 },
        { name: "Tunjangan Transport", amount: 1000000 },
      ],
      bonus: 3000000,
      deductions: [
        { name: "BPJS Kesehatan", amount: 150000 },
        { name: "BPJS Ketenagakerjaan", amount: 200000 },
        { name: "Pajak (PPh 21)", amount: 2500000 },
      ],
      grossSalary: 24000000,
      totalDeductions: 2850000,
      netSalary: 21150000,
      status: "paid",
      paidDate: "01 Feb 2025",
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Alfina Amalia",
      position: "Staff",
      department: "Marketing",
      period: "Februari 2025",
      baseSalary: 8000000,
      allowances: [
        { name: "Tunjangan Transport", amount: 500000 },
        { name: "Tunjangan Makan", amount: 500000 },
      ],
      bonus: 1000000,
      deductions: [
        { name: "BPJS Kesehatan", amount: 80000 },
        { name: "BPJS Ketenagakerjaan", amount: 100000 },
        { name: "Pajak (PPh 21)", amount: 800000 },
      ],
      grossSalary: 10000000,
      totalDeductions: 980000,
      netSalary: 9020000,
      status: "paid",
      paidDate: "01 Feb 2025",
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Suhada Akbra",
      position: "HR Manager",
      department: "HR",
      period: "Februari 2025",
      baseSalary: 9000000,
      allowances: [
        { name: "Tunjangan Jabatan", amount: 2000000 },
        { name: "Tunjangan Transport", amount: 750000 },
      ],
      bonus: 1500000,
      deductions: [
        { name: "BPJS Kesehatan", amount: 90000 },
        { name: "BPJS Ketenagakerjaan", amount: 120000 },
        { name: "Pajak (PPh 21)", amount: 1200000 },
      ],
      grossSalary: 13250000,
      totalDeductions: 1410000,
      netSalary: 11840000,
      status: "pending",
      paidDate: null,
    },
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Budi Santoso",
      position: "Manager",
      department: "IT",
      period: "Februari 2025",
      baseSalary: 12000000,
      allowances: [
        { name: "Tunjangan Jabatan", amount: 3000000 },
        { name: "Tunjangan Transport", amount: 1000000 },
      ],
      bonus: 2000000,
      deductions: [
        { name: "BPJS Kesehatan", amount: 120000 },
        { name: "BPJS Ketenagakerjaan", amount: 150000 },
        { name: "Pajak (PPh 21)", amount: 1800000 },
      ],
      grossSalary: 18000000,
      totalDeductions: 2070000,
      netSalary: 15930000,
      status: "paid",
      paidDate: "01 Feb 2025",
    },
    {
      id: 5,
      employeeId: "EMP005",
      employeeName: "Citra Dewi",
      position: "Staff",
      department: "Finance",
      period: "Februari 2025",
      baseSalary: 7500000,
      allowances: [
        { name: "Tunjangan Transport", amount: 500000 },
        { name: "Tunjangan Makan", amount: 500000 },
      ],
      bonus: 500000,
      deductions: [
        { name: "BPJS Kesehatan", amount: 75000 },
        { name: "BPJS Ketenagakerjaan", amount: 100000 },
        { name: "Pajak (PPh 21)", amount: 750000 },
      ],
      grossSalary: 9000000,
      totalDeductions: 925000,
      netSalary: 8075000,
      status: "processing",
      paidDate: null,
    },
    {
      id: 6,
      employeeId: "EMP006",
      employeeName: "Eko Prasetyo",
      position: "Supervisor",
      department: "Produksi",
      period: "Februari 2025",
      baseSalary: 10000000,
      allowances: [
        { name: "Tunjangan Jabatan", amount: 2500000 },
        { name: "Tunjangan Transport", amount: 750000 },
      ],
      bonus: 1200000,
      deductions: [
        { name: "BPJS Kesehatan", amount: 100000 },
        { name: "BPJS Ketenagakerjaan", amount: 130000 },
        { name: "Pajak (PPh 21)", amount: 1300000 },
      ],
      grossSalary: 14450000,
      totalDeductions: 1530000,
      netSalary: 12920000,
      status: "pending",
      paidDate: null,
    },
  ])

  // Filter options
  const departmentOptions = [
    { label: "Semua Departemen", value: "all" },
    { label: "Produksi", value: "Produksi" },
    { label: "Marketing", value: "Marketing" },
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
    { label: "IT", value: "IT" },
  ]

  const statusOptions = [
    { label: "Semua Status", value: "all" },
    { label: "Sudah Dibayar", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Diproses", value: "processing" },
  ]

  const monthOptions = [
    { label: "Februari 2025", value: "2025-02" },
    { label: "Januari 2025", value: "2025-01" },
    { label: "Desember 2024", value: "2024-12" },
    { label: "November 2024", value: "2024-11" },
  ]

  const tabs = [
    { label: "Semua", value: "all", count: payslips.length },
    { label: "Sudah Dibayar", value: "paid", count: payslips.filter(p => p.status === "paid").length },
    { label: "Pending", value: "pending", count: payslips.filter(p => p.status === "pending").length },
  ]

  // Filter data
  const filteredPayslips = payslips.filter((payslip) => {
    const matchSearch =
      payslip.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payslip.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchDepartment =
      departmentFilter === "all" || payslip.department === departmentFilter
    const matchStatus = statusFilter === "all" || payslip.status === statusFilter
    const matchTab = activeTab === "all" || payslip.status === activeTab

    return matchSearch && matchDepartment && matchStatus && matchTab
  })

  // Handlers
  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip)
    setIsDetailModalOpen(true)
  }

  const handleDownloadPayslip = (payslip) => {
    console.log("Download payslip:", payslip.id)
    // Implement download logic
  }

  const handleSendPayslip = (payslip) => {
    console.log("Send payslip:", payslip.id)
    // Implement send email logic
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payroll Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola penggajian dan slip gaji karyawan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown
            options={monthOptions}
            value={selectedMonth}
            onChange={setSelectedMonth}
            icon={Calendar}
          />
          <Button variant="outline" icon={FileSpreadsheet}>
            Import Data
          </Button>
          <Button variant="primary" icon={Download}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Summary Card */}
      <PayrollSummary data={payrollSummary} />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="primary" icon={Send} className="justify-center">
            Kirim Semua Slip Gaji
          </Button>
          <Button variant="success" icon={CheckCircle} className="justify-center">
            Proses Pembayaran
          </Button>
          <Button variant="outline" icon={Plus} className="justify-center">
            Generate Payroll Baru
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Filter</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Dropdown
            icon={Filter}
            placeholder="Semua Departemen"
            options={departmentOptions}
            value={departmentFilter}
            onChange={setDepartmentFilter}
          />
          <Dropdown
            icon={Filter}
            placeholder="Semua Status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama/ID karyawan..."
          />
        </div>
      </div>

      {/* Payslip Cards */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-slate-600">
          Menampilkan <span className="font-semibold">{filteredPayslips.length}</span>{" "}
          slip gaji
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPayslips.map((payslip) => (
          <PayslipCard
            key={payslip.id}
            payslip={payslip}
            onView={handleViewPayslip}
            onDownload={handleDownloadPayslip}
            onSend={handleSendPayslip}
          />
        ))}
      </div>

      {filteredPayslips.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <AlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Tidak ada slip gaji ditemukan</p>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedPayslip(null)
        }}
        title="Detail Slip Gaji"
        size="lg"
      >
        {selectedPayslip && (
          <div className="p-6">
            {/* Header Info */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {selectedPayslip.employeeName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {selectedPayslip.position} • {selectedPayslip.department}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    ID: {selectedPayslip.employeeId}
                  </p>
                </div>
                <Badge
                  variant={
                    selectedPayslip.status === "paid"
                      ? "success"
                      : selectedPayslip.status === "pending"
                      ? "warning"
                      : "info"
                  }
                >
                  {selectedPayslip.status === "paid"
                    ? "Dibayar"
                    : selectedPayslip.status === "pending"
                    ? "Pending"
                    : "Diproses"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  Periode: {selectedPayslip.period}
                </span>
                {selectedPayslip.paidDate && (
                  <span className="text-slate-600">
                    Dibayar: {selectedPayslip.paidDate}
                  </span>
                )}
              </div>
            </div>

            {/* Salary Breakdown */}
            <SalaryBreakdown
              breakdown={{
                baseSalary: selectedPayslip.baseSalary,
                allowances: selectedPayslip.allowances,
                bonus: selectedPayslip.bonus,
                deductions: selectedPayslip.deductions,
                totalEarnings: selectedPayslip.grossSalary,
                totalDeductions: selectedPayslip.totalDeductions,
                netSalary: selectedPayslip.netSalary,
              }}
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                icon={Download}
                onClick={() => handleDownloadPayslip(selectedPayslip)}
              >
                Download PDF
              </Button>
              <Button
                variant="primary"
                icon={Send}
                onClick={() => handleSendPayslip(selectedPayslip)}
              >
                Kirim ke Email
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PayrollManagement