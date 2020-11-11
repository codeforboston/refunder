import React, { Component, ReactNode } from "react";
import { BarCharts } from './visualization/BarChart';

interface DataManagerProps {
  lineItems: any[];
  viewSelected: string;
}

export class DataManager extends Component<DataManagerProps, {}> {
  render(): ReactNode {
    const category = 'Service';
    let data_map: any = {};
    let summed_data: number[] = [];
    let labels: string[] = [];
    let line: any;
    for (line in this.props.lineItems) {
      let line_contents = this.props.lineItems[line];
      let key: string = line_contents[category];
      if (!data_map.hasOwnProperty(key)) {
        data_map[key] = Object.keys(data_map).length;
        summed_data[data_map[key]] = +line_contents['Amount'];
        labels.push(key);
      } else {
        summed_data[data_map[key]] += +line_contents['Amount'];
      }
    }
    
    // TODO: add on click handle from the bar charts, giving what bar was clicked,
    // handle it in here
    return (
      <BarCharts width={800} height={400} labels={labels} values={summed_data}></BarCharts>
    );
  }
};