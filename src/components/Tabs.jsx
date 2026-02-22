const Tabs = ({ tabs, activeTab, onChange, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onChange(tab.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
            ${
              activeTab === tab.value
                ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            }
          `}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.value
                  ? "bg-blue-100 text-blue-600"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default Tabs