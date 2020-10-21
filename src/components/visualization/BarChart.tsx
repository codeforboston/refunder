import React, { Component } from "react";
import * as d3 from "d3";

interface BarChartProps {
  width: number;
  height: number;
  labels: string[];
  values: number[];
}

export class BarCharts extends Component<BarChartProps, {}> {
  myRef: React.RefObject<SVGSVGElement>;

  constructor(props: BarChartProps) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    var max_all = Math.max(...this.props.values);
    var bar_scale_height = d3.scaleLinear().domain([0, max_all]).range([0, this.props.height]);
    var bar_scale_place = d3.scaleLinear().domain([0, max_all]).range([this.props.height, 0]);

    let bar_width = this.props.width / (this.props.values.length + 1);
    console.log(this.props.labels);
    console.log(this.props.values);

    var u = d3.select(this.myRef.current)
        .selectAll('rect')
        .data(this.props.values);

    u.enter().append('rect')
        .attr('width', bar_width - 1)
        .attr('height', (d) => bar_scale_height(d) + 'px')
        .attr('x', (d, i) => i * bar_width + 3)
        .attr('y', (d, i) => bar_scale_place(d) + 'px')
        .attr('fill', 'white');
    u.exit().remove();

    var t = d3.select(this.myRef.current)
        .selectAll('text')
        .data(this.props.labels);

    t.enter().append('text')
        .attr('fill', 'red')
        .attr('y', (d, i) => this.props.height - (i % 2) * 28)
        .attr('x', (d, i) => i * bar_width + 3 + bar_width / 2) 
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .text((d) => d);
    t.exit().remove();
  }

  render() {
    return (
      <svg className="container" ref={ this.myRef } 
           width = {this.props.width} height={ this.props.height }>
      </svg>
    )
  }

};