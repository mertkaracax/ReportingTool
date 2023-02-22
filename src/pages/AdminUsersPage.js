import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import Navbar from "../components/Navbar";
import toastr from "toastr";
import urlConfig from "../data/urlConfig";
import AddUserModal from "../UI/AddUserModal";
import ReportModal from "../UI/ReportModal";
import classes from "./AdminDashboard.module.css";

const AdminUsersPage = (props) => {
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

          <div className="card mb-4 mx-5 mt-4 pb-2">
            <div className="card-header d-flex">
              <span
                style={{ fontWeight: "500", fontSize: 15, color: "#636363" }}
              >
                {COMPANY_NAME}&nbsp;Kullanıcı Listesi
              </span>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex flex-row w-100 justify-content-between">
                <input
                  type="text"
                  style={{ marginLeft: "5%", marginRight: 10 }}
                  className={`${classes.searchArea} form-control w-25`}
                  placeholder="Kullanıcı Ara"
                  value={filterText}
                  onChange={filterChangeHandler}
                ></input>
                <a
                  className={`${classes.icon} btn btn-dark`}
                  style={{
                    marginRight: "5%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Kullanıcı Ekle
                </a>
              </div>
              <div
                className="table-responsive"
                style={{
                  alignSelf: "center",
                  width: "90%",
                }}
              >
                <table
                  id="example"
                  className={`${classes.table} table table-striped table-bordered table-hover myTable text-center`}
                  style={{
                    alignSelf: "center",
                    marginTop: "1%",
                    width: "100%",
                  }}
                >
                  <thead
                    style={{
                      borderBottom: "2px solid gray",
                      // backgroundColor: "#5E7CB8",
                      cursor: "default",
                    }}
                    className="text-light bg-secondary"
                  >
                    <tr>
                      <th>Kullanıcı adı</th>
                      <th>Ad</th>
                      <th>Soyad</th>
                      <th>E-Mail</th>
                      <th>Tip</th>
                      <th
                        // onClick={showUserCartHandler}
                        className="h-50 text-center"
                      >
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((item) => {
                        console.log(
                          "Lower case item: ",
                          item.name.turkishToLower()
                        );
                        console.log(filterText.turkishToLower());
                        return (
                          item.name
                            .turkishToLower()
                            .startsWith(filterText.turkishToLower()) ||
                          item.username
                            .turkishToLower()
                            .startsWith(filterText.turkishToLower())
                        );
                      })
                      .map((user) => {
                        return (
                          <tr style={{ cursor: "pointer" }}>
                            <td style={{ cursor: "pointer" }}>
                              {user.username}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>Yetkisiz</td>

                            <td style={{ textAlign: "center" }}>
                              <a
                                onClick={() => deleteUserHandler(user.username)}
                                className="btn btn-dark btn-sm"
                              >
                                <i className="fa-solid fa-trash-can text-white"></i>
                              </a>

                              {/* <button
                        className="w-100 btn-danger"
                        onClick={() => deleteUserHandler(user.username)}
                      >
                        Sil
                      </button> */}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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
export default AdminUsersPage;
