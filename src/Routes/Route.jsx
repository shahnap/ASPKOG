import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import MainDashBoard from '../DashBoard/MainDashBoard';
import FinanceDashboard from '../FinanceManagement/FinanceDashboard';
import ExpanceMaster from '../FinanceManagement/ExpanceMaster';
import AddExpance from '../FinanceManagement/AddExpance';
import ExpenseReport from '../FinanceManagement/ExpenseReport';
import TargetDashboard from '../Targets/TargetDashboard';
import ToDo from '../Targets/Todo';


function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<MainDashBoard />} />
        <Route path="/ExpanceMaster" element={<ExpanceMaster />} />
        <Route path="/TargetDashboard" element={<TargetDashboard />} />
        <Route path="/AddExpance" element={<AddExpance />} />
        <Route path="/Todo" element={<ToDo />} />
        <Route path="/Expensereport" element={<ExpenseReport />} />
        <Route path="/FinanceDashboard" element={<FinanceDashboard />} />
      </Routes>
    </Router>
  );
}

export default Routers;
