import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const sidebarToggle = useRef();
  const navigate = useNavigate();
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark navbar-responsive">
      {/* <!-- Navbar Brand--> */}
      <a className="navbar-brand ps-3 d-none d-md-block d-lg-block">
        SoftNET Teknoloji
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
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* <!-- Navbar--> */}
      <ul
        class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4"
        style={{ position: "absolute", right: "0.4%" }}
      >
        <li className="nav-item m-auto mx-4">
          {/* <i color="white" className="fas fa-user fa-fw fa-sm"></i> */}
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-user"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <li
              onClick={() => {
                localStorage.getItem("type") === "ADMIN"
                  ? navigate("/Admin")
                  : localStorage.getItem("type") === "SUPER"
                  ? navigate("/SuperAdmin")
                  : navigate("/Dashboard");
              }}
              className="dropdown-item text-center btn"
              style={{
                borderRadius: 0,
                // cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 14 }}>
                {localStorage.getItem("username")}
              </span>
            </li>
            {/* <li>
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
            </li> */}

            <li
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  fontSize: 14,
                }}
                className="dropdown-item text-center"
              >
                Çıkış Yap
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
