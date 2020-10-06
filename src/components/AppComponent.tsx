import React, { Component, ReactNode } from "react";
import { BudgetTable } from './BudgetTable';

interface AppContainerState {
  lineItems: any[];
}

export class AppContainer extends Component<{}, AppContainerState> {
  constructor(props: any) {
    super(props);
    this.state = { lineItems: [] };
  }

  render(): ReactNode {
    return (
      <div>
        <p>Cambridge Budget Data</p>
        <BudgetTable></BudgetTable>
      </div>
    );
  }
};