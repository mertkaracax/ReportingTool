import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SideNav = (props) => {
  const navigate = useNavigate();
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Sayfalar</div>
          <a
            className="nav-link"
            href={
              localStorage.getItem("type") === "NORMAL"
                ? "/Dashboard"
                : localStorage.getItem("type") === "ADMIN"
                ? "/Admin"
                : "/SuperAdmin"
            }
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-home"></i>
            </div>
            Ana Sayfa
          </a>

          {!props.isSuperAdmin ? (
            <div className="sb-sidenav-menu-heading">Rapor İşlemleri</div>
          ) : null}

          {props.isAdmin && props.createReport ? (
            <a
              className="nav-link"
              style={{ cursor: "pointer" }}
              // onClick={props.showReportCartHandler}
              data-bs-toggle="modal"
              data-bs-target="#reportModal"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-plus"></i>
              </div>
              Rapor Oluştur
            </a>
          ) : null}

          {!props.isSuperAdmin ? (
            <a className="nav-link" href="/ShowAllReports">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Kayıtlı Raporlar
            </a>
          ) : null}
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
            </nav>
          </div>
          {props.isAdmin ? (
            <>
              <div
                className="sb-sidenav-menu-heading"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Kullanıcı İşlemleri
              </div>
              <a
                style={{ cursor: "pointer" }}
                className="nav-link"
                onClick={() => {
                  navigate("/AdminUsersPage");
                }}

                // onClick={props.showUserCartHandler}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                Kullanıcı Listesi
              </a>
              <a
                className="nav-link"
                href="#!"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                // onClick={props.showUserCartHandler}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Kullanıcı Ekle
              </a>
            </>
          ) : null}
          {props.isSuperAdmin ? (
            <>
              <div className="sb-sidenav-menu-heading">Şirket İşlemleri</div>
              <a
                className="nav-link"
                href="#!"
                onClick={props.showCompanyCartHandler}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Yeni şirket ekle
              </a>
            </>
          ) : null}
        </div>
      </div>
      <div className="sb-sidenav-footer d-flex flex-column">
        <span>{localStorage.getItem("company").toUpperCase()}</span>
        <span>{localStorage.getItem("username")}</span>
      </div>
    </nav>
  );
};

export default SideNav;
