import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FormComponent.module.css";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
  BsTrash,
} from "react-icons/bs";
import { productionFields } from "../data/productionFields";

const FormComponent = (props) => {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState(productionFields);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedSummaries, setSelectedSummaries] = useState([]);
  console.log(selectedColumns);
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <div className={styles.sideBar}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="Ara"
          onChange={(e) => setFilter(e.target.value)}
        />
        {columns.map((element) => {
          let text = filter.toLowerCase();
          let name = element.dataField.toLowerCase();
          if (name.indexOf(text) != -1) {
            return (
              <div key={element.dataField}>
                <div
                  className={styles.columnItem1}
                  onClick={(e) => {
                    setSelectedColumns((prevItems) => [element, ...prevItems]);
                    setColumns((prevItems) =>
                      prevItems.filter(
                        (item) => item.dataField !== e.target.innerHTML
                      )
                    );
                  }}
                >
                  {element.dataField}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.bigDiv}>
        <div className={styles.columnContainer}>
          <div className={styles.containerTitle}>Columns</div>
          <br />
          {selectedColumns.map((element) => {
            return (
              <div className={styles.containerItem} key={element.dataField}>
                <span style={{ width: "80%", paddingLeft: 20 }}>
                  {element.dataField}
                </span>
                <div className={styles.buttonsContainer}>
                  <BsFillArrowLeftCircleFill
                    style={{ marginLeft: "5%", cursor: "pointer" }}
                    size={25}
                    color="#212529"
                    onClick={() => {
                      setSelectedColumns((prevItems) =>
                        prevItems.filter(
                          (item) => item.dataField != element.dataField
                        )
                      );
                      setColumns((prevItems) => {
                        return [element, ...prevItems];
                      });
                    }}
                  />
                  <BsFillArrowRightCircleFill
                    style={{
                      marginLeft: "8%",
                      cursor: "pointer",
                      marginRight: "10%",
                    }}
                    size={25}
                    color="#212529"
                    onClick={() => {
                      if (
                        selectedSummaries.find(
                          (item) => item.dataField === element.dataField
                        ) === undefined
                      ) {
                        let sumType = "sum";
                        const newElement = {
                          dataField: element.dataField,
                          summaryType: sumType,
                        };
                        setSelectedSummaries((prevItems) => {
                          return [newElement, ...prevItems];
                        });
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.columnContainer}>
          <div className={styles.containerTitle}>Summaries</div>
          <br />
          {selectedSummaries.map((element) => {
            return (
              <div className={styles.containerItem} key={element.dataField}>
                <span style={{ width: "80%", paddingLeft: 20 }}>
                  {element.dataField}
                </span>
                <div className={styles.buttonsContainer}>
                  <BsTrash
                    style={{ marginLeft: "5%", cursor: "pointer" }}
                    size={24}
                    color="#212529"
                    onClick={() => {
                      setSelectedSummaries((prevItems) =>
                        prevItems.filter(
                          (item) => item.dataField != element.dataField
                        )
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <button
          className={styles.button}
          onClick={() => {
            // props.onSave(selectedColumns, selectedSummaries);
            navigate("/Pivot");
          }}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
