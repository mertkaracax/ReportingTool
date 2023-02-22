import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Card from "./Card";
import urlConfig from "../data/urlConfig";
import toastr from "toastr";

const SaveReportModal = (props) => {
  const [users, setUsers] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);
  const navigate = useNavigate();
  const [reportType, setReportType] = useState(null);
  const [dateRange, setDateRange] = useState("");
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    fetch(
      `${urlConfig.getDefaultUrl()}/users/${localStorage.getItem("company")}`
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .then((data) => console.log(users));
  }, []);

  const renderedOptions = users.map((item) => {
    return { value: item.username, label: item.name };
  });

  const selectChangeHandler = (e) => {
    setSharedUsers(e.map((item) => item.value));
  };
  console.log("shared users: ", sharedUsers);
  return (
    <div
      class="modal fade"
      id="saveReportModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="saveReportModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-dark">
            <h5 class="modal-title" id="staticBackdropLabel">
              Raporu Kaydet
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-floating mb-3">
                <span
                  style={{
                    color: "#2f2f2f",
                    marginBottom: 5,
                    fontSize: 15,
                    width: "30%",
                    fontWeight: "600",
                  }}
                  className="mx-1"
                >
                  Rapor İsmi:
                </span>
                <Card>
                  <input
                    class="form-control mt-1 mx-1"
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                    name="name"
                  />
                </Card>
              </div>
              <div class="form-floating mb-3 mx-1">
                <span
                  style={{
                    color: "#2f2f2f",
                    fontSize: 15,
                    width: "30%",
                    fontWeight: "600",
                  }}
                >
                  Paylaşılacak Kullanıcılar:
                </span>
                {/** burada toastr ile kullanıcı herkesi seçtiği konusunda uyarıyoruz */}

                <Card>
                  <button
                    type="button"
                    class="btn btn-outline-secondary w-100 mt-1 mb-2"
                    style={{
                      background: allSelected && "#6c757d",
                      color: allSelected && "white",
                    }}
                    onClick={() => {
                      if (!allSelected) {
                        setSharedUsers(users);
                        {
                          toastr.warning(
                            "Bu raporu tüm şirket kullanıcılarına göndermek üzeresiniz",
                            "UYARI"
                          );
                        }
                      } else {
                        setSharedUsers([]);
                      }

                      setAllSelected((prev) => !prev);
                    }}
                  >
                    {allSelected
                      ? `Rapor tüm kullanıcılara gönderilecek`
                      : "Bu raporu herkesle paylaş"}
                  </button>
                </Card>
                {!allSelected ? (
                  <Card>
                    <Select
                      isSearchable={true}
                      placeholder="Seçiniz"
                      options={renderedOptions}
                      isMulti={true}
                      multi={true}
                      onChange={selectChangeHandler}
                    />
                  </Card>
                ) : null}
              </div>
              <div class="form-floating mb-3 mx-1">
                <span
                  style={{
                    color: "#2f2f2f",
                    marginBottom: 17,
                    fontSize: 15,
                    width: "30%",
                    fontWeight: "600",
                  }}
                >
                  Rapor Zaman Aralığı:
                </span>
                <div class="row mb-3 mt-1">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      style={{
                        background: dateRange === "statik" && "#6c757d",
                        color: dateRange === "statik" && "white",
                      }}
                      type="button"
                      class="btn btn-outline-secondary mx-1"
                      onClick={() => setDateRange("statik")}
                    >
                      Statik
                    </button>
                    <button
                      style={{
                        background: dateRange === "dinamik" && "#6c757d",
                        color: dateRange === "dinamik" && "white",
                      }}
                      type="button"
                      class="btn btn btn-outline-secondary mx-1"
                      onClick={() => setDateRange("dinamik")}
                    >
                      Dinamik
                    </button>
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
            >
              Kapat
            </button>
            <button
              type="button"
              class="btn btn-dark"
              data-bs-dismiss={dateRange === null ? null : "modal"}
              onClick={(e) => {
                e.preventDefault();
                var { name } = document.forms[1];
                if (dateRange === null) {
                  toastr.error(
                    "Rapor zaman aralığı tipi seçmediğiniz için kayıt başarısız oldu",
                    "HATA"
                  );
                } else if (
                  name.value === "" ||
                  name.value === undefined ||
                  name.value === null
                ) {
                  toastr.error(
                    "Rapor ismi girmediğiniz için kayıt başarısız oldu",
                    "HATA"
                  );
                } else {
                  props.onSaveHandler(name.value, sharedUsers);
                  toastr.success(
                    `${name.value} isimli raporunuz başarıyla paylaşıldı.`,
                    "İşlem Başarılı"
                  );
                }
              }}
            >
              Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveReportModal;
