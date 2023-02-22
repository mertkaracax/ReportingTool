import { useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import PivotTableDetailedCustom from "./PivotTableDetailedCustom";
import urlConfig from "../data/urlConfig";
import Card from "../UI/Card";
import AddUserModal from "../UI/AddUserModal";

const PivotTableReport = (props) => {
  const [userCartIsShown, setUsercartIsShown] = useState(false);
  const [reportCartIsShown, setReportCartIsShown] = useState(false);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const workCenterIds = props.workCenterIds;
  const startDate = props.startDate;
  const endDate = props.endDate;
  const rows = props.rows;
  const columns = props.columns;
  const values = props.values;
  const savedUrl = props.savedUrl;
  const isSaved = props.isSaved;
  const savedReportName = props.savedReportName;
  console.log("PORPPPPPS: ", props);

  function showUserCartHandler() {
    setUsercartIsShown(true);
  }
  function hideUserCartHandler() {
    setUsercartIsShown(false);
  }
  function showReportCartHandler() {
    setReportCartIsShown(true);
  }
  function hideReportCartHandler() {
    setReportCartIsShown(false);
  }

  useEffect(() => {
    fetch(`${urlConfig.getDefaultUrl()}/get/saved/name`)
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const navigate = useNavigate();

  const onSaveHandler = (formData) => {
    props.onDateSelected(formData.startDate, formData.endDate);
    props.onWorkCenterIdSelected(formData.centerIds);
  };

  return (
    <div>
      {/* {userCartIsShown && (
        <AddUserForm
          onSaveHandler={onSaveHandler}
          onHideCart={hideUserCartHandler}
        />
      )} */}
      <AddUserModal
        onSaveHandler={onSaveHandler}
        onHideCart={hideUserCartHandler}
      />

      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav
            showUserCartHandler={showUserCartHandler}
            showReportCartHandler={showReportCartHandler}
            isAdmin={localStorage.getItem("type") === "ADMIN" ? true : false}
          />
        </div>
        <div id="layoutSidenav_content">
          {" "}
          {/*bunun altına yapıştır */}
          <PivotTableDetailedCustom
            workCenterIds={workCenterIds}
            startDate={startDate}
            endDate={endDate}
            rows={rows}
            columns={columns}
            values={values}
            savedUrl={savedUrl}
            isSaved={isSaved}
            savedReportName={savedReportName}
          />
        </div>
      </div>
    </div>
  );
};
export default PivotTableReport;
