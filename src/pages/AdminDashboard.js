import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import Navbar from "../components/Navbar";
import toastr from "toastr";
import urlConfig from "../data/urlConfig";
import AddUserModal from "../UI/AddUserModal";
import ReportModal from "../UI/ReportModal";
import classes from "./AdminDashboard.module.css";

const AdminDashboard = (props) => {
  String.prototype.turkishToLower = function () {
    var string = this;
    var letters = { İ: "i", I: "ı", Ş: "ş", Ğ: "ğ", Ü: "ü", Ö: "ö", Ç: "ç" };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
      return letters[letter];
    });
    return string.toLowerCase();
  };
  //Şirket ismi büyük harfe çevrilerek bir constant variable'a atandı.
  const COMPANY_NAME = localStorage.getItem("company").toUpperCase();

  const [userCartIsShown, setUsercartIsShown] = useState(false);
  const [reportCartIsShown, setReportCartIsShown] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");

  const filterChangeHandler = (e) => {
    setFilterText(e.target.value);
  };

  console.log(refresh);
  useEffect(() => {
    fetch(
      `${urlConfig.getDefaultUrl()}/users/${localStorage.getItem("company")}`
    )
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [refresh]);

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
  function hideReportCartHandler() {
    setReportCartIsShown(false);
  }

  function childSetRefresh() {
    setRefresh((prev) => !prev);
  }

  const navigate = useNavigate();

  const deleteUserHandler = (username) => {
    fetch(`${urlConfig.getDefaultUrl()}/users/delete/` + username).then(
      (response) => {
        console.log("girdi");
        toastr.error(
          `${username} kullanıcısı başarıyla silindi`,
          "SİLME BAŞARILI"
        );
        setRefresh((prev) => {
          return !prev;
        });
      }
    );
  };

  const onSaveHandler = (formData) => {
    setUsercartIsShown(false);
    props.onDateSelected(formData.endDate, formData.startDate);
    props.onWorkCenterIdSelected(formData.centerIds);
  };
  return (
    <div>
      {/* <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button> */}
      <AddUserModal
        onSaveHandler={onSaveHandler}
        onHideCart={hideUserCartHandler}
        setRefresh={childSetRefresh}
      />
      <ReportModal
        showReportCartHandler={showReportCartHandler}
        onHideCart={hideReportCartHandler}
        onSaveHandler={onSaveHandler}
      />

      {/* {userCartIsShown && (
        <AddUserForm
          onSaveHandler={onSaveHandler}
          onHideCart={hideUserCartHandler}
          setRefresh={childSetRefresh}
        />
      )} */}
      {/* {reportCartIsShown && (
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
            showUserCartHandler={showUserCartHandler}
            showReportCartHandler={showReportCartHandler}
            isAdmin={true}
          />
        </div>
        <div id="layoutSidenav_content">
          {/*bunun altına yapıştır */}
          {/* <h5
            className=" d-flex align-items-center justify-content-center mt-4 pb-2 pt-2 text-dark"
            style={{
              alignSelf: "center",
              width: "80%",
              borderBottom: "2px solid black",
            }}
          >
            <span>{COMPANY_NAME} &nbsp;</span> Kayıtlı Kullanıcılar
          </h5> */}

          <div className="container-fluid px-4">
            <div className="row mb-3 mt-4 d-flex justify-content-center">
              <div className={`${classes.table} col-xl-3 col-md-6`}>
                <div
                  className="card text-dark mb-4"
                  style={{
                    background: "#EDEEEE",
                  }}
                >
                  <div className="card-body">
                    <div class="row">
                      <div class="col-3">
                        <i class="fa-solid fa-user fa-3x"></i>
                      </div>
                      <div class="col-9 text-end">
                        <span style={{ fontSize: "1.5em" }}>21</span>
                        <br />
                        <span class="fw-bold">Kayıtlı Müşteri</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer d-flex align-items-center justify-content-between bg-secondary"
                    style={{ backgroundColor: "#5E7CB8", cursor: "pointer" }}
                  >
                    <a
                      className="small text-white stretched-link text-decoration-none"
                      onClick={() => {
                        navigate("/AdminUsersPage");
                      }}
                    >
                      <span style={{ fontSize: 14 }}>Kullanıcı Listesi</span>
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${classes.table} col-xl-3 col-md-6`}>
                <div
                  className="card text-dark mb-4"
                  style={{
                    background: "#EDEEEE",
                  }}
                >
                  <div className="card-body">
                    <div class="row">
                      <div class="col-3">
                        <i class="fa-solid fa-file-invoice fa-3x"></i>
                      </div>
                      <div class="col-9 text-end">
                        <span style={{ fontSize: "1.5em" }}>35</span>
                        <br />
                        <span class="fw-bold">Kayıtlı Rapor</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer d-flex align-items-center justify-content-between bg-secondary"
                    style={{ backgroundColor: "#5E7CB8", cursor: "pointer" }}
                  >
                    <a
                      className="small text-white stretched-link text-decoration-none"
                      onClick={() => {
                        navigate("/ShowAllReports");
                      }}
                    >
                      <span style={{ fontSize: 14 }}>Rapor Listesi</span>
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="py-4 bg-light mt-auto text-center">
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
export default AdminDashboard;
