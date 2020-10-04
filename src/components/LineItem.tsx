import React, { Component, ReactNode } from "react";

interface LineItemState {
  year: number;
  service: string;
  departmentName: string;
  divisionName: string;
  category: string;
  description: string;
  amount: number;
  fund: string;
}

interface LineItemProps {
  obj: any;
}

export class LineItem extends Component<LineItemProps, LineItemState> {
  constructor(props : LineItemProps) {
    super(props);
    this.state = {
      year: props.obj['Fiscal Year'],
      service: props.obj['Service'],
      departmentName: props.obj['Department Name'],
      divisionName: props.obj['Division Name'],
      category: props.obj['Category'],
      description: props.obj['Description'],
      amount: props.obj['Amount'],
      fund: props.obj['Fund']
    };
  }

  render(): ReactNode {
    return (
      <tr>
        <td>
          {this.state.year}
        </td>
        <td>
          {this.state.service}
        </td>
        <td>
          {this.state.departmentName}
        </td>
        <td>
          {this.state.divisionName}
        </td>
        <td>
          {this.state.category}
        </td>
        <td>
          {this.state.description}
        </td>
        <td>
          ${this.state.amount}
        </td>
        <td>
          {this.state.fund}
        </td>
      </tr>
    )
  }
};