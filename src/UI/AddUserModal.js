import React from "react";
import toastr from "toastr";
import urlConfig from "../data/urlConfig";
import { useNavigate } from "react-router-dom";

const AddUserModal = (props) => {
  const navigate = useNavigate();
  function registerHandler(e) {
    props.onHideCart();
    e.preventDefault();
    var { name, surname, username, email, password, passwordConfirm } =
      document.forms[0];
    console.log("-" + name.value);
    const data = {
      name: name.value,
      surname: surname.value,
      username: username.value,
      email: email.value,
      password: password.value,
      companyName: localStorage.getItem("company"),
    };
    console.log(data);
    fetch(`${urlConfig.getDefaultUrl()}/user/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(() => {
        props.setRefresh();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    toastr.success(`${username.value} başarıyla eklendi`, "KAYIT BAŞARILI");
    props.onSaveHandler();
    navigate("/Admin");
  }
  return (
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-dark">
            <h5 class="modal-title" id="staticBackdropLabel">
              Kullanıcı Ekle
            </h5>
            <button
              type="button"
              class="btn-close btn-close-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="form-floating mb-3 mb-md-0">
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      name="name"
                    />
                    <label for="inputFirstName">İsim</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      class="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      name="surname"
                    />
                    <label for="inputLastName">Soyisim</label>
                  </div>
                </div>
              </div>
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  id="inputEmail"
                  type="email"
                  placeholder="name@example.com"
                  name="username"
                />
                <label for="inputEmail">Kullanıcı adı</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  id="inputEmail"
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                />
                <label for="inputEmail">Mail Adresi</label>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="form-floating mb-3 mb-md-0">
                    <input
                      class="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Create a password"
                      name="password"
                    />
                    <label for="inputPassword">Şifre</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating mb-3 mb-md-0">
                    <input
                      class="form-control"
                      id="inputPasswordConfirm"
                      type="password"
                      placeholder="Confirm password"
                      name="passwordConfirm"
                    />
                    <label for="inputPasswordConfirm">Şifre (Tekrar)</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={props.onHideCart}
            >
              Kapat
            </button>
            <button
              type="button"
              class="btn btn-dark"
              data-bs-dismiss="modal"
              onClick={registerHandler}
            >
              Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
