import React, { Component, ReactNode } from "react";

interface BudgetVSProps {
  onSelectorChoice(value: any): void;
}

interface BudgetVSState {
  value: string;
}

export class BudgetViewSelector extends Component<BudgetVSProps, BudgetVSState> {
  constructor(props: BudgetVSProps) {
    super(props);
    this.state = {value: "coconut"};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.props.onSelectorChoice(event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="table">Table View</option>
        <option value="barChart">Bar chart</option>
        <option value="sunburst">Sunburst View</option>
        <option value="treemap">Treemap View</option>
        <option value="flamegraph">Flamegraph</option>
      </select>
    )
  }

};