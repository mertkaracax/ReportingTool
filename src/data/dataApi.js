import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

class dataFetcher {
  constructor() {}
  getProdData(workCenterIds, endDate, startDate) {
    console.log("WCID: " + workCenterIds);
    let workcenterIdsConverted = workCenterIds.reduce((total, id) => {
      return total + id + "%2C";
    }, "");
    let workcenterIdsConvertedd = workcenterIdsConverted.substring(
      0,
      workcenterIdsConverted.length - 3
    );

    endDate = endDate.substring(0, 10) + "%2000%3A00%3A00";
    startDate = startDate.substring(0, 10) + "%2000%3A00%3A00";
    let url = `https://softnetmasapi.azurewebsites.net/GetProductionDetails?workCenterIds=${workcenterIdsConvertedd}&startDate=${startDate}&endDate=${endDate}`;
    console.log(url);
    return new DataManager({
      url: `https://softnetmasapi.azurewebsites.net/GetProductionDetails?workCenterIds=${workcenterIdsConvertedd}&startDate=${startDate}&endDate=${endDate}`,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    });
  }

  getprodDataFromUrl(url){
    return new DataManager({
      url: url,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    });
  }

  async getProdDataJson() {
    const response = await fetch(
      "https://softnetmasapi.azurewebsites.net/GetProductionDetails?workCenterIds=104%2C154%2C110&startDate=2022-11-01%2000%3A00%3A00&endDate=2022-11-30%2023%3A59%3A29",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("nedenn " + data);
    return data;
  }
}

export default new dataFetcher();
