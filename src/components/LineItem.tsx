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
      <p>Year: {this.state.year}, Service: {this.state.service},
         Department: {this.state.departmentName}, Division: {this.state.divisionName},
         Category: {this.state.category}, Description: {this.state.description},
         Amount: ${this.state.amount}, Fund: {this.state.fund}
      </p>
    )
  }
};