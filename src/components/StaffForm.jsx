import { useState } from "react"
import Button from "@/components/Button"

const StaffForm = ({ staff, roles = [], locations = [],status = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: staff?.name || "",
    email: staff?.email || "",
    phone: staff?.phone || "",
    role_id: staff?.role_id || "",
    location_id: staff?.location_id || "",
    status: staff?.status_id || "",
    address: staff?.address || "",
    salary: staff?.salary || 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === "role_id" || name === "location_id" || name === "status" || name === "salary") {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : "" }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            placeholder="email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            No. Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            placeholder="08xxxxxxxxxx"
          />
        </div>

        {/* Location/Department */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Location <span className="text-red-500">*</span>
          </label>
          <select
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
          >
            <option value="">Pilih Departemen</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Position/Role */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Jabatan <span className="text-red-500">*</span>
          </label>
          <select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
          >
            <option value="">Pilih Jabatan</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Status Staff <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
          >
            <option value="">Pilih Status</option>
            {status.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nama_status}
              </option>
            ))}
          </select>
        </div>

        
        {/* Address - Full width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Alamat Lengkap <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
            placeholder="Masukkan alamat lengkap"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button variant="primary" type="submit">
          {staff ? "Update Staff" : "Tambah Staff"}
        </Button>
      </div>
    </form>
  )
}

export default StaffForm