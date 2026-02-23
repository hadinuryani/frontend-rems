import React, { lazy } from 'react'
import { Routes,Route } from 'react-router-dom'

const Karyawan = lazy(() => import('../pages/Karyawan'))
const StaffManagement = lazy(() => import('../pages/StaffManagement'))
const DepartmentManagement = lazy(() => import('../pages/DepartementManagement'))
const Attendance = lazy(() => import('../pages/Attendance'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const PayrollManagement = lazy(()=> import('../pages/PayrollManagement'))
const Role = lazy(()=> import('../pages/Role'))

function AppRoutes() {
  return (
    <Routes>
        <Route element={<Karyawan/>} path='/'/>
        <Route element={<Dashboard/>} path='/dashboard'/>
        <Route element={<StaffManagement/>} path='/staf'/>
        <Route element={<DepartmentManagement/>} path='/departement'/>
        <Route element={<Role/>} path='/roles'/>X
        <Route element={<Attendance/>} path='/attendance'/>
        <Route element={<PayrollManagement/>} path='/payroll'/>
    </Routes>
  )
}

export default AppRoutes
