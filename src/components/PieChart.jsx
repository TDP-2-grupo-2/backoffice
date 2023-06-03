import React from "react";
import { Chart } from "react-google-charts";



export const PieChart = (props) => {
  return (
    <Chart
      chartType="PieChart"
      data={props.info.data}
      options={props.info.options}
    />
  );
}

