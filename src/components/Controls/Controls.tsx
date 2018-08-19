/* tslint:disable function-name */
import * as React from 'react';

import { Input } from '../Input';

export interface IControlsProps {
  income: number;
  debts: number;
  downPayment: number;
  onIncomeChange: any;
  onDebtsChange: any;
  onDownPaymentChange: any;
}

export interface IControlsReturn {
  income?: string;
  debts?: string;
  downPayment?: string;
  [key: string]: string;
}

export function Controls(props: IControlsProps) {
  const onIncomeChange = (event: Event) => {
    props.onIncomeChange(event);
  };

  const onDebtsChange = (event: Event) => {
    props.onDebtsChange(event);
  };

  const onDownPaymentChange = (event: Event) => {
    props.onDownPaymentChange(event);
  };

  return (
    <div className="mf-ac__controls">
      <div className="mf-ac__control">
        <Input
          id="income"
          name="income"
          label="Monthly income"
          placeholder="Monthly income"
          onChange={onIncomeChange}
          value={ props.income }
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="debts"
          name="debts"
          label="Monthly debts"
          placeholder="Monthly debts"
          onChange={onDebtsChange}
          value={ props.debts }
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="downpayment"
          name="downpayment"
          label="Down payment"
          placeholder="Down payment"
          value={ props.downPayment }
          onChange={onDownPaymentChange}
          type="text" />
      </div>
    </div>
  );
}
