import { useState, useRef, useEffect } from "react"
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react"

export default function Topbar({ onMenuClick }) {
  const [openProfile, setOpenProfile] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false)
      }
    }

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openProfile])

  return (
    <header className="w-full bg-gradient-to-br from-slate-50 via-white to-gray-50 border-b border-slate-200 px-4 md:px-8 py-4 md:py-4 flex items-center justify-between sticky top-0 z-30">
      {/* LEFT */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition active:scale-95"
        >
          <Menu size={22} className="text-slate-700" />
        </button>

        <h1 className="text-base md:text-xl font-semibold text-slate-800 font-bold">
          Dashboard HRD
        </h1>
      </div>

      {/* CENTER SEARCH - Hidden on mobile */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-[400px]">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full focus-within:ring-2 focus-within:ring-slate-300 transition">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search employees, reports..."
            className="bg-transparent outline-none px-3 w-full text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search button on mobile */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition">
          <Search size={20} className="text-slate-600" />
        </button>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute -top-0.5 -right-0.5 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 md:gap-3 hover:bg-slate-100 rounded-lg p-1.5 md:p-2 transition active:scale-95"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs md:text-sm font-semibold shadow-sm">
              AH
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800">
                Ahmad Hadi
              </p>
              <span className="text-xs text-slate-500">Owner</span>
            </div>

            <ChevronDown
              size={16}
              className={`hidden sm:block text-slate-500 transition-transform duration-200 ${
                openProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {openProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {/* Profile info on mobile (shown in dropdown) */}
              <div className="sm:hidden px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-800">
                  Ahmad Hadi
                </p>
                <span className="text-xs text-slate-500">Owner</span>
              </div>

              <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 transition">
                <User size={16} />
                Profile
              </button>

              <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 transition">
                <Settings size={16} />
                Settings
              </button>

              <div className="border-t border-slate-200"></div>

              <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}