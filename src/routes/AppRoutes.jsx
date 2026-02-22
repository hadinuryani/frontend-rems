import React, { lazy } from 'react'
import { Routes,Route } from 'react-router-dom'
// import Karyawan from '../pages/Karyawan'
import StaffManagement from '../pages/StaffManagement'
import DepartmentManagement from '../pages/DepartementManagement'
import Attendance from '../pages/Attendance'
import Dashboard from '../pages/Dashboard'
import PayrollManagement from '../pages/PayrollMabagement'
import Role from '../pages/Role'

const Karyawan = lazy('../pages/Karyawan')

function AppRoutes() {
  return (
    <Routes path={"/hrd"}>
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
