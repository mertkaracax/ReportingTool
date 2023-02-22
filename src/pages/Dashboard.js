import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import urlConfig from "../data/urlConfig";

const Dashboard = (props) => {
  //şirket ismi büyük harf:
  const COMPANY_NAME = localStorage.getItem("company").toUpperCase();

  const [cartIsShown, setcartIsShown] = useState(false);
  const [reports, setReports] = useState([]);
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
  function showCartHandler() {
    setcartIsShown(true);
  }
  function hideCartHandler() {
    setcartIsShown(false);
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Örnek bir grafik",
      },
    },
  };
  const labels = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => Math.random(0, 1) * 100),
        borderColor: "#C2C2C2",
        backgroundColor: "#E7E9ED",
      },
    ],
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Örnek Bar Grafiği",
      },
    },
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Veri Seti 1",
        data: labels.map(() => Math.random(0, 1) * 100),
        backgroundColor: "#E7E9ED",
      },
      {
        label: "Veri Seti 2",
        data: labels.map(() => Math.random(0, 1) * 100),
        backgroundColor: "#555657",
      },
    ],
  };
  const navigate = useNavigate();

  const onSaveHandler = (formData) => {
    props.onDateSelected(formData.startDate, formData.endDate);
    props.onWorkCenterIdSelected(formData.centerIds);
  };

  return (
    <div>
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav
            // showUserCartHandler={showUserCartHandler}
            // showReportCartHandler={showReportCartHandler}
            isAdmin={false}
          />
        </div>
        <div id="layoutSidenav_content">
          {" "}
          {/*bunun altına yapıştır */}
          <div className="container-fluid px-4">
            <h1 className="mt-3 mb-3" style={{ color: "#68665F" }}>
              {COMPANY_NAME}
            </h1>
            {/* <ol className="breadcrumb mb-4">
              <li
                className="breadcrumb-item active"
                style={{ color: "#8a877a" }}
              >
                Son kaydedilen raporlar
              </li>
            </ol> */}
            <div className="row mb-3">
              <div className="col-xl-3 col-md-6">
                <div
                  className="card text-dark mb-4"
                  style={{
                    background: "#EDEEEE",
                  }}
                >
                  <div className="card-body">
                    <span style={{ fontWeight: "600" }}>Rapor: </span>{" "}
                    {reports[0]}
                  </div>
                  <div
                    className="card-footer d-flex align-items-center justify-content-between bg-secondary"
                    style={{ backgroundColor: "#5E7CB8", cursor: "pointer" }}
                  >
                    <a
                      className="small text-white stretched-link text-decoration-none"
                      onClick={() => {
                        props.openReport(reports[0]);
                        navigate("/PivotTableReport");
                      }}
                    >
                      <span style={{ fontSize: 14 }}>Raporu aç</span>
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div
                  className="card text-dark mb-4"
                  style={{
                    background: "#EDEEEE",
                  }}
                >
                  <div className="card-body">
                    {" "}
                    <span style={{ fontWeight: "600" }}>Rapor: </span>{" "}
                    {reports[1]}
                  </div>
                  <div
                    className="card-footer d-flex align-items-center justify-content-between bg-secondary"
                    style={{ backgroundColor: "#5E7CB8", cursor: "pointer" }}
                  >
                    <a
                      className="small text-white stretched-link text-decoration-none"
                      onClick={() => {
                        props.openReport(reports[1]);
                        navigate("/PivotTableReport");
                      }}
                    >
                      <span style={{ fontSize: 14 }}>Raporu aç</span>
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div
                  className="card text-dark mb-4"
                  style={{
                    background: "#EDEEEE",
                  }}
                >
                  <div className="card-body">
                    {" "}
                    <span style={{ fontWeight: "600" }}>Rapor: </span>{" "}
                    {reports[2]}
                  </div>
                  <div
                    className="card-footer d-flex align-items-center justify-content-between bg-secondary"
                    style={{ backgroundColor: "#5E7CB8", cursor: "pointer" }}
                  >
                    <a
                      className="small text-white stretched-link text-decoration-none"
                      onClick={() => {
                        props.openReport(reports[2]);
                        navigate("/PivotTableReport");
                      }}
                    >
                      <span style={{ fontSize: 14 }}>Raporu aç</span>
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div
                  className="card text-dark mb-4"
                  style={{
                    background: "#EDEEEE",
                  }}
                >
                  <div className="card-body">
                    <span style={{ fontWeight: "600" }}>Rapor: </span>
                    {reports[3]}
                  </div>
                  <div
                    className="card-footer d-flex align-items-center justify-content-between  bg-secondary"
                    style={{ backgroundColor: "#5E7CB8", cursor: "pointer" }}
                  >
                    <a
                      className="small text-white stretched-link text-decoration-none"
                      onClick={() => {
                        props.openReport(reports[3]);
                        navigate("/PivotTableReport");
                      }}
                    >
                      <span style={{ fontSize: 14 }}>Raporu aç</span>
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6">
                <div className="card mb-4">
                  <div
                    className="card-header"
                    // style={{ background: "#DFE5F3" }}
                  >
                    <i className="fas fa-chart-area me-1"></i>
                    Birinci Grafik
                  </div>
                  <div className="card-body">
                    {/* <canvas
                      id="myAreaChart"
                      ref={myAreaChart}
                      width="100%"
                      height="40"
                    ></canvas> */}
                    <Line options={options} data={data} />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card mb-4">
                  <div
                    className="card-header"
                    // style={{ background: "#DFE5F3" }}
                  >
                    <i className="fas fa-chart-bar me-1"></i>
                    İkinci grafik
                  </div>
                  <div className="card-body">
                    {/* <canvas id="myBarChart" width="100%" height="40"></canvas> */}
                    <Bar options={options2} data={data2} />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1"></i>
                DataTable Example
              </div>
              <div className="card-body">
               
                <DataTable
                  title="Contact List"
                  columns={columns3}
                  data={filteredItems}
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                  selectableRows
                  persistTableHead
                />
              </div>
            </div> */}
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
export default Dashboard;
