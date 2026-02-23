import { useState, useEffect } from "react"
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

import { GetPayrollRecords, SendAllPayslips, ProcessPayment } from "@/service/payroll_api"
import { GetDepartement } from "@/service/dept_api"

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayslip, setSelectedPayslip] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("2025-02")
  const [departments, setDepartments] = useState([])
  const [payslips, setPayslips] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchPayrollData()
  }, [departmentFilter, selectedMonth])

  const fetchPayrollData = async () => {
    try {
      // Fetch departments
      const deptRes = await GetDepartement("", 100).catch(err => ({ success: false, error: err }))
      if (deptRes.success && deptRes.data) {
        setDepartments(deptRes.data)
      }

      // Fetch payroll records
      const payrollRes = await GetPayrollRecords(
        selectedMonth,
        departmentFilter,
        100
      ).catch(err => ({ success: false, error: err }))

      if (payrollRes.success && Array.isArray(payrollRes.data)) {
        // Transform API data to match component expectations
        const transformedPayslips = payrollRes.data.map((emp, index) => ({
          id: emp.id,
          employeeId: `EMP${String(emp.id).padStart(3, "0")}`,
          employeeName: emp.name,
          position: emp.position,
          department: emp.department,
          period: `Februari 2025`,
          baseSalary: emp.base_salary || 0,
          allowances: [],
          bonus: 0,
          deductions: [],
          grossSalary: emp.base_salary || 0,
          totalDeductions: 0,
          netSalary: emp.base_salary || 0,
          status: emp.status,
          paidDate: null,
        }))
        setPayslips(transformedPayslips)
      }
    } catch (error) {
      console.error("Error fetching payroll data:", error)
      setPayslips([])
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Calculate payroll summary from actual data
  const payrollSummary = {
    totalPayroll: payslips.reduce((sum, p) => sum + (p.netSalary || 0), 0),
    totalEmployees: payslips.length,
    paidCount: payslips.filter(p => p.status === "paid").length,
    pendingCount: payslips.filter(p => p.status === "pending").length,
    trend: {
      direction: "up",
      value: "+12.5%",
    },
  }

  const stats = [
    {
      title: "Total Payroll",
      value: formatCurrency(payrollSummary.totalPayroll / 1000000) + "M",
      icon: DollarSign,
      trend: "up",
      trendValue: "+12.5%",
      subtitle: "Februari 2025",
      variant: "success",
    },
    {
      title: "Total Karyawan",
      value: payrollSummary.totalEmployees.toString(),
      icon: Users,
      subtitle: "Dalam sistem",
      variant: "primary",
    },
    {
      title: "Pending",
      value: payrollSummary.pendingCount.toString(),
      icon: Clock,
      subtitle: "Perlu diproses",
      variant: "warning",
    },
    {
      title: "Rata-rata Gaji",
      value: formatCurrency((payrollSummary.totalPayroll / Math.max(payslips.length, 1)) / 1000000) + "M",
      icon: TrendingUp,
      trend: "up",
      trendValue: "+3.2%",
      subtitle: "Per karyawan",
      variant: "purple",
    },
  ]

  // Filter options
  const departmentOptions = [
    { label: "Semua Departemen", value: "all" },
    ...(departments && Array.isArray(departments)
      ? departments.map((dept) => ({
          label: dept.name || dept.division,
          value: dept.name || dept.division,
        }))
      : []),
  ]

  const statusOptions = [
    { label: "Semua Status", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Sudah Dibayar", value: "paid" },
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

  const handleSendAllPayslips = async () => {
    try {
      setIsLoading(true)
      const result = await SendAllPayslips(selectedMonth)
      if (result.success) {
        alert(`✅ Berhasil mengirim semua slip gaji untuk ${selectedMonth}!`)
      }
    } catch (error) {
      alert("❌ Gagal mengirim slip gaji: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProcessPayment = async () => {
    try {
      setIsLoading(true)
      const result = await ProcessPayment(selectedMonth)
      if (result.success) {
        alert(`✅ Berhasil memproses pembayaran untuk ${selectedMonth}!`)
        // Refresh payroll data
        fetchPayrollData()
      }
    } catch (error) {
      alert("❌ Gagal memproses pembayaran: " + error.message)
    } finally {
      setIsLoading(false)
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="primary" 
            icon={Send} 
            className="justify-center"
            onClick={handleSendAllPayslips}
            disabled={isLoading}
          >
            {isLoading ? "Sedang Mengirim..." : "Kirim Semua Slip Gaji"}
          </Button>
          <Button 
            variant="success" 
            icon={CheckCircle} 
            className="justify-center"
            onClick={handleProcessPayment}
            disabled={isLoading}
          >
            {isLoading ? "Sedang Memproses..." : "Proses Pembayaran"}
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          💡 Aksi akan diterapkan untuk bulan yang dipilih: <strong>{selectedMonth}</strong>
        </p>
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