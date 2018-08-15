/* tslint:disable function-name */
import * as React from 'react';

export interface IFooterProps {
  monthlyPayment: string;
  loanDuration: string;
  downPayment: string;
  interestRate: string;
}

export function Footer(props: IFooterProps) {
  return (
    <div className="mf-ac__footer">
      <div className="mf-ac__footer__first-block">
        <p>Your monthly payments will start from { props.monthlyPayment }</p>
        <p>
          This calculation is based on { props.loanDuration } years loan duration,
          { props.downPayment }% down payment and at an average
          interest rate of { props.interestRate }%
        </p>
      </div>
      <div className="mf-ac__footer__second-block">
        <a href="#" className="mf-ac__footer__button">Get mortgage advice</a>
      </div>
    </div>
  );
}
