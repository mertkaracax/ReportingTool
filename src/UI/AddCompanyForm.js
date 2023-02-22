import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import urlConfig from "../data/urlConfig";

const AddCompanyForm = (props) => {
  const navigate = useNavigate();
  function registerHandler(e) {
    e.preventDefault();
    var {
      companyName,
      name,
      surname,
      username,
      email,
      password,
      passwordConfirm,
    } = document.forms[0];
    console.log("Email: " + email.value);
    console.log("Company Name: " + companyName.value);
    console.log("Password: " + password.value);
    const data = {
      companyName: companyName.value,
      adminName: name.value,
      adminSurname: surname.value,
      adminUsername: username.value,
      adminMail: email.value,
      adminPassword: password.value,
    };
    console.log("kardeşim sen bu form kontrolü neden bolr yapaysin  ");
    console.log(data);
    fetch(`${urlConfig.getDefaultUrl()}/save_company/with_admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        console.log("Success:", data);
        toastr.success(
          "Şirket başarıyla veritabanına eklendi",
          "KAYIT BAŞARILI"
        );
      } else {
        console.error("Error:", response);
        toastr.error("NETWORK HATASI", response.status);
      }
    });

    props.onSaveHandler();
    navigate("/SuperAdminDashboard");
  }
  return (
    // <Modal onHideCart={props.onHideCart}>
    //   <div className={classes.total}></div>
    //   {/**Buraya */}
    //   <form>
    //     <div class="form-floating mb-3">
    //       <input
    //         class="form-control"
    //         id="companyName"
    //         type="text"
    //         placeholder="name@example.com"
    //         name="companyName"
    //       />
    //       <label htmlFor="companyName">Şirket Adı</label>
    //     </div>
    //     <div class="row mb-3">
    //       <div class="col-md-6">
    //         <div class="form-floating mb-3 mb-md-0">
    //           <input
    //             class="form-control"
    //             id="firstName"
    //             type="text"
    //             placeholder="Enter your first name"
    //             name="name"
    //           />
    //           <label htmlFor="firstName">Admin İsim</label>
    //         </div>
    //       </div>
    //       <div class="col-md-6">
    //         <div class="form-floating">
    //           <input
    //             class="form-control"
    //             id="lastName"
    //             type="text"
    //             placeholder="Enter your last name"
    //             name="surname"
    //           />
    //           <label htmlFor="lastName">Admin Soyisim</label>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="form-floating mb-3">
    //       <input
    //         class="form-control"
    //         id="username"
    //         type="text"
    //         placeholder="name@example.com"
    //         name="username"
    //       />
    //       <label htmlFor="username">Admin Kullanıcı adı</label>
    //     </div>
    //     <div class="form-floating mb-3">
    //       <input
    //         class="form-control"
    //         id="eMail"
    //         type="email"
    //         placeholder="name@example.com"
    //         name="email"
    //       />
    //       <label htmlFor="eMail">Admin Mail Adresi</label>
    //     </div>
    //     <div class="row mb-3">
    //       <div class="col-md-6">
    //         <div class="form-floating mb-3 mb-md-0">
    //           <input
    //             class="form-control"
    //             id="password"
    //             type="password"
    //             placeholder="Create a password"
    //             name="password"
    //           />
    //           <label htmlFor="password">Admin Şifre</label>
    //         </div>
    //       </div>
    //       <div class="col-md-6">
    //         <div class="form-floating mb-3 mb-md-0">
    //           <input
    //             class="form-control"
    //             id="inputPasswordConfirm"
    //             type="password"
    //             placeholder="Confirm password"
    //             name="passwordConfirm"
    //           />
    //           <label htmlFor="inputPasswordConfirm">Admin Şifre (Tekrar)</label>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={classes.actions}>
    //       <button className={classes["button--alt"]} onClick={props.onHideCart}>
    //         Kapat
    //       </button>
    //       <button onClick={registerHandler} className={classes.button}>
    //         Oluştur
    //       </button>
    //     </div>
    //   </form>
    // </Modal>
    <div></div>
  );
};

export default AddCompanyForm;
