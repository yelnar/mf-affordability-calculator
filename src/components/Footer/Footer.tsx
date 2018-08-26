/* tslint:disable max-line-length */
/* tslint:disable function-name */

import * as React from 'react';

import * as Tools from '../../Tools';

export interface IFooterProps {
  monthlyPayment: number;
  loanLength: number;
  downPayment: number;
  interestRate: number;
}

export function Footer(props: IFooterProps) {
  return (
    <div className="mf-ac__footer">
      <div className="mf-ac__footer__first-block">
        <p>Your monthly payments will start from { Tools.toNumberFormat(String(props.monthlyPayment)) } AED/month.</p>
        <p>
          This calculation is based on { props.loanLength } years loan duration, { Tools.toNumberFormat(String(props.downPayment)) } AED down payment and at an average
          interest rate of { props.interestRate }%.
        </p>
      </div>
      <div className="mf-ac__footer__second-block">
        <a href="#" className="mf-ac__footer__button">Get mortgage advice</a>
      </div>
    </div>
  );
}
