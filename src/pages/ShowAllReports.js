import { useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import urlConfig from "../data/urlConfig";
import AddUserModal from "../UI/AddUserModal";
import ReportModal from "../UI/ReportModal";
import EditPermissionModal from "../UI/EditPermissionModal";
import classes from "./ShowAllReports.module.css";

const ShowAllReports = (props) => {
  const COMPANY_NAME = localStorage.getItem("company").toUpperCase();
  const [userCartIsShown, setUsercartIsShown] = useState(false);
  const [reportCartIsShown, setReportCartIsShown] = useState(false);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const navigate = useNavigate();

  const sidebarToggle = useRef();

  const onSaveHandler = (formData) => {
    // setUsercartIsShown(false);
    // props.onDateSelected(formData.endDate, formData.startDate);
    // props.onWorkCenterIdSelected(formData.centerIds);
  };

  return (
    <div>
      <AddUserModal
        onSaveHandler={onSaveHandler}
        onHideCart={hideUserCartHandler}
      />
      <ReportModal
        showReportCartHandler={showReportCartHandler}
        onHideCart={hideReportCartHandler}
        onSaveHandler={onSaveHandler}
      />
      <EditPermissionModal />
      {/* {userCartIsShown && (
        <AddUserForm
          onSaveHandler={onSaveHandler}
          onHideCart={hideUserCartHandler}
        />
      )}
      {reportCartIsShown && (
        <ModalForm
          showReportCartHandler={showReportCartHandler}
          onHideCart={hideReportCartHandler}
          onSaveHandler={onSaveHandler}
        />
      )} */}
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav
            createReport={true}
            // showUserCartHandler={showUserCartHandler}
            // showReportCartHandler={showReportCartHandler}
            isAdmin={localStorage.getItem("type") === "ADMIN" ? true : false}
          />
        </div>
        <div id="layoutSidenav_content">
          {" "}
          {/*bunun altına yapıştır */}
          {/* <h1 className="mt-4">{localStorage.getItem("company")}</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Son kaydedilen raporlar</li>
          </ol> */}
          <div className="card mb-4 mx-5 mt-4 pb-2">
            <div className="card-header">
              <span
                style={{
                  fontWeight: "500",
                  fontSize: 15,
                  color: "#636363",
                }}
              >
                {COMPANY_NAME}&nbsp;Kayıtlı Rapor Listesi
              </span>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <table
                id="example"
                className={`${classes.table} table table-striped table-hover table-bordered table-striped mx-auto text-center`}
                style={{ width: "90%", marginTop: "1%" }}
              >
                <thead
                  className="bg-secondary"
                  style={{
                    // background: "#5E7CB8",
                    color: "white",
                    cursor: "default",
                  }}
                >
                  <tr>
                    <th>Tarih</th>
                    <th>Rapor İsmi</th>
                    <th>Kaydeden</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((reportData) => {
                    return (
                      <tr style={{ transition: 2000 }}>
                        <td>02.02.2023</td>
                        <td
                          title="Raporu Görüntüle"
                          onClick={() => {
                            props.openReport(reportData);
                            navigate("/PivotTableReport");
                          }}
                        >
                          {reportData}
                        </td>
                        <td>Mert Karaca</td>
                        <td>
                          <div className="btn-group" role="group">
                            <a
                              title="Raporu İncele"
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                props.openReport(reportData);
                                navigate("/PivotTableReport");
                              }}
                            >
                              <i class="fa-solid fa-eye text-white"></i>
                            </a>
                            {localStorage.getItem("type") === "ADMIN" ? (
                              <a
                                title="İzinleri Düzenle"
                                className="btn btn-dark btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#editPermissionModal"
                                onClick={() =>
                                  console.log(
                                    "Permission edit button is clicked"
                                  )
                                }
                              >
                                <i className="fas fa-edit text-white" />
                              </a>
                            ) : null}
                          </div>
                        </td>
                        {/* <td>
                        <button
                          className="w-100 btn-primary"
                          onClick={() => {
                            props.openReport(reportData);
                            navigate("/PivotTableReport");
                          }}
                        >
                          Aç
                        </button>
                      </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-center small">
                <div className="text-muted">
                  Telif Hakkı &copy; SoftNet Teknoloji
                </div>
                {/* <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div> */}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default ShowAllReports;
