import { useState, useEffect, useMemo } from "react"
import { Plus,Upload,FileSpreadsheet,Edit,Trash2,Filter,Crown, } from "lucide-react"

import Button from "@/components/Button"
import Tabs from "@/components/Tabs"
import Dropdown from "@/components/Dropdown"
import SearchInput from "@/components/SearchInput"
import Table from "@/components/Table"
import Pagination from "@/components/Pagination"
import Modal from "@/components/Modal"
import StaffForm from "@/components/StaffForm"

import { GetStaff,AddStaff,UpdateStaff,DeleteStaff,} from "../service/staff_api"
import { GetRole } from "../service/role_api"
import { GetDepartement } from "../service/dept_api"
import { GetStatus } from "../service/status_api"

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const [staffData, setStaffData] = useState([])
  const [roles, setRoles] = useState([])
  const [locations, setLocations] = useState([])
  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)

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

  const fetchRoles = async () => {
    try {
      const res = await GetRole("", 100)
      const activeRoles = (res.data || []).filter(
        (r) => r.deleted_at.Valid === false
      )
      setRoles(activeRoles)
    } catch (err) {
      console.error("gagal fetch roles:", err)
    }
  }

  const fetchLocations = async () => {
    try {
      const res = await GetDepartement("", 100)
      const activeLocations = (res.data || []).filter(
        (l) => l.deleted_at.Valid === false
      )
      setLocations(activeLocations)
    } catch (err) {
      console.error("gagal fetch location:", err)
    }
  }

  const fetchStatus = async () => {
    try {
      const res = await GetStatus()
      setStatuses(res.data )
      console.log(res.data,"")
    } catch (err) {
      console.error("gagal fetch status:", err)
    }
  }

  useEffect(() => {
    fetchStaff()
    fetchRoles()
    fetchLocations()
    fetchStatus()
  }, [activeTab, itemsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, roleFilter, locationFilter, statusFilter])

  const tabs = [
    { id: "active", label: "Staff Aktif" },
    { id: "inactive", label: "Staff Tidak Aktif" },
  ]

  const roleOptions = useMemo(() => {
    return [
      { label: "Semua Role", value: "all" },
      ...roles.map((role) => ({
        label: role.role,
        value: String(role.id),
      })),
    ]
  }, [roles])

  const locationOptions = useMemo(() => {
  return [
    { label: "Semua Location", value: "all" },
    ...locations.map((loc) => ({
      label: loc.name || loc.location || `Location ${loc.id}`,
      value: String(loc.id),
    })),
  ]
}, [locations])

  const statusOptions = useMemo(() => {
    return [
      { label: "Semua Status", value: "all" },
      ...statuses.map((s) => ({
        label: s.nama_status,
        value: s.id,
      })),
    ];
  }, [statuses]);


  const filteredData = staffData.filter((staff) => {
    const matchSearch =
      staff.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchRole =
      roleFilter === "all" ||
      Number(staff.role_id) === Number(roleFilter)

    const matchLocation =
      locationFilter === "all" ||
      Number(staff.location_id) === Number(locationFilter)

    const matchStatus =
      statusFilter === "all" ||
      Number(staff.status_id) === Number(statusFilter)

    return matchSearch && matchRole && matchLocation && matchStatus
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
    { header: "NIK", accessor: "nik" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
    { header: "Location", accessor: "location" },
    { header: "Status Staff", accessor: "status"},
    {
      header: "Gaji",
      accessor: "salary",
      render: (row) => {
        if (row.salary === null || row.salary === undefined) return "-";
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(row.salary);
      },
    },
    { header: "Tanggal Masuk", accessor: "created_at",render: (row) =>
    row.created_at
      ? new Date(row.created_at).toLocaleDateString("id-ID")
      : "-",},
  ];

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

  return (
    <div className="space-y-6">
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

          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Tambah Staff
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Filter</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Dropdown icon={Filter} options={roleOptions} value={roleFilter} onChange={setRoleFilter} />
          <Dropdown icon={Filter} options={locationOptions} value={locationFilter} onChange={setLocationFilter} />
          <Dropdown icon={Filter} options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Cari nama/email/kode staff" />
        </div>
      </div>

      <Table
        columns={columns}
        data={paginatedData}
        loading={loading}
        actions={(row) => (
          <>
            <Button variant="ghost" size="sm" icon={Edit} title="Edit" onClick={() => openEditModal(row)}/>
            
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              title="Hapus"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDeleteStaff(row.id)}/>
          </>
        )}
        emptyMessage="Tidak ada data staff"
      />

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

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Staff Baru"
        size="lg"
      >
        <StaffForm
          roles={roles}
          statuses={statuses}
          locations={locations}
          status={statuses}
          onSubmit={handleAddStaff}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

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
          status={statuses}
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