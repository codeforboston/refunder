import React, { Component, ReactNode } from "react";
import { LineItem } from "./LineItem";

interface BudgetTableProps {
  lineItems: any[];
}

interface BudgetTableState {
  sortingBy: string;
  sortingOrder: number; // ascending is 0, descending is 1
  page: number;
}

const countPerPage = 100;

export class BudgetTable extends Component<BudgetTableProps, BudgetTableState> {
  constructor(props: BudgetTableProps) {
    super(props);
    this.state = {
      sortingBy: 'Fiscal Year',
      sortingOrder: 0,
      page: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(valueChange: number) {
    const maxCount = this.calcMaxPage(this.props.lineItems.length);
    console.log('MaxCount: ' + maxCount);
    let newPage = Math.max(0, Math.min(maxCount, this.state.page + valueChange));
    this.setState({
      sortingBy: this.state.sortingBy,
      sortingOrder: this.state.sortingOrder,
      page: newPage
    });
  }

  calcMaxPage(lineItemCount: number) : number {
    return Math.ceil(lineItemCount / countPerPage);
  }

  render() : ReactNode {
    // TODO(brycew): consider memoization if this is slow.
    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    // Start out sorted by fiscal year
    let defaultSorted = this.props.lineItems;
    defaultSorted.sort((a: any, b: any) => a[this.state.sortingBy] - b[this.state.sortingBy]);

    console.log(this.state.page);
    let itemStart = this.state.page * countPerPage;
    let itemEnd = (this.state.page + 1) * countPerPage;
    return (
      <div>
      <button onClick={() => this.handlePageChange(-1) }>Prev</button>
      <div>{ this.state.page } / { this.calcMaxPage(defaultSorted.length) }</div>
      <button onClick={() => this.handlePageChange(1) }>Next</button>
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
        <LineItem key={item['Fiscal Year'] + item['Division Name'] + item['Amount'] + item['Index']}
                  obj={item}>
        </LineItem>)}
        </tbody>
      </table>
    </div>
    )
  }
};
