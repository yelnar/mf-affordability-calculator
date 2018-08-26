/* tslint:disable no-increment-decrement */
/* tslint:disable max-line-length */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/main.scss';

import { App } from './components/App';

interface IWidgetProps {
  selector: string;
  propertyPrice: number;
  downPayment: number;
  loanLength: number;
  interestRate: number;
  monthlyIncome: number;
  monthlyDebts: number;
}

export function renderWidget({
  selector,
  propertyPrice,
  downPayment,
  loanLength,
  interestRate,
  monthlyIncome,
  monthlyDebts}: IWidgetProps) {

  const holders = document.querySelectorAll(selector);

  for (let i = 0; i < holders.length; i++) {
    ReactDOM.render(
        <App
          propertyPrice = { propertyPrice }
          downPayment = { downPayment }
          loanLength = { loanLength }
          interestRate = { interestRate }
          monthlyIncome = { monthlyIncome }
          monthlyDebts = { monthlyDebts } />,
        holders[i],
    );
  }
}
