const Table = ({ columns, data, actions, emptyMessage = "No data available" }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg border border-slate-200">
      <table className="w-full border-collapse border border-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider border border-slate-200"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-2 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider border border-slate-200">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-8 text-center text-slate-500 border border-slate-200"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50 transition">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-center text-sm text-slate-700 border border-slate-200"
                  >
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-2 text-center border border-slate-200">
                    <div className="flex justify-center items-center gap-2">{actions(row)}</div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table