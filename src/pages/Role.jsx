import { useState, useEffect } from "react";
import { Plus, Trash2, ShieldCheck } from "lucide-react";
import {
  Button,
  Badge,
  Tabs,
  SearchInput,
  Table,
  Pagination,
  Modal,
} from "@/components";

import {
  GetRole,
  AddRole,
  DeleteRole,
  ActiveRole,
} from "../service/role_api";

const RoleManagement = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, [activeTab]);

  // ================= FETCH =================
  const fetchRoles = async () => {
    try {
      setLoading(true);

      let filterValue = "";
      if (activeTab === "active") filterValue = "active";
      else if (activeTab === "inactive") filterValue = "inactive";

      const response = await GetRole(filterValue, 10);

      if (response.success) {
        const formatted = response.data.map((item) => ({
          id: item.id,
          role: item.role,
          description: item.description,
          status: item.deleted_at ? "Tidak Aktif" : "Aktif",
        }));

        setRoles(formatted);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= TABS =================
  const tabs = [
    { label: "Active", value: "active" },
    { label: "No Active", value: "inactive" },
  ];

  // ================= FILTER =================
  const filteredData = roles
    .filter((r) =>
      activeTab === "active"
        ? r.status === "Aktif"
        : r.status === "Tidak Aktif"
    )
    .filter((r) =>
      r.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ================= PAGINATION =================
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ================= TABLE =================
  const columns = [
    { header: "Nama Role", accessor: "role" },
    { header: "Deskripsi", accessor: "description" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge variant={row.status === "Aktif" ? "success" : "danger"}>
          {row.status}
        </Badge>
      ),
    },
  ];

  // ================= FORM =================
  const [formData, setFormData] = useState({
    role: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD =================
  const handleAddRole = async () => {
    if (!formData.role) {
      alert("Nama role wajib diisi");
      return;
    }

    try {
      setLoading(true);
      const response = await AddRole(formData);

      if (response.success) {
        const newRole = {
          id: response.data.id,
          role: response.data.role,
          description: response.data.description,
          status: "Aktif",
        };

        setRoles((prev) => [...prev, newRole]);
        alert("Role berhasil ditambahkan");
      }

      setIsAddModalOpen(false);
      setFormData({ role: "", description: "" });
    } catch (err) {
      console.log(err);
      alert("Gagal menambahkan role");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDeleteRole = async (id) => {
    if (!window.confirm("Yakin hapus role ini?")) return;

    try {
      setLoading(true);
      const response = await DeleteRole(id);

      if (response.success) {
        setRoles((prev) => prev.filter((r) => r.id !== id));
        alert("Role berhasil dihapus");
      }
    } catch (err) {
      console.log(err);
      alert("Gagal hapus role");
    } finally {
      setLoading(false);
    }
  };

  // ================= ACTIVATE =================
  const handleActivateRole = async (id) => {
    if (!window.confirm("Aktifkan kembali role ini?")) return;

    try {
      setLoading(true);
      const response = await ActiveRole(id);

      if (response.success) {
        await fetchRoles();
        alert("Role berhasil diaktifkan");
      }
    } catch (err) {
      console.log(err);
      alert("Gagal aktivasi role");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Role</h1>
          <p className="text-sm text-slate-500">
            Kelola role dan hak akses
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Role
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari role..."
        className="max-w-md"
      />

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedData}
        actions={(row) =>
          row.status === "Aktif" ? (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              className="text-red-500"
              onClick={() => handleDeleteRole(row.id)}
            >
              Hapus
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              icon={ShieldCheck}
              className="text-green-600"
              onClick={() => handleActivateRole(row.id)}
            >
              Aktifkan
            </Button>
          )
        }
        emptyMessage="Tidak ada role"
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

      {/* Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Role"
        size="md"
      >
        <div className="p-6 space-y-4">
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Nama Role"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={handleAddRole}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Tambah"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;