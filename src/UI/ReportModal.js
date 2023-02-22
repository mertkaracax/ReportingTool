import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Select from "react-select";

const ReportModal = (props) => {
  const [reportRange, setReportRange] = useState("Daily");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "01.11.2022",
    endDate: "30.11.2022",
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`https://softnetmasapi.azurewebsites.net/GetWorkCenterList`)
      .then((res) => res.json())
      .then((json) => {
        setOptions(json);
      });
  }, []);
  const renderedOptions = options.map((item) => {
    return { value: item.Id, label: item.Name };
  });

  const selectChangeHandler = (e) => {
    console.log(e);
    setSelectedOptions(e.map((item) => item.value));
  };

  const startDateChangeHandler = (e) => {
    setSelectedDateRange((prevState) => {
      return {
        startDate: `${e.target.value} 00:00:00`,
        endDate: prevState.endDate,
      };
    });
  };
  const endDateChangeHandler = (e) => {
    setSelectedDateRange((prevState) => {
      return {
        startDate: prevState.startDate,
        endDate: `${e.target.value} 23:59:29`,
      };
    });
  };

  console.log(selectedDateRange);
  const navigate = useNavigate();
  const [reportType, setReportType] = useState(null);
  return (
    <div
      class="modal fade"
      id="reportModal"
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
              Yeni Rapor Oluştur
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
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    style={{
                      background: reportType === "pivot" && "#6c757d",
                      color: reportType === "pivot" && "white",
                    }}
                    type="button"
                    class="btn btn-outline-secondary mx-1 w-50"
                    onClick={() => setReportType("pivot")}
                  >
                    Pivot Table
                  </button>
                  <button
                    style={{
                      background: reportType === "datagrid" && "#6c757d",
                      color: reportType === "datagrid" && "white",
                    }}
                    type="button"
                    class="btn btn-outline-secondary mx-1 w-50"
                    onClick={() => setReportType("datagrid")}
                  >
                    Data Grid Table
                  </button>
                </div>
              </div>
              <div class="form-floating mb-3 mx-1">
                <span
                  style={{
                    color: "#2f2f2f",
                    marginBottom: 5,
                    fontSize: 15,
                    width: "30%",
                    fontWeight: "600",
                  }}
                >
                  Üretim Hatları:
                </span>
                <Card>
                  <Select
                    placeholder="Select"
                    options={renderedOptions}
                    isMulti={true}
                    onChange={selectChangeHandler}
                  />
                </Card>
              </div>

              <div class="form-floating mb-3 mx-1">
                <span
                  style={{
                    color: "black",
                    fontWeight: "600",
                    marginBottom: 8,
                    fontSize: 15,
                    width: "30%",
                    textAlign: "center",
                  }}
                >
                  Tarih Aralığı:
                </span>
                <div className="d-flex flex-row w-100">
                  <input
                    type="date"
                    defaultValue="2022-05-17"
                    className="form-control mx-1" //{classes.dateInput}
                    onChange={startDateChangeHandler}
                  />

                  <input
                    type="date"
                    defaultValue="2022-05-20"
                    className="form-control mx-1" // {classes.dateInput}
                    onChange={endDateChangeHandler}
                  />
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
              onClick={() => {
                const formData = {
                  startDate: selectedDateRange.endDate,
                  endDate: selectedDateRange.startDate,
                  centerIds: selectedOptions,
                };
                console.log(
                  "the form data is" +
                    formData.startDate +
                    formData.endDate +
                    formData.centerIds
                );
                props.onSaveHandler(formData);
                if (reportType === "data") {
                  navigate("/DataGridForm");
                } else if (reportType === "pivot") {
                  navigate("/PivotTableReport");
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

export default ReportModal;
