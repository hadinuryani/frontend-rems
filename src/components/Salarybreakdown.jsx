const SalaryBreakdown = ({ breakdown }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const SectionRow = ({ label, value, bold = false, color = "text-slate-700" }) => (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm ${bold ? "font-semibold" : ""} ${color}`}>
        {label}
      </span>
      <span className={`text-sm ${bold ? "font-bold" : "font-medium"} ${color}`}>
        {formatCurrency(value)}
      </span>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Pendapatan */}
      <div>
        <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Pendapatan
        </h4>
        <div className="bg-slate-50 rounded-lg p-4 space-y-1">
          <SectionRow label="Gaji Pokok" value={breakdown.baseSalary} />
          {breakdown.allowances?.map((allowance, index) => (
            <SectionRow
              key={index}
              label={allowance.name}
              value={allowance.amount}
            />
          ))}
          {breakdown.bonus > 0 && <SectionRow label="Bonus" value={breakdown.bonus} />}
          <div className="border-t border-slate-200 mt-2 pt-2">
            <SectionRow
              label="Total Pendapatan"
              value={breakdown.totalEarnings}
              bold
              color="text-green-600"
            />
          </div>
        </div>
      </div>

      {/* Potongan */}
      <div>
        <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Potongan
        </h4>
        <div className="bg-slate-50 rounded-lg p-4 space-y-1">
          {breakdown.deductions?.map((deduction, index) => (
            <SectionRow
              key={index}
              label={deduction.name}
              value={deduction.amount}
              color="text-red-600"
            />
          ))}
          <div className="border-t border-slate-200 mt-2 pt-2">
            <SectionRow
              label="Total Potongan"
              value={breakdown.totalDeductions}
              bold
              color="text-red-600"
            />
          </div>
        </div>
      </div>

      {/* Gaji Bersih */}
      <div className="bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Gaji Bersih (Take Home Pay)</p>
            <p className="text-3xl font-bold">{formatCurrency(breakdown.netSalary)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryBreakdown