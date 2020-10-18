import React, { Component } from "react";
import * as d3 from "d3";

interface BarChartProps {
  width: number;
  height: number;
  // labels: string[];
  // values: number[];
}

export class BarCharts extends Component<BarChartProps, {}> {
  myRef: React.RefObject<SVGSVGElement>;

  constructor(props: BarChartProps) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    d3.select(this.myRef.current)
      .append("circle")
      .attr("r", 4)
      .attr("cx", this.props.width / 2)
      .attr("cy", this.props.height / 2)
      .attr("fill", "red");
  }

  render() {
    return (
      <svg className="container" ref={ this.myRef } 
           width = { this.props.width} height={ this.props.height }>
      </svg>
    )
  }

};