import React, { Component, ReactNode } from "react";
import { getAllLineItems } from "../database/googleSheetsDatabase";

export class AppContainer extends Component {
  componentDidMount() {
    getAllLineItems.then((sites : any) => {
      console.log(sites);
    });
  }

  render(): ReactNode {
    return <p>Testing component!</p>
  }
};