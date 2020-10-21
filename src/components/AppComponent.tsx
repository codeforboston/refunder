import React, { Component, ReactNode } from "react";
import { MainDatabase } from "../database/googleSheetsDatabase";
import { BudgetViewSelector } from './BudgetViewSelector';
import { BudgetTable } from './visualization/BudgetTable';
import { DataManager } from './DataManager';

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
  }
  
  componentDidMount() {
    let db = new MainDatabase();
    db.getData().then((lineItems : any) => {
      console.log(lineItems);
      lineItems = lineItems.filter((item: any) => item['Fiscal Year'] === String(this.state.fiscalYear));
      console.log(lineItems);
      this.setState({
        lineItems: lineItems,
        fiscalYear: this.state.fiscalYear,
        viewSelected: this.state.viewSelected
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
      viewComponent =  (<DataManager 
                          lineItems={this.state.lineItems} 
                          viewSelected={this.state.viewSelected}>
                        </DataManager>);
    } else {
      viewComponent = <p>{this.state.viewSelected} coming soon!</p>
    }

    return (
      <div>
        <p>Cambridge Budget Data</p>
        <BudgetViewSelector onSelectorChoice={(value: any) => this.handleViewChange(value) }></BudgetViewSelector>
        <p></p>
        { viewComponent }
      </div>
    );
  }
};