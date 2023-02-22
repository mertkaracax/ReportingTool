import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import FPassword from "./pages/FPassword";
import DataGridForm from "./pages/DataGridForm";
import FormComponent from "./pages/FormComponent";
import PivotTableDetailedCustom from "./pages/PivotTableDetailedCustom";
import "./App.css";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import ShowAllReports from "./pages/ShowAllReports";
import PivotTableReport from "./pages/PivotTableReport";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminUsersPage from "./pages/AdminUsersPage";

function App() {
  const [rows, setRows] = useState([{ name: "ProductionDate" }]);
  const [columns, setColumns] = useState([
    { name: "WorkCenterId" },
    { name: "MaterialName" },
  ]);
  const [values, setValues] = useState([
    { name: "TargetDuration" },
    { name: "ProducedAmount" },
    { name: "RejectAmount" },
  ]);
  const [url, setUrl] = useState();

  const [workCenterIds, setWorkCenterIds] = useState([104, 105, 154, 2]);
  const [dates, setDates] = useState({
    startDate: "2022-11-30",
    endDate: "2022-11-01",
  });

  const [isSavedReport, setIsSavedReport] = useState(false);
  const [savedReportName, setSavedReportName] = useState();

  function onDateSelected(startDate, endDate) {
    setDates((prevState) => {
      return { startDate, endDate };
    });
  }
  function onWorkCenterIdSelected(ids) {
    setWorkCenterIds(ids);
  }

  function openReport(reportData) {
    setIsSavedReport(true);
    setSavedReportName(reportData);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/Dashboard"
          element={
            <Dashboard
              openReport={openReport}
              onDateSelected={onDateSelected}
              onWorkCenterIdSelected={onWorkCenterIdSelected}
            />
          }
        ></Route>
        <Route
          path="/Admin"
          element={
            <AdminDashboard
              onDateSelected={onDateSelected}
              onWorkCenterIdSelected={onWorkCenterIdSelected}
            />
          }
        ></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/FPassword" element={<FPassword />}></Route>
        <Route path="/DataGridForm" element={<DataGridForm />}></Route>
        <Route path="/Form" element={<FormComponent />}></Route>
        <Route
          path="/Pivot"
          element={
            <PivotTableDetailedCustom
              workCenterIds={workCenterIds}
              startDate={dates.startDate}
              endDate={dates.endDate}
              rows={rows}
              columns={columns}
              values={values}
              savedUrl={url}
              isSaved={isSavedReport}
              savedReportName={savedReportName}
            />
          }
        ></Route>
        <Route
          path="ShowAllReports"
          element={
            <ShowAllReports
              onDateSelected={onDateSelected}
              onWorkCenterIdSelected={onWorkCenterIdSelected}
              openReport={openReport}
            />
          }
        ></Route>
        <Route
          path="/PivotTableReport"
          element={
            <PivotTableReport
              workCenterIds={workCenterIds}
              startDate={dates.endDate}
              endDate={dates.startDate}
              rows={rows}
              columns={columns}
              values={values}
              savedUrl={url}
              isSaved={isSavedReport}
              savedReportName={savedReportName}
              onDateSelected={onDateSelected}
            />
          }
        ></Route>
        <Route path="/SuperAdmin" element={<SuperAdminDashboard />}></Route>
        <Route path="/AdminUsersPage" element={<AdminUsersPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
