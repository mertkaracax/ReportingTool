import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Card from "./Card";
import urlConfig from "../data/urlConfig";
import toastr from "toastr";

const EditPermissionModal = (props) => {
  const [users, setUsers] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("");
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    fetch(
      `${urlConfig.getDefaultUrl()}/users/${localStorage.getItem("company")}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers([
          { username: "Tümü", name: "Tüm kullanıcılar", value: "Tümü" },
          ...data,
        ]);
        console.log([
          { username: "Tümü", name: "Tüm kullanıcılar", value: "Tümü" },
          ...data,
        ]);
      });
  }, []);

  const renderedOptions = sharedUsers.includes("Tümü")
    ? []
    : users.map((item) => {
        return { value: item.username, label: item.name };
      });

  const selectChangeHandler = (e) => {
    console.log("e => ", e);
    if (e.length > 0) {
      for (let i = 0; i < e.length; i++) {
        if (e[i].value === "Tümü") {
          setSharedUsers(users.map((item) => item.username));
          toastr.info(
            "Bu raporu tüm kullanıcılarla paylaşmak üzeresiniz",
            "Bildirim"
          );
          break;
        } else {
          setSharedUsers(e.map((item) => item.value));
        }
      }
    } else {
      setSharedUsers([]);
    }
  };
  console.log("shared users: ", sharedUsers);
  return (
    <div
      class="modal fade"
      id="editPermissionModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="editPermissionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-dark">
            <h5 class="modal-title" id="staticBackdropLabel">
              Rapor Düzenle
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
              onClick={() => {
                let x = sharedUsers.filter((item) => {
                  return item != "Tümü";
                });
                setSharedUsers(x);
                // props.onSaveHandler(name.value, sharedUsers);
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

export default EditPermissionModal;
