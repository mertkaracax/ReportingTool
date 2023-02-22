import classes from "./ModalForm.module.css";
import Modal from "../UI/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Card from "./Card";

const ModalForm = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [options, setOptions] = useState([
    {
      Id: 1,
      Code: "WorkCenter",
      Name: "Demo Work Center",
    },
    {
      Id: 2,
      Code: "Montaj",
      Name: "Montaj",
    },
    {
      Id: 56,
      Code: "PR21",
      Name: "PR21",
    },
    {
      Id: 57,
      Code: "PR04",
      Name: "PR04",
    },
    {
      Id: 58,
      Code: "PRESHANE ",
      Name: "ETİKET",
    },
  ]);

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
    <Modal onHideCart={props.onHideCart}>
      <div className={classes.total}>
        <div className={classes.btnContainer}>
          <span
            style={{
              color: "black",
              fontWeight: "600",
              marginBottom: 5,
              fontSize: 15,
              width: "30%",
              textAlign: "center",
            }}
          >
            Form Tipi:
          </span>
          <div
            onClick={() => {
              setReportType("pivot");
            }}
            style={{
              background: reportType === "pivot" ? "#212529" : "#EEEEEE",
              color: reportType === "pivot" && "white",
            }}
            className={classes.btn}
          >
            Pivot Grid Table
          </div>
          <div
            onClick={() => {
              setReportType("data");
            }}
            style={{
              background: reportType === "data" ? "#212529" : "#EEEEEE",
              color: reportType === "data" && "white",
            }}
            className={classes.btn}
          >
            Data Grid Table
          </div>
        </div>
        <div className={classes.btnContainer}>
          <span
            style={{
              color: "#2f2f2f",
              marginBottom: 5,
              fontSize: 15,
              width: "30%",
              fontWeight: "600",
            }}
          >
            Work Center Id:
          </span>
          <Card>
            <Select
              placeholder="Work Center Id"
              style={{ display: "flex", width: "100%" }}
              options={renderedOptions}
              isMulti={true}
              onChange={selectChangeHandler}
            />
          </Card>
        </div>
        <div className={classes.btnContainer}>
          <span
            style={{
              color: "black",
              fontWeight: "600",
              marginBottom: 5,
              fontSize: 15,
              width: "30%",
              textAlign: "center",
            }}
          >
            Tarih Aralığı:
          </span>
          <input
            type="date"
            defaultValue="2022-05-17"
            className={classes.dateInput}
            onChange={startDateChangeHandler}
          />
          <span style={{ fontSize: 20, fontWeight: "bold", marginLeft: 2 }}>
            -
          </span>
          <input
            type="date"
            defaultValue="2022-05-20"
            className={classes.dateInput}
            onChange={endDateChangeHandler}
          />
        </div>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Kapat
        </button>
        <button
          onClick={() => {
            const formData = {
              startDate: selectedDateRange.startDate,
              endDate: selectedDateRange.endDate,
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
              navigate("/Pivot");
            }
          }}
          className={classes.button}
        >
          Oluştur
        </button>
      </div>
    </Modal>
  );
};

export default ModalForm;
