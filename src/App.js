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

function App() {
  const rows = [{ name: "ProductionDate" }];
  const columns = [{ name: "WorkCenterId" }, { name: "MaterialName" }];
  const values = [
    { name: "TargetDuration" },
    { name: "ProducedAmount" },
    { name: "RejectAmount" },
  ];
  const [workCenterIds, setWorkCenterIds] = useState([]);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  function onDateSelected(startDate, endDate) {
    setDates((prevState) => {
      return { startDate, endDate };
    });
  }
  function onWorkCenterIdSelected(ids) {
    setWorkCenterIds(ids);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/Dashboard"
          element={
            <Dashboard
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
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
