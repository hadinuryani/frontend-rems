// import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  HandCoins,
  LogOut,
  KeyRound,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import Logo from "@/assets/logo.png"

export default function Sidebar({ open, setOpen, collapsed, setCollapsed }){

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Attendance", icon: ClipboardList, path: "/attendance" },
    { name: "Location", icon: Building2, path: "/departement" },
    { name: "Employee", icon: Users, path: "/staf" },
    { name: "Roles", icon: KeyRound, path: "/roles" },
    { name: "Payroll", icon: HandCoins, path: "/payroll" },
  ]

  return (
    <>
      {/* OVERLAY for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed  top-0 left-0
          ${collapsed ? "w-20" : "w-72"}
          h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-gray-50
          text-gray-700 shadow-xl border-r border-gray-200
          z-50
          transform transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="px-4 py-6 border-b border-gray-200 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* LOGO */}
              <button
                onClick={() => collapsed && setCollapsed(!collapsed)}
                className={`
                  w-11 h-11 flex items-center justify-center shadow-lg flex-shrink-0
                  transition-all duration-200 
                  ${collapsed ? "hover:scale-110 cursor-pointer" : "cursor-default"}
                `}
              >
                <img
                  src={Logo}
                  alt="logo"
                  className="w-11 h-11 object-contain rounded"
                />
              </button>

              {/* TITLE (Only when expanded) */}
              {!collapsed && (
                <div className="flex-1">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent tracking-wide">
                    REMS
                  </h2>
                  <p className="text-[11px] text-gray-500 tracking-wider">
                    Retail Enterprise Management System
                  </p>
                </div>
              )}

              {/* COLLAPSE BUTTON - only visible on desktop when expanded */}
              {!collapsed && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="
                    hidden md:flex items-center justify-center
                    w-9 h-9 rounded-lg hover:bg-gray-100 transition-all duration-200 flex-shrink-0 group
                  "
                >
                  <div className="flex flex-col gap-1.5 w-5">
                    <span className="h-0.5 w-full bg-gray-600 rounded-full group-hover:bg-blue-600 transition-colors" />
                    <span className="h-0.5 w-full bg-gray-600 rounded-full group-hover:bg-blue-600 transition-colors" />
                    <span className="h-0.5 w-full bg-gray-600 rounded-full group-hover:bg-blue-600 transition-colors" />
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* MENU */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)} // Close sidebar on mobile when clicking menu
                className={({ isActive }) =>
                  `
                  flex items-center
                  ${collapsed ? "justify-center" : "gap-3"}
                  px-4 py-3 rounded-xl
                  transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }
                `
                }
              >
                <menu.icon
                  size={20}
                  className="group-hover:scale-110 transition"
                />

                {!collapsed && (
                  <span className="tracking-wide text-sm font-medium">
                    {menu.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* FOOTER */}
          <div className="px-3 py-4 border-t border-gray-200 bg-white/60 backdrop-blur-sm">
            <button
              className={`
                flex items-center
                ${collapsed ? "justify-center" : "gap-3"}
                px-4 py-3 w-full rounded-xl
                hover:bg-red-50 text-red-500 hover:text-red-600 transition
                font-medium
              `}
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}