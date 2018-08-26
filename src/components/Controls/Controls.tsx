/* tslint:disable function-name */
/* tslint:disable max-line-length */

import * as React from 'react';

import { Input } from '../Input';

import * as Tools from '../../Tools';

export interface IControlsProps {
  income: string;
  debts: string;
  downPayment: string;
  onIncomeChange: any;
  onDebtsChange: any;
  onDownPaymentChange: any;
  propertyPrice: number;
}

export interface IControlsState {
  income: string;
  debts: string;
  downPayment: string;
  incomeErrorMessage: string;
  debtsErrorMessage: string;
  downPaymentErrorMessage: string;
}

export class Controls extends React.Component<IControlsProps, IControlsState> {

  private TIMEOUT = 500;
  private timer: number;

  constructor(props: IControlsProps) {
    super(props);

    const { income, debts, downPayment } = this.props;
    const incomeErrorMessage = '';
    const debtsErrorMessage = '';
    const downPaymentErrorMessage = '';
    this.state = { income, debts, downPayment, incomeErrorMessage, debtsErrorMessage, downPaymentErrorMessage };

    this.onIncomeChange = this.onIncomeChange.bind(this);
    this.onDebtsChange = this.onDebtsChange.bind(this);
    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.getNumberValue = this.getNumberValue.bind(this);
  }

  componentDidMount() {
    this.setState((prevState: IControlsState) => {
      return {
        income: Tools.toNumberFormat(prevState.income),
        debts: Tools.toNumberFormat(prevState.debts),
        downPayment: Tools.toNumberFormat(prevState.downPayment),
      };
    });
  }

  private getNumberValue(value: string): number {
    const numberValue = Tools.toNumber(value);
    return numberValue;
  }

  onIncomeChange(event: Event) {
    window.clearTimeout(this.timer);
    const incomeValue = (event.target as HTMLInputElement).value;
    const incomeNumberValue = this.getNumberValue(incomeValue);

    if (Number.isNaN(incomeNumberValue)) { return; }

    if (incomeValue === '') {
      this.setState({ income: '', incomeErrorMessage: 'Please enter income value' });
      return;
    }

    const income = Tools.toNumberFormat(String(incomeNumberValue));
    const incomeErrorMessage = '';
    this.setState({ income, incomeErrorMessage });
    this.timer = window.setTimeout(
      () => {
        this.props.onIncomeChange(incomeNumberValue);
      },
      this.TIMEOUT);
  }

  onDebtsChange(event: Event) {
    window.clearTimeout(this.timer);
    const debtsValue = (event.target as HTMLInputElement).value;
    const debtsNumberValue = this.getNumberValue(debtsValue);

    if (Number.isNaN(debtsNumberValue)) { return; }

    if (debtsValue === '') {
      this.setState({ debts: '', debtsErrorMessage: 'Please enter debts value' });
      return;
    }

    const debts = Tools.toNumberFormat(String(debtsNumberValue));
    const debtsErrorMessage = '';
    this.setState({ debts, debtsErrorMessage });
    this.timer = window.setTimeout(
      () => {
        this.props.onDebtsChange(debtsNumberValue);
      },
      this.TIMEOUT);
  }

  onDownPaymentChange(event: Event) {
    window.clearTimeout(this.timer);
    const downPaymentValue = (event.target as HTMLInputElement).value;
    const downPaymentNumberValue = this.getNumberValue(downPaymentValue);

    if (Number.isNaN(downPaymentNumberValue)) { return; }

    if (downPaymentValue === '') {
      this.setState({ downPayment: '', downPaymentErrorMessage: 'Please enter down payment' });
      return;
    }

    if (4 * downPaymentNumberValue < this.props.propertyPrice) {
      const downPaymentErrorMessage = 'Down payment must be 25% (or more) of property price';
      this.setState({ downPaymentErrorMessage });
      return;
    }

    const downPayment = Tools.toNumberFormat(String(downPaymentNumberValue));
    const downPaymentErrorMessage = '';
    this.setState({ downPayment, downPaymentErrorMessage });
    this.timer = window.setTimeout(
      () => {
        this.props.onDownPaymentChange(downPaymentNumberValue);
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
          errorMessage={ this.state.incomeErrorMessage }
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
          errorMessage={ this.state.debtsErrorMessage }
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
          errorMessage={ this.state.downPaymentErrorMessage }
          type="text" />
      </div>
    </div>
    );
  }
}
