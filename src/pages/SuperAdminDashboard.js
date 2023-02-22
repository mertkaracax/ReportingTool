import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import { useState, useRef, useEffect } from "react";
import toastr from "toastr";
import AddCompanyForm from "../UI/AddCompanyForm";
import urlConfig from "../data/urlConfig";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const SuperAdminDashboard = (props) => {
  const sidebarToggle = useRef();
  const [companyCartIsShown, setCompanycartIsShown] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  console.log(companies);
  useEffect(() => {
    fetch(`${urlConfig.getDefaultUrl()}/get/company_list_with_admins`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => {
        setError(true);
        toastr.error(err, "NETWORK HATASI");
      });
  }, [refresh]);

  function showCompanyCartHandler() {
    setCompanycartIsShown(true);
  }
  function hideCompanyCartHandler() {
    setCompanycartIsShown(false);
  }
  const onSaveHandler = () => {
    setCompanycartIsShown(false);
    setRefresh((prev) => !prev);
  };
  const showAdminDetails = () => {
    console.log("show admin details");
  };

  let content;
  const tableData = (
    <div className="container-fluid px-4">
      <h3 className="mt-4 mb-4">Reporting Tool Admin</h3>
      {/* <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Son kaydedilen raporlar</li>
      </ol> */}
      <div className="row">
        <div className="col-xl-6 col-md-6">
          <div
            className="card text-dark mb-4 bg-light"
            style={{ background: "#656565" }}
          >
            <div
              className="card-body"
              style={{ boxShadow: "0 0 2px 2px gray" }}
            >
              <div className="w-100">Sisteme kayıtlı kullanıcı sayısı</div>
              <span style={{ fontSize: 25 }}>25</span>
            </div>
            {/* <div className="card-footer d-flex align-items-center justify-content-between bg-dark"></div> */}
          </div>
        </div>
        <div className="col-xl-6 col-md-6">
          <div
            className="card text-dark mb-4 bg-light"
            style={{ background: "#656565" }}
          >
            <div
              className="card-body"
              style={{ boxShadow: "0 0 2px 2px gray" }}
            >
              <div className="w-100">Sisteme kayıtlı şirket sayısı</div>
              <span style={{ fontSize: 25 }}>2</span>
            </div>
            {/* <div className="card-footer d-flex align-items-center justify-content-between bg-dark"></div> */}
          </div>
        </div>
      </div>
      {/* <h5
        className=" d-flex align-items-center justify-content-center mt-3 pb-2 pt-2 mb-1 text-dark"
        style={{
          alignSelf: "center",
          width: "80%",
          // borderBottom: "2px solid black",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Sisteme Kayıtlı Şirketler
      </h5> */}
      <table
        id="example"
        className="table table-striped table-bordered table-hover m-auto w-100 mb-4"
      >
        <thead
          style={{
            borderBottom: "2px solid gray",
            backgroundColor: "#474747",
          }}
          className=" text-white"
        >
          <tr>
            <th>Şirket</th>
            <th>Başlangıç</th>
            <th>Admin</th>
            {/* <th className="h-50">Admin Detay</th> */}
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            return (
              <tr>
                <td>{company.companyName}</td>
                <td>31.01.2023</td>
                <td>{company.adminName}</td>
                {/* <td>
                  <button
                    className="w-100 btn-primary"
                    onClick={showAdminDetails}
                  >
                    Admin Detay
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  if (error) {
    content = <span>Bir Network Hatası Sebebiyle Bilgiler Gösterilemiyor</span>;
  } else if (!error && companies.length === 0) {
    content = <span>Sisteme Kayıtlı Şirket Bilgisi Bulunamadı</span>;
  } else {
    content = tableData;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sistemi kullanan şirket sayısı",
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
        label: "Şirket sayısı",
        data: labels.map(() => Math.random(0, 1) * 100),
        borderColor: "black",
        backgroundColor: "#47474740 ",
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
        text: "Sistemdeki toplam kullanıcı sayısı",
      },
    },
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Kullanıcı sayısı",
        data: labels.map(() => Math.random(0, 1) * 100),
        backgroundColor: "#474747",
      },
    ],
  };
  return (
    <div>
      {companyCartIsShown && (
        <AddCompanyForm
          onSaveHandler={onSaveHandler}
          onHideCart={hideCompanyCartHandler}
        />
      )}

      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav
            // showUserCartHandler={showUserCartHandler}
            // showReportCartHandler={showReportCartHandler}
            showCompanyCartHandler={showCompanyCartHandler}
            isAdmin={false}
            isSuperAdmin={true}
          />
        </div>
        <div id="layoutSidenav_content">
          {" "}
          <div className="container-fluid px-4">
            {content}{" "}
            <div className="row px-4  ">
              <div className="col-xl-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-chart-area me-1"></i>
                    Area Chart Example
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
                  <div className="card-header">
                    <i className="fas fa-chart-bar me-1"></i>
                    Bar Chart Example
                  </div>
                  <div className="card-body">
                    {/* <canvas id="myBarChart" width="100%" height="40"></canvas> */}
                    <Bar options={options2} data={data2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**burası */}
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

export default SuperAdminDashboard;
