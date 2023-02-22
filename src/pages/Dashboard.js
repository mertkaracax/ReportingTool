import { useEffect, useRef, useState } from "react";
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
import DataTable, { createTheme } from "react-data-table-component";
import ModalForm from "../UI/ModalForm";

const Dashboard = (props) => {
  const [cartIsShown, setcartIsShown] = useState(true);
  function showCartHandler() {
    setcartIsShown(true);
  }
  function hideCartHandler() {
    setcartIsShown(false);
  }
  createTheme(
    "solarized",
    {
      text: {
        primary: "black",
        secondary: "gray",
      },
      background: {
        default: "white",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );
  const columns3 = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Surname",
      selector: (row) => row.surname,
    },
  ];

  const data3 = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 2,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 3,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 4,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 5,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 6,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 7,
      title: "Beetlejuice",
      year: "1988",
      name: "mert",
      surname: "karaca",
    },

    {
      id: 8,
      title: "Ghostbusters",
      year: "1984",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 9,
      title: "Ghostbusters",
      year: "1984",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 10,
      title: "Ghostbusters",
      year: "1984",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 11,
      title: "Ghostbusters",
      year: "1984",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 12,
      title: "Ghostbusters",
      year: "1984",
      name: "mert",
      surname: "karaca",
    },
    {
      id: 13,
      title: "Ghostbusters",
      year: "1984",
      name: "mert",
      surname: "karaca",
    },
  ];

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
        text: "Chart.js Line Chart",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => Math.random(0, 1) * 100),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random(0, 1) * 100),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random(0, 1) * 100),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const navigate = useNavigate();

  const sidebarToggle = useRef();

  const onSaveHandler = (formData) => {
    props.onDateSelected(formData.startDate, formData.endDate);
    props.onWorkCenterIdSelected(formData.centerIds);
  };
  return (
    <div>
      {cartIsShown && (
        <ModalForm onSaveHandler={onSaveHandler} onHideCart={hideCartHandler} />
      )}
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand ps-3" href="/Dashboard">
          Start Bootstrap
        </a>
        {/* <!-- Sidebar Toggle--> */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          ref={sidebarToggle}
          onClick={(event) => {
            event.preventDefault();
            document.body.classList.toggle("sb-sidenav-toggled");
            localStorage.setItem(
              "sb|sidebar-toggle",
              document.body.classList.contains("sb-sidenav-toggled")
            );
          }}
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Activity Log
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <a className="nav-link" href="/Dashboard">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </a>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Layouts
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <a className="nav-link" href="layout-static.html">
                      Static Navigation
                    </a>
                    <a className="nav-link" href="layout-sidenav-light.html">
                      Light Sidenav
                    </a>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  Pages
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseAuth"
                      aria-expanded="false"
                      aria-controls="pagesCollapseAuth"
                    >
                      Authentication
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesCollapseAuth"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <a className="nav-link" onClick={() => navigate("/")}>
                          Login
                        </a>
                        <a className="nav-link" href="/Register">
                          Register
                        </a>
                        <a className="nav-link" href="/FPassword">
                          Forgot Password
                        </a>
                      </nav>
                    </div>
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseError"
                      aria-expanded="false"
                      aria-controls="pagesCollapseError"
                    >
                      Error
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <a className="nav-link" href="401.html">
                          401 Page
                        </a>
                        <a className="nav-link" href="404.html">
                          404 Page
                        </a>
                        <a className="nav-link" href="500.html">
                          500 Page
                        </a>
                      </nav>
                    </div>
                  </nav>
                </div>
                <div className="sb-sidenav-menu-heading">Addons</div>
                <a className="nav-link" href="#!" onClick={showCartHandler}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                  </div>
                  Rapor oluştur
                </a>
                <a className="nav-link" href="tables.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Tables
                </a>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Start Bootstrap
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          {" "}
          {/*bunun altına yapıştır */}
          <div className="container-fluid px-4">
            <h1 className="mt-4">Dashboard</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                  <div className="card-body">Primary Card</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                  <div className="card-body">Warning Card</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                  <div className="card-body">Success Card</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                  <div className="card-body">Danger Card</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
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
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1"></i>
                DataTable Example
              </div>
              <div className="card-body">
                {/* <DataTable
                  columns={columns3}
                  data={data3}
                  pagination
                  highlightOnHover
                  pointerOnHover
                /> */}
                <DataTable
                  title="Desserts - Cell Styling"
                  theme="solarized"
                  columns={columns3}
                  data={data3}
                  pagination
                  paginationDefaultPage={5}
                />
              </div>
            </div>
          </div>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2022
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
