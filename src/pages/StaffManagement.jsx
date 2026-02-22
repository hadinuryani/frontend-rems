import { useState, useEffect, useMemo } from "react"
import {
  Plus,
  Upload,
  FileSpreadsheet,
  Edit,
  Trash2,
  Filter,
  Crown,
} from "lucide-react"

import Button from "@/components/Button"
import Badge from "@/components/Badge"
import Tabs from "@/components/Tabs"
import Dropdown from "@/components/Dropdown"
import SearchInput from "@/components/SearchInput"
import Table from "@/components/Table"
import Pagination from "@/components/Pagination"
import Modal from "@/components/Modal"
import StaffForm from "@/components/StaffForm"

// 🔥 API
import { GetStaff, AddStaff, UpdateStaff, DeleteStaff } from "../service/staff_api"
import { GetRole } from "../service/role_api"
import { GetDepartement } from "../service/dept_api"

const StaffManagement = () => {
  // ===============================
  // STATES
  // ===============================
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [divisionFilter, setDivisionFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const [staffData, setStaffData] = useState([])
  const [roles, setRoles] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)

  // ===============================
  // FETCH STAFF
  // ===============================
  const fetchStaff = async () => {
    try {
      setLoading(true)
      const res = await GetStaff(searchQuery, itemsPerPage)
      setStaffData(res.data || [])
    } catch (error) {
      console.log("gagal ambil staff:", error)
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // FETCH ROLES (JABATAN)
  // ===============================
  const fetchRoles = async () => {
    try {
      const res = await GetRole("", 100)

      const activeRoles = (res.data || []).filter(
        (r) => r.deleted_at === null
      )

      setRoles(activeRoles)
    } catch (err) {
      console.error("gagal fetch roles:", err)
    }
  }

  // ===============================
  // FETCH LOCATIONS (DIVISION)
  // ===============================
  const fetchLocations = async () => {
    try {
      const res = await GetDepartement("", 100)

      const activeLocations = (res.data || []).filter(
        (l) => l.deleted_at === null
      )

      setLocations(activeLocations)
    } catch (err) {
      console.error("gagal fetch location:", err)
    }
  }

  // ===============================
  // EFFECT INIT
  // ===============================
  useEffect(() => {
    fetchStaff()
    fetchRoles()
    fetchLocations()
  }, [activeTab, itemsPerPage])

  // reset page when filter berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, divisionFilter, positionFilter, statusFilter])

  // ===============================
  // OPTIONS (REALTIME 🔥)
  // ===============================
  const tabs = [
    { id: "active", label: "Staff Aktif" },
    { id: "inactive", label: "Staff Tidak Aktif" },
  ]

  const divisionOptions = useMemo(() => {
    return [
      { label: "Semua Role", value: "all" },
      ...locations.map((loc) => ({
        label: loc.name || loc.location || `Location ${loc.id}`,
        value: loc.id,
      })),
    ]
  }, [locations])

  const positionOptions = useMemo(() => {
    return [
      { label: "Semua Jabatan", value: "all" },
      ...roles.map((role) => ({
        label: role.role,
        value: role.id,
      })),
    ]
  }, [roles])

  const statusOptions = [
    { label: "Semua Status", value: "all" },
    { label: "Tetap", value: "Tetap" },
    { label: "Kontrak", value: "Kontrak" },
    { label: "Magang", value: "Magang" },
  ]

  // ===============================
  // FILTER DATA
  // ===============================
  const filteredData = staffData.filter((staff) => {
    const matchSearch =
      staff.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchDivision =
      divisionFilter === "all" ||
      staff.location_id === divisionFilter ||
      staff.division_id === divisionFilter

    const matchPosition =
      positionFilter === "all" ||
      staff.role_id === positionFilter

    const matchStatus =
      statusFilter === "all" || staff.status === statusFilter

    return matchSearch && matchDivision && matchPosition && matchStatus
  })

  // ===============================
  // PAGINATION
  // ===============================
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // ===============================
  // TABLE COLUMNS
  // ===============================
  const columns = [
    {
      header: "Nama",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.position === "Owner" && (
            <Crown size={16} className="text-yellow-500 flex-shrink-0" />
          )}
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { header: "Divisi", accessor: "division" },
    { header: "Jabatan", accessor: "position" },
    {
      header: "Status Staff",
      accessor: "status",
      render: (row) => (
        <Badge
          variant={
            row.status === "Tetap"
              ? "success"
              : row.status === "Kontrak"
              ? "warning"
              : "info"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Tgl Masuk",
      accessor: "joinDate",
      render: (row) =>
        row.joinDate
          ? new Date(row.joinDate).toLocaleDateString("id-ID")
          : "-",
    },
  ]

  // ===============================
  // HANDLERS
  // ===============================
  const handleAddStaff = async (formData) => {
    try {
      await AddStaff(formData)
      await fetchStaff()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log("gagal tambah staff:", error)
      alert(error.message || "Gagal tambah staff")
    }
  }

  const handleUpdateStaff = async (formData) => {
    try {
      await UpdateStaff(selectedStaff.id, formData)
      await fetchStaff()
      setIsEditModalOpen(false)
      setSelectedStaff(null)
    } catch (error) {
      console.log("gagal update staff:", error)
      alert(error.message || "Gagal update staff")
    }
  }

  const handleDeleteStaff = async (id) => {
    if (confirm("Apakah Anda ingin menghapus staff ini?")) {
      try {
        await DeleteStaff(id)
        await fetchStaff()
      } catch (error) {
        console.log("gagal hapus staff:", error)
        alert(error.message || "Gagal hapus staff")
      }
    }
  }

  const openEditModal = (staff) => {
    setSelectedStaff(staff)
    setIsEditModalOpen(true)
  }

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Manajemen Staff
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data karyawan perusahaan Anda
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Upload} className="hidden sm:inline-flex">
            Import Staff
          </Button>

          <Button variant="outline" icon={FileSpreadsheet} className="hidden sm:inline-flex">
            Edit Data Excel
          </Button>

          <Button variant="primary" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
            Tambah Staff
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* FILTER */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Filter</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Dropdown
            icon={Filter}
            options={divisionOptions}
            value={divisionFilter}
            onChange={setDivisionFilter}
          />

          <Dropdown
            icon={Filter}
            options={positionOptions}
            value={positionFilter}
            onChange={setPositionFilter}
          />

          <Dropdown
            icon={Filter}
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama/email/kode staff"
          />
        </div>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={paginatedData}
        loading={loading}
        actions={(row) => (
          <>
            <Button
              variant="ghost"
              size="sm"
              icon={Edit}
              onClick={() => openEditModal(row)}
            >
              Edit
            </Button>

            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDeleteStaff(row.id)}
            >
              Hapus
            </Button>
          </>
        )}
        emptyMessage="Tidak ada data staff"
      />

      {/* PAGINATION */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val)
            setCurrentPage(1)
          }}
        />
      )}

      {/* ADD MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Staff Baru"
        size="lg"
      >
        <StaffForm
          roles={roles}
          locations={locations}
          onSubmit={handleAddStaff}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedStaff(null)
        }}
        title="Edit Data Staff"
        size="lg"
      >
        <StaffForm
          staff={selectedStaff}
          roles={roles}
          locations={locations}
          onSubmit={handleUpdateStaff}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedStaff(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default StaffManagement