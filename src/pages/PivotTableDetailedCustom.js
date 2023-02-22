import * as React from "react";
import {
  PivotViewComponent,
  PivotFieldListComponent,
  Inject,
  CalculatedField,
  PivotFieldList,
} from "@syncfusion/ej2-react-pivotview";
import { Browser, setStyleAttribute } from "@syncfusion/ej2-base";
import { productDataStaticJson } from "../data/data";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import pt from "../tr.json";
import dataApi from "../data/dataApi";
L10n.load(pt);
setCulture("tr");

/**
 * Pivot Field List default sample
 */
const SAMPLE_CSS = `.e-pivotview {
    width: 58%;
    height: 100%;
    float: left;
}
.e-pivotfieldlist {
    width: 42%;
    height: 100%;
    float: right;
}
.e-pivotfieldlist .e-static {
    width: 100% !important;
}`;
/* tslint:disable */

const PivotTableDetailedCustom = (props) => {
  L10n.load(pt);
  setCulture("tr");
  let fieldlistObj;
  let pivotObj;
  let dataSourceSettings = {
    enableSorting: true,
    columns: props.columns,
    valueSortSettings: { headerDelimiter: " - " },
    values: props.values,
    dataSource: dataApi.getProdData(
      props.workCenterIds,
      props.startDate,
      props.endDate
    ),
    rows: props.rows,
    expandAll: false,
    filters: [{ name: "Product_Categories", caption: "Product Categories" }],
  };

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
    console.log(configObj);
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section" style={{ overflow: "auto" }}>
        <PivotViewComponent
          locale="tr-TR"
          id="PivotView"
          ref={(d) => (pivotObj = d)}
          enginePopulated={afterPivotPopulate.bind(this)}
          width={"99%"}
          height={"580"}
          gridSettings={{ columnWidth: 140 }}
        >
          {/* <Inject services={[CalculatedField, PivotFieldList]}/> */}
        </PivotViewComponent>
        <PivotFieldListComponent
          locale="tr-TR"
          id="PivotFieldList"
          ref={(d) => (fieldlistObj = d)}
          enginePopulated={afterPopulate.bind(this)}
          dataSourceSettings={dataSourceSettings}
          renderMode={"Fixed"}
          allowCalculatedField={true}
          enableFieldSearching={true}
          load={onLoad}
          dataBound={ondataBound.bind(this)}
        >
          <Inject services={[CalculatedField]} locale="tr-TR" />
        </PivotFieldListComponent>
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "13%",
          left: "24%",
          backgroundColor: "black",
          color: "white",
          height: 50,
          width: 200,
          border: "1px solid black",
          borderRadius: 5,
          fontSize: 18,
        }}
        onClick={onSave}
      >
        Raporu Kaydet
      </button>
    </div>
  );
};
export default PivotTableDetailedCustom;
