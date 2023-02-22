import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toastr from "toastr";
import urlConfig from "../data/urlConfig";
import SoftNet from "../assets/SoftNet.PNG";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isLastAttemptSuccess, setIsLastAttemptSuccess] = useState(true);
  console.log(isUserTyping, isLastAttemptSuccess);
  function loginHandler(event) {
    event.preventDefault();
    var { username, password } = document.forms[0];

    console.log(
      "username: " + username.value + "\npassword: " + password.value
    );
    const data = { username: username.value, password: password.value };
    let type = null;
    fetch(`${urlConfig.getDefaultUrl()}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.auth) {
          localStorage.setItem("type", data.type);
          if (data.type === "ADMIN") {
            localStorage.setItem("username", username.value);
            localStorage.setItem("company", data.companyName);
            navigate("/Admin");
            // toastr.success(localStorage.getItem("username"), "HOŞGELDİNİZ");
          } else if (data.type === "SUPERADMIN") {
            localStorage.setItem("username", username.value);
            navigate("/SuperAdmin");
            // toastr.success(localStorage.getItem("username"), "HOŞGELDİNİZ");
          } else if (data.type === "NORMAL") {
            localStorage.setItem("username", username.value);
            localStorage.setItem("company", data.companyName);

            navigate("/Dashboard");
            // toastr.success(localStorage.getItem("username"), "HOŞGELDİNİZ");
          } else {
            toastr.error("BİR ŞEYLER TERS GİTTİ");
          }
        } else {
          setIsLastAttemptSuccess(false);
          setIsUserTyping(false);
          toastr.error("Kullanıcı adı veya şifre yanlış", "HATA");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // conditional navigate yapılacak:
    // if (username.value == "normal") {
    //   navigate("/Dashboard");
    //   toastr.success("Normal User", "GİRİŞ BAŞARILI");
    // } else if (username.value == "admin") {
    //   navigate("/Admin");
    //   toastr.success("Admin User", "GİRİŞ BAŞARILI");
    // } else if (username.value == "super") {
    //   navigate("/SuperAdmin");
    //   toastr.success("Super Admin User", "GİRİŞ BAŞARILI");
    // }
  }

  return (
    <div class="bg-dark">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div
                    class={`card shadow-lg border-0 rounded-lg mt-5 ${classes.card}`}
                  >
                    <div class="card-header d-flex justify-content-center flex-column">
                      <img
                        style={{
                          margin: "auto",
                          marginTop: "4%",
                        }}
                        className={classes.img}
                        src={SoftNet}
                        width={100}
                        height={50}
                      />
                      <h3 class="text-center font-weight-light my-4">
                        SoftNET Reporting Tool
                      </h3>
                    </div>
                    <div class="card-body">
                      {!isLastAttemptSuccess && !isUserTyping && (
                        <span>Bilgiler Geçersiz</span>
                      )}
                      <form onSubmit={loginHandler}>
                        <div class="form-floating mb-3">
                          <input
                            required
                            class="form-control"
                            id="inputEmail"
                            type="text"
                            placeholder=""
                            name="username"
                            onChange={() => setIsUserTyping(true)}
                          />
                          <label for="inputEmail">Kullanıcı adı</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            required
                            class="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={() => setIsUserTyping(true)}
                          />
                          <label for="inputPassword">Şifre</label>
                        </div>
                        {/* <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            class="form-check-label"
                            for="inputRememberPassword"
                          >
                            Remember Password
                          </label>
                        </div> */}
                        <div class="d-flex align-items-center justify-content-center mt-4 mb-0">
                          <input
                            type="submit"
                            class="btn btn-dark"
                            value="Giriş Yap"
                          />
                          {/**href="/Dashboard" */}
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center py-3">
                      {/* <div class="small">
                        <a href="/Register">Need an account? Sign up!</a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <div id="layoutAuthentication_footer" className="customFooter">
          <footer
            class={`py-4 bg-light mt-auto text-center ${classes.customFooter}`}
          >
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-center small">
                <div class="text-muted">
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
export default Login;
