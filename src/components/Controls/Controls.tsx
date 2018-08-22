/* tslint:disable function-name */
import * as React from 'react';

import { Input } from '../Input';

import * as Tools from '../../Tools';

export interface IControlsProps {
  income: number;
  debts: number;
  downPayment: number;
  onIncomeChange: any;
  onDebtsChange: any;
  onDownPaymentChange: any;
}

export interface IControlsState {
  income: number;
  debts: number;
  downPayment: number;
}

export interface IControlsReturn {
  income?: string;
  debts?: string;
  downPayment?: string;
  [key: string]: string;
}

export class Controls extends React.Component<IControlsProps, IControlsState> {

  private TIMEOUT = 500;
  private timer: number;

  constructor(props: IControlsProps) {
    super(props);

    const { income, debts, downPayment  } = this.props;
    this.state = { income, debts, downPayment };

    this.onIncomeChange = this.onIncomeChange.bind(this);
    this.onDebtsChange = this.onDebtsChange.bind(this);
    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.getNumberValue = this.getNumberValue.bind(this);
  }

  private getNumberValue(value: string): number {
    if (!value) return 0;
    const numberValue = Tools.toNumber(value);
    if (Number.isNaN(numberValue)) return 0;
    return numberValue;
  }

  onIncomeChange(event: Event) {
    window.clearTimeout(this.timer);
    const value = (event.target as HTMLInputElement).value;
    const income = this.getNumberValue(value);

    if (income < 0) { return; }
    this.setState({ income });

    this.timer = window.setTimeout(
      () => {
        this.props.onIncomeChange(income);
      },
      this.TIMEOUT);
  }

  onDebtsChange(event: Event) {
    window.clearTimeout(this.timer);
    const value = (event.target as HTMLInputElement).value;
    const debts = this.getNumberValue(value);

    if (debts < 0) { return; }
    this.setState({ debts });

    this.timer = window.setTimeout(
      () => {
        this.props.onDebtsChange(debts);
      },
      this.TIMEOUT);
  }

  onDownPaymentChange(event: Event) {
    window.clearTimeout(this.timer);
    const value = (event.target as HTMLInputElement).value;
    const downPayment = this.getNumberValue(value);

    if (downPayment < 0) { return; }
    this.setState({ downPayment });

    this.timer = window.setTimeout(
      () => {
        this.props.onDownPaymentChange(downPayment);
      },
      this.TIMEOUT);
  }

  render() {
    return (
      <div className="mf-ac__controls">
      <div className="mf-ac__control">
        <Input
          id="income"
          name="income"
          label="Monthly income"
          placeholder="Monthly income"
          onChange={ this.onIncomeChange }
          value={ this.state.income }
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="debts"
          name="debts"
          label="Monthly debts"
          placeholder="Monthly debts"
          onChange={ this.onDebtsChange }
          value={ this.state.debts }
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="downpayment"
          name="downpayment"
          label="Down payment"
          placeholder="Down payment"
          onChange={ this.onDownPaymentChange }
          value={ this.state.downPayment }
          type="text" />
      </div>
    </div>
    );
  }
}
