import React, { Component, ReactNode } from "react";
import { MainDatabase } from "../database/googleSheetsDatabase";
import { BudgetViewSelector } from './BudgetViewSelector';
import { BudgetTable } from './visualization/BudgetTable';
import { BarCharts } from './visualization/BarChart';

interface AppContainerState {
  lineItems: any[];
  fiscalYear: number; // The year to see data on
  viewSelected: string;
}

export class AppContainer extends Component<{}, AppContainerState> {
  constructor(props: any) {
    super(props);
    let fiscalYear = 2019;
    this.handleViewChange = this.handleViewChange.bind(this);

    this.state = {lineItems: [], fiscalYear: fiscalYear, viewSelected: "table"};
    let db = new MainDatabase();
    db.getData().then((lineItems : any) => {
      console.log(lineItems);
      lineItems = lineItems.filter((item: any) => item['Fiscal Year'] === fiscalYear);
      console.log(lineItems);
      this.setState({
        lineItems: lineItems,
        fiscalYear: fiscalYear
      });
    });
  }

  handleViewChange(value: string) {
    this.setState({
      lineItems: this.state.lineItems,
      fiscalYear: this.state.fiscalYear,
      viewSelected: value
    });
  }

  render(): ReactNode {
    let viewComponent;
    if (this.state.viewSelected === 'table') {
      viewComponent = <BudgetTable lineItems={this.state.lineItems}></BudgetTable>;
    } else if (this.state.viewSelected === 'barChart') {
      viewComponent = <BarCharts width={ 100 } height={ 100 }></BarCharts>;
    } else {
      viewComponent = <p>{this.state.viewSelected} coming soon!</p>
    }

    return (
      <div>
        <p>Cambridge Budget Data</p>
        <BudgetViewSelector onSelectorChoice={(value: any) => this.handleViewChange(value) }></BudgetViewSelector>
        { viewComponent }
      </div>
    );
  }
};