import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSHxVdkNhW3ped31STw==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Td0dlWXlccnFVTmFdWA==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRhX39YcnZQRmheUk0=;MTAwOTE4MkAzMjMwMmUzNDJlMzBET1ZFQmxkSzRkNkVGZzYvTDJDUkluc1JIUVRiellQaThRSWR2OHYvR3VvPQ==;MTAwOTE4M0AzMjMwMmUzNDJlMzBrbjlmMUNtd0wxRXpaZU5WeWswK1BSQWtST091WW1RRno5cTBuSk9uaXNRPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUViW3lednZXQ2BVUUd2;MTAwOTE4NUAzMjMwMmUzNDJlMzBpWWljNW1oOThqb0VSdC9vOTJ3WVp5ZGM2eWNzRUxrWXhBSDZqZWV1MndFPQ==;MTAwOTE4NkAzMjMwMmUzNDJlMzBldTF6V3lVdDltUWxBRTZJNGVOMHN6aFNqWjdnTFhPekx0dlBWTlh0ZXZRPQ==;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRhX39YcnZQRmlbVEE=;MTAwOTE4OEAzMjMwMmUzNDJlMzBPckRlYkJnVnk5L1RlY2NPYXNHajNuK2VIL1FHTzNJZlg5MW9YV1BiZzgwPQ==;MTAwOTE4OUAzMjMwMmUzNDJlMzBUWTMxQnlFTVVTVjZaNU9QRHdKVUhrUldCWnVPL21QMkpScXkwMFpxcm5BPQ==;MTAwOTE5MEAzMjMwMmUzNDJlMzBpWWljNW1oOThqb0VSdC9vOTJ3WVp5ZGM2eWNzRUxrWXhBSDZqZWV1MndFPQ=="
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
