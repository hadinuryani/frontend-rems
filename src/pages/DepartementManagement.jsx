import {useState,useEffect } from "react";
import {Plus, Leaf, Trash2, Users,Filter } from "lucide-react";
import {Button,Badge,Tabs,SearchInput,Table,Pagination,Modal,} from "@/components";
import Dropdown from "@/components/Dropdown"
import {AddDepartement,GetDepartement,DeleteDepartement,ActiveDepartement } from "../service/dept_api"

const DepartmentManagement = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(()=>{
    handleGetDepartement()
  },[activeTab]);

  const tabs = [
    { label: "Active", value: "active" },
    { label: "No Active", value: "inactive" },
  ];

  const filteredData = departments
  .filter((dept) => {
    if (activeTab === "active") {
      return dept.status === "active";
    }
    return dept.status === "inactive";
  })
  .filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((dept) => {
    if (typeFilter === "all") return true;
    return dept.type === typeFilter;
  })
  .sort((a, b) => {
    if (sortFilter === "most") return b.staffCount - a.staffCount;
    if (sortFilter === "least") return a.staffCount - b.staffCount;
    return 0;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { header: "Departemen", accessor: "name" },
    { header: "Tempat Berkerja", accessor: "type" },
    { header: "Alamat", accessor: "address" },
    {
      header: "Jumlah Staff",
      accessor: "staffCount",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Users size={16} className="text-slate-500" />
          <span className="font-medium">{row.staffCount}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge variant={row.status === "active" ? "success" : "danger"}>
          {row.status === "active" ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
  ];
  

  const [formData, setFormData] = useState({
    name: "",
    type: "store",
    address: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetDepartement = async ()=>{
    try {
      setLoading(true)

      let filterValue = "";

      if (activeTab === "active") {
        filterValue = "active";
      } else if (activeTab === "inactive") {
        filterValue = "inactive";
      }

      const response = await GetDepartement(filterValue, 10);

      if (response.success){
        const formatedData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          address: item.address,
          staffCount: item.amount,
          status: item.deleted_at.Valid ? "inactive" : "active",
        }));

        setDepartments(formatedData);
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleAddDepartment = async () => {
    if (!formData.name || !formData.address) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);
      const response = await AddDepartement(formData);

      if (response.success) {
        const newDept = {
          id : response.data.id,
          name : response.data.name,
          type : response.data.type,
          address: response.data.address,
          staffCount : 0,
          status : "active",
        };
        setDepartments((prev)=>[...prev,newDept])
      }

      alert("Departemen berhasil ditambahkan");

      setIsAddModalOpen(false);
      setFormData({
        name: "",
        type: "store",
        address: "",
      });
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan departemen");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus departement ini ?")
    if (!confirmDelete) return;
    try {
      setLoading(true);

      const response = await DeleteDepartement(id)

      if (response.success){
        // hapus data dari state tanpa fetch ulang
        setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        alert("Departement berhasil di hapus");
      }
    }catch(error){
      console.log(error);
      alert("Gagal Menghapud Departement")
    }finally {
      setLoading(false)
    }
  }
  const handleActivateDepartment = async (id)=> {
    const confirmActive = window.confirm("Yakin ingin aktivasi kembali")
    if(!confirmActive) return;
    try{
      setLoading(true)
      const response = await ActiveDepartement(id)

      if (response.success){
        await handleGetDepartement();
        alert("Departement berhasil diaktifkan kembali");
      }
    }catch(error){
      console.log(error)
      alert("Gagal mengaktifkan departement");
    }finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Manajemen Departemen
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola departemen dan divisi perusahaan
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}>
          Perluasan Operasional
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Filter</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Dropdown
            label="Tipe Lokasi"
            options={[
              { label: "Semua", value: "all" },
              { label: "Store", value: "store" },
              { label: "Office", value: "office" },
              { label: "Warehouse", value: "warehouse" },
            ]}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <Dropdown
            label="Urutan Staff"
            options={[
              { label: "Tidak Ada", value: "none" },
              { label: "Terbanyak ke Sedikit", value: "most" },
              { label: "Sedikit ke Terbanyak", value: "least" },
            ]}
            value={sortFilter}
            onChange={setSortFilter}
          />
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari departemen..."
          className="max-w-md"
        />
        <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
          Total: {filteredData.length} departemen
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedData}
        actions={(row) => {
          if (row.status === "active") {
            return (
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                title="Hapus"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => handleDeleteDepartment(row.id)} />
            );
          }
          return (
            <Button
              variant="ghost"
              size="sm"
              icon={Leaf}
              title="Aktifkan"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => handleActivateDepartment(row.id)} />
          );
        }}
        emptyMessage="Tidak ada departemen"
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}
        title="Tambah Departemen Baru" size="md">

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Nama Departemen<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
              placeholder="Penjualan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Type<span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg bg-white"
            >
              <option value="store">Store</option>
              <option value="warehouse">Warehouse</option>
              <option value="office">Office</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
              placeholder="Address"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={handleAddDepartment}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Tambah Departemen"}
            </Button>
          </div>
        </div>
      </Modal>
      
    </div>
  );
};

export default DepartmentManagement;
