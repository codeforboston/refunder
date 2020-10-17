import React, { Component, ReactNode } from "react";
import { MainDatabase } from "../database/googleSheetsDatabase";
import { LineItem } from "./LineItem";

interface BudgetTableProps {
  lineItems: any[]; 
}

interface BudgetTableState {
  sortingBy: string;
  sortingOrder: number; // ascending is 0, descending is 1
  page: number;
}

export class BudgetTable extends Component<BudgetTableProps, BudgetTableState> {
  constructor(props: BudgetTableProps) {
    super(props);
    this.state = {
      sortingBy: 'Fiscal Year',
      sortingOrder: 0,
      page: 0
    };
  }

  render() : ReactNode {
    // TODO(brycew): consider memoization if this is slow.
    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    // Start out sorted by fiscal year
    let defaultSorted = this.props.lineItems;
    defaultSorted.sort((a: any, b: any) => a[this.state.sortingBy] - b[this.state.sortingBy]);

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
        {defaultSorted.slice(itemStart, itemEnd).map((item : any) => 
        <LineItem key={item['Fiscal Year'] + item['Department Name'] + item['Division Name'] + item['Description'] + item['Amount']}
                  obj={item}>
        </LineItem>)}
        </tbody>
      </table>
    )
  }
};