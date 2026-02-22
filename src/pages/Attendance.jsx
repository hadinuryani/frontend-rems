import { useState, useEffect } from "react"
import { Calendar, Clock, Filter } from "lucide-react"
import {
  Button,
  Badge,
  Tabs,
  Dropdown,
  SearchInput,
  Table,
  Pagination,
} from "@/components"
import { GetStaff } from "@/service/staff_api"

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("today")
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)

  // States for real data
  const [staffData, setStaffData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])

  // Fetch staff data and generate attendance records
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await GetStaff("", 100)
        if (res.success && res.data) {
          setStaffData(res.data)
          // Generate sample attendance records from staff data
          const records = res.data.map((staff) => ({
            id: staff.id,
            name: staff.name,
            department: staff.division,
            checkIn: Math.random() > 0.2 ? generateTime("08:00", "09:00") : "-",
            checkOut: Math.random() > 0.2 ? generateTime("17:00", "18:00") : "-",
            status: generateAttendanceStatus(),
            date: new Date().toISOString().split("T")[0],
          }))
          setAttendanceData(records)
        }
      } catch (error) {
        console.error("Error fetching staff data:", error)
        // Fallback to sample data if API fails
        setSampleAttendanceData()
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const generateTime = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(":").map(Number)
    const [endHour, endMin] = endTime.split(":").map(Number)
    const randomHour = startHour + Math.floor(Math.random() * (endHour - startHour))
    const randomMin = Math.floor(Math.random() * 60)
    return `${String(randomHour).padStart(2, "0")}:${String(randomMin).padStart(2, "0")}`
  }

  const generateAttendanceStatus = () => {
    const statuses = ["Hadir", "Hadir", "Hadir", "Terlambat", "Izin", "Sakit"]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const setSampleAttendanceData = () => {
    setAttendanceData([
      {
        id: 1,
        name: "Dina Darius",
        department: "Produksi",
        checkIn: "08:00",
        checkOut: "17:00",
        status: "Hadir",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 2,
        name: "Alfina Amalia",
        department: "Marketing",
        checkIn: "08:15",
        checkOut: "17:30",
        status: "Terlambat",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 3,
        name: "Suhada Akbra",
        department: "IT",
        checkIn: "-",
        checkOut: "-",
        status: "Izin",
        date: new Date().toISOString().split("T")[0],
      },
    ])
  }

  const tabs = [
    { label: "Hari Ini", value: "today" },
    { label: "Minggu Ini", value: "week" },
    { label: "Bulan Ini", value: "month" },
  ]

  // Get unique departments from attendance data
  const uniqueDepartments = [...new Set(attendanceData.map((a) => a.department))].filter(Boolean)
  const departmentOptions = [
    { label: "Semua Departemen", value: "all" },
    ...uniqueDepartments.map((dept) => ({ label: dept, value: dept })),
  ]

  const statusOptions = [
    { label: "Semua Status", value: "all" },
    { label: "Hadir", value: "Hadir" },
    { label: "Terlambat", value: "Terlambat" },
    { label: "Izin", value: "Izin" },
    { label: "Sakit", value: "Sakit" },
    { label: "Alfa", value: "Alfa" },
  ]

  const filteredData = attendanceData.filter((attendance) => {
    const matchSearch = attendance.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchDepartment =
      departmentFilter === "all" || attendance.department === departmentFilter
    const matchStatus = statusFilter === "all" || attendance.status === statusFilter

    return matchSearch && matchDepartment && matchStatus
  })

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusVariant = (status) => {
    switch (status) {
      case "Hadir":
        return "success"
      case "Terlambat":
        return "warning"
      case "Izin":
        return "info"
      case "Sakit":
        return "primary"
      case "Alfa":
        return "danger"
      default:
        return "default"
    }
  }

  const columns = [
    { header: "Nama", accessor: "name" },
    { header: "Departemen", accessor: "department" },
    {
      header: "Check In",
      accessor: "checkIn",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-slate-400" />
          <span className={row.checkIn === "-" ? "text-slate-400" : "font-medium"}>
            {row.checkIn}
          </span>
        </div>
      ),
    },
    {
      header: "Check Out",
      accessor: "checkOut",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-slate-400" />
          <span className={row.checkOut === "-" ? "text-slate-400" : "font-medium"}>
            {row.checkOut}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>
      ),
    },
  ]

  // Statistics
  const stats = [
    {
      label: "Total Hadir",
      value: attendanceData.filter((a) => a.status === "Hadir").length,
      variant: "success",
    },
    {
      label: "Terlambat",
      value: attendanceData.filter((a) => a.status === "Terlambat").length,
      variant: "warning",
    },
    {
      label: "Izin",
      value: attendanceData.filter((a) => a.status === "Izin").length,
      variant: "info",
    },
    {
      label: "Sakit",
      value: attendanceData.filter((a) => a.status === "Sakit").length,
      variant: "primary",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Absensi Karyawan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitoring kehadiran karyawan harian
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" icon={Calendar}>
            Pilih Tanggal
          </Button>
          <Button variant="primary">Export Laporan</Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition"
          >
            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
              <Badge variant={stat.variant} className="text-xs">
                {((stat.value / attendanceData.length) * 100).toFixed(0)}%
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Filter Section */}
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
            placeholder="Cari nama karyawan..."
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedData}
        emptyMessage="Tidak ada data absensi"
      />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  )
}

export default Attendance