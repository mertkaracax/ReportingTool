import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlConfig from "../data/urlConfig";
import {
  PivotViewComponent,
  PivotFieldListComponent,
  Inject,
  CalculatedField,
  PivotFieldList,
} from "@syncfusion/ej2-react-pivotview";
import { Browser, setStyleAttribute } from "@syncfusion/ej2-base";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import pt from "../tr.json";
import dataApi from "../data/dataApi";
import SaveReportModal from "../UI/SaveReportModal";

L10n.load(pt);
setCulture("tr");
const height = window.innerHeight;

/**
 * Pivot Field List default sample
 */
const SAMPLE_CSS = `.e-pivotview {
    height: 90%;
    width: 95%;
    float: left;   
}
.e-pivotfieldlist {
    width: 3%;
    height: 100%;
    float: right;
    
}
.e-pivotfieldlist .e-static {
    width: 100% !important;
}`;
/* tslint:disable */

const PivotTableDetailedCustom = (props) => {
  console.log("the props is ", props);
  const navigate = useNavigate();
  const [cartIsShown, setcartIsShown] = useState(false);
  const [reportData, setReportData] = useState({});
  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    if (props.isSaved) {
      fetch(`${urlConfig.getDefaultUrl()}/get/saved/${props.savedReportName}`)
        .then((response) => response.json())
        .then((data) => {
          const dataObj = {
            url: data.url,
            rows: data.rows.map((row) => {
              return { name: row };
            }),
            columns: data.columns.map((column) => {
              return { name: column };
            }),
            calculatedFields: data.calculatedFields,
            values: [
              ...props.values,
              ...data.calculatedFields.map((token) => {
                return { name: token.name, type: "CalculatedField" };
              }),
            ],
          };
          setReportData(dataObj);
          setIsSet(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setIsSet(true);
    }
  }, []);
  function showCartHandler() {
    setcartIsShown(true);
  }
  function hideCartHandler() {
    setcartIsShown(false);
  }

  const onFormDataSubmitted = (reportName, sharedUsers) => {
    pivotObj.refresh();
    console.log(JSON.parse(pivotObj.getPersistData()).dataSourceSettings);
    const configObj = JSON.parse(pivotObj.getPersistData()).dataSourceSettings;
    const rows = configObj.rows.map((row) => {
      return row.name;
    });
    const columns = configObj.columns.map((column) => {
      return column.name;
    });
    const calcFields = configObj.calculatedFieldSettings.map((calcfield) => {
      return { name: calcfield.name, formula: calcfield.formula };
    });
    const values = configObj.values.map((value) => {
      const values = configObj.values.map((value) => {
        return value.name;
      });
    });
    const postObj = {
      reportName: reportName,
      rows: rows,
      columns: columns,
      calculatedFields: calcFields,
      url: dataSourceCustom.dataSource.url,
      values: values,
      users: sharedUsers,
      creatorUsername: localStorage.getItem("username"),
    };

    const data = postObj;

    fetch(`${urlConfig.getDefaultUrl()}/save_report`, {
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
      .catch((error) => {
        console.error("Error:", error);
      });
    setTimeout(() => {
      navigate("/ShowAllReports");
    }, 1000);
  };
  let dataSourceCustom = props.isSaved
    ? dataApi.getprodDataFromUrl(reportData.url)
    : dataApi.getProdData(props.workCenterIds, props.startDate, props.endDate);
  let fieldlistObj;
  let pivotObj;
  let dataSourceSettings = null;
  if (props.isSaved) {
    console.log("the data source is ", dataSourceCustom);
    dataSourceSettings = {
      enableSorting: true,
      columns: reportData.columns,
      valueSortSettings: { headerDelimiter: " - " },
      values: reportData.values,
      dataSource: dataSourceCustom,
      rows: reportData.rows,
      expandAll: false, //false idi
      filters: [{ name: "Product_Categories", caption: "Filtreler" }],
      calculatedFieldSettings: reportData.calculatedFields,
    };
  } else {
    dataSourceSettings = {
      enableSorting: true,
      columns: props.columns,
      valueSortSettings: { headerDelimiter: " - " },
      values: props.values,
      dataSource: dataSourceCustom,
      rows: props.rows,
      expandAll: false,
      filters: [{ name: "Product_Categories", caption: "Filtreler" }],
    };
  }

  function afterPopulate() {
    if (fieldlistObj && pivotObj) {
      fieldlistObj.updateView(pivotObj);
    }
  }
  function afterPivotPopulate() {
    if (!Browser.isDevice && fieldlistObj && pivotObj) {
      fieldlistObj.update(pivotObj);
    }
  }
  function rendereComplete() {
    fieldlistObj.updateView(pivotObj);
    fieldlistObj.update(pivotObj);
  }
  function ondataBound() {
    pivotObj.tooltip.destroy();
    if (Browser.isDevice) {
      pivotObj.element.style.width = "100%";
      pivotObj.allowCalculatedField = true;
      pivotObj.showFieldList = true;
    }
    pivotObj.refresh();
  }
  function onLoad() {
    if (Browser.isDevice) {
      this.renderMode = "Popup";
      this.target = ".control-section";
      setStyleAttribute(document.getElementById("PivotFieldList"), {
        width: 0,
        height: 0,
        float: "left",
        display: "none",
      });
    }
  }

  const onSave = () => {
    const configObj = JSON.parse(pivotObj.getPersistData()).dataSourceSettings;
  };

  let returned;
  if (isSet) {
    returned = (
      <>
        <SaveReportModal
          onSaveHandler={onFormDataSubmitted}
          onHideCart={hideCartHandler}
        />
        <div className="control-pane">
          <style>{SAMPLE_CSS}</style>

          <div className="control-section" style={{ width: "100%" }}>
            <PivotViewComponent
              enablePersistence={true}
              locale="tr-TR"
              id="PivotView"
              ref={(d) => (pivotObj = d)}
              //ref={pivotObj}
              enginePopulated={afterPivotPopulate.bind(this)}
              style={{
                width: "100%",
                autoHide: true,
              }}
              height="590px"
              gridSettings={{ columnWidth: 140 }}
            >
              <Inject services={[CalculatedField, PivotFieldList]} />
            </PivotViewComponent>

            <PivotFieldListComponent //mini buton
              float="bottom"
              locale="tr-TR"
              id="PivotFieldList"
              ref={(d) => (fieldlistObj = d)}
              enginePopulated={afterPopulate.bind(this)}
              dataSourceSettings={dataSourceSettings}
              renderMode={"Popup"} //Fixed İdi
              allowCalculatedField={true}
              enableFieldSearching={true}
              load={onLoad}
              dataBound={ondataBound.bind(this)}
            >
              <Inject services={[CalculatedField]} locale="tr-TR" />
            </PivotFieldListComponent>
          </div>
          {localStorage.getItem("type") === "ADMIN" ? (
            <button
              style={{
                position: "absolute",
                bottom: "3%",
                left: "45%",
                fontSize: 14,
              }}
              className="btn btn-dark"
              // onClick={onSave} // Çağatayyyy
            >
              <a data-bs-toggle="modal" data-bs-target="#saveReportModal">
                Raporu Kaydet
              </a>
            </button>
          ) : null}
        </div>
      </>
    );
  } else {
    returned = <span>Veriler Yükleniyor</span>;
  }
  return returned;
};
export default PivotTableDetailedCustom;
