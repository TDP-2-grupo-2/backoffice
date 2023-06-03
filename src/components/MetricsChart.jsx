import React from "react";
import { Chart } from "react-google-charts";



export const MetricsChart = (props) => {
  return (
    <Chart
      chartType={props.info.type}
      data={props.info.data}
      options={props.info.options}
    />
  );
}

