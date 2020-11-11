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
    console.log(this.props.labels);
    console.log(this.props.values);

  }

  render() {
    let bar_width = this.props.width / (this.props.values.length + 1);
    return (
      <svg className="container" ref={ this.myRef } 
           width = {this.props.width} height={ this.props.height }>
        <Bars bar_width={bar_width} max_bar_height={this.props.height} labels={this.props.labels}
              values={this.props.values}/>
      </svg>
    )
  }
};

interface BarsProps {
  bar_width: number;
  max_bar_height: number;
  labels: string[];
  values: number[];
}

class Bars extends Component<BarsProps, {}> {
  myRef: React.RefObject<SVGSVGElement>;

  constructor(props: BarsProps) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    var t = d3.select(this.myRef.current)
        .selectAll('text')
        .data(this.props.labels);

    t.enter().append('text')
        .attr('fill', 'red')
        .attr('y', (d, i) => this.props.max_bar_height - (i % 2) * 28)
        .attr('x', (d, i) => i * this.props.bar_width + 3 + this.props.bar_width / 2) 
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .text((d) => d);
    t.exit().remove();
  }

  render() {
    var max_all = Math.max(...this.props.values);
    var bar_scale_place = d3.scaleLinear().domain([0, max_all]).range([this.props.max_bar_height, 0]);
    const bars = this.props.values.map((val: number, index: number) => {
      return <Bar key={index} width={this.props.bar_width - 1}
                  height={val + 'px'} x={index * this.props.bar_width + 3}
                  y={bar_scale_place(val) + 'px'} />
    });

    return (
    <g className="bars" ref={this.myRef}>
      {bars}
    </g>
    );
  }
};

interface BarProps {
  width: number;
  height: string;
  x: number;
  y: string;
}

class Bar extends Component<BarProps, {}> {
  myRef: React.RefObject<SVGRectElement>;

  constructor(props: BarProps) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    d3.select(this.myRef.current).data([this.props]);
  }

  render() {
    const {width, height, x, y} = this.props;
    return <rect className="bar" ref={this.myRef} 
            width={width} height={height} x={x} y={y} fill={"navy"}/>;
  }

};