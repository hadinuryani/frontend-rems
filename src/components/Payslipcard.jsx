import { Download, Eye, Send } from "lucide-react"
import Button from "@/components/Button"
import Badge from "@/components/Badge"

const PayslipCard = ({ payslip, onView, onDownload, onSend }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "paid":
        return "success"
      case "pending":
        return "warning"
      case "processing":
        return "info"
      case "failed":
        return "danger"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "paid":
        return "Dibayar"
      case "pending":
        return "Pending"
      case "processing":
        return "Diproses"
      case "failed":
        return "Gagal"
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
            {payslip.employeeName}
          </h4>
          <p className="text-sm text-slate-500">{payslip.position}</p>
          <p className="text-xs text-slate-400 mt-1">
            {payslip.department} • {payslip.employeeId}
          </p>
        </div>
        <Badge variant={getStatusVariant(payslip.status)}>
          {getStatusLabel(payslip.status)}
        </Badge>
      </div>

      {/* Salary Info */}
      <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-600 mb-1">Gaji Kotor</p>
            <p className="text-sm font-semibold text-slate-800">
              {formatCurrency(payslip.grossSalary)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">Potongan</p>
            <p className="text-sm font-semibold text-red-600">
              -{formatCurrency(payslip.deductions)}
            </p>
          </div>
        </div>
        <div className="border-t border-blue-200 mt-3 pt-3">
          <p className="text-xs text-slate-600 mb-1">Gaji Bersih</p>
          <p className="text-lg font-bold text-blue-600">
            {formatCurrency(payslip.netSalary)}
          </p>
        </div>
      </div>

      {/* Period */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span>Periode: {payslip.period}</span>
        {payslip.paidDate && <span>Dibayar: {payslip.paidDate}</span>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={Eye}
          onClick={() => onView(payslip)}
          className="flex-1"
        >
          Lihat
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={Download}
          onClick={() => onDownload(payslip)}
        >
          <span className="sr-only">Download</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={Send}
          onClick={() => onSend(payslip)}
        >
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  )
}

export default PayslipCard