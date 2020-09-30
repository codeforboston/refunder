import React, { Component, ReactNode } from "react";
import { getAllLineItems } from "../database/googleSheetsDatabase";
import { LineItem } from './LineItem';

interface AppContainerState {
  lineItems: any[];
}

export class AppContainer extends Component<{}, AppContainerState> {
  constructor(props : any) {
    super(props);
    this.state = {lineItems : []};
  }

  componentDidMount() {
    getAllLineItems.then((lineItems : any) => {
      console.log(lineItems);
      this.setState({lineItems: lineItems});
    });
  }

  render(): ReactNode {
    return (
    <div>
      <p>Testing component!</p>
      <ul>{this.state.lineItems.slice(0, 100).map((item : any) => 
        <LineItem key={item['Fiscal Year'] + item['Division Name'] + item['Description'] + item['Amount']}
                  obj={item}>
        </LineItem>)}
      </ul>;
    </div>
    );
  }
};