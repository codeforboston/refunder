import React, { Component, ReactNode } from "react";
import { MainDatabase } from "../database/googleSheetsDatabase";
import { LineItem } from "./LineItem";

interface BudgetTableState {
  sortedLineItems: any[];
  sortingBy: string;
  sortingOrder: number; // ascending is 0, descending is 1
  page: number;
}

export class BudgetTable extends Component<{}, BudgetTableState> {
  constructor(props: any) {
    super(props);
    // Start out sorted by fiscal year
    this.state = {
      sortedLineItems : [],
      sortingBy: 'Fiscal Year',
      sortingOrder: 0,
      page: 0
    };
  }

  componentDidMount() {
    let db = new MainDatabase();
    db.getData().then((lineItems : any) => {
      console.log(lineItems);
      let defaultSorted = lineItems.slice(0, 1000);
      defaultSorted.sort((a: any, b: any) => a[this.state.sortingBy] - b[this.state.sortingBy]);
      this.setState({
        sortedLineItems: defaultSorted,
        sortingBy: 'Fiscal Year',
        sortingOrder: 0,
        page: 0
      });
    });
  }

  render() : ReactNode {
    const countPerPage = 100;
    let itemStart = this.state.page * countPerPage;
    let itemEnd = (this.state.page + 1) * countPerPage;
    return (
      <table>
        <thead>
        <tr>
          <th>Year</th>
          <th>Service</th>
          <th>Department</th>
          <th>Division</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Fund</th>
        </tr>
        </thead>
        <tbody>
        {this.state.sortedLineItems.slice(itemStart, itemEnd).map((item : any) => 
        <LineItem key={item['Fiscal Year'] + item['Division Name'] + item['Description'] + item['Amount']}
                  obj={item}>
        </LineItem>)}
        </tbody>
      </table>
    )
  }
};