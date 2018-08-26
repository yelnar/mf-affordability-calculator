/* tslint:disable no-increment-decrement */
/* tslint:disable max-line-length */

import * as React from 'react';

import { Header } from '../Header';
import { Controls } from '../Controls';
import { Result } from '../Result';
import { Footer } from '../Footer';

import { Calculator } from '../../Calculator';

export interface AppProps {
  propertyPrice: number;
  downPayment: number;
  loanLength: number;
  interestRate: number;
  monthlyIncome: number;
  monthlyDebts: number;
}
export interface IAppState {
  dbr: number;
  monthlyPayment: number;
  affordablePropertyPrice: number;
  isSalaryEnough: boolean;
  isDownPaymentEnough: boolean;
}

export class App extends React.Component<AppProps, IAppState> {

 /**
   * Property price
   * @type {number}
   */
  private propertyPrice = 1500000;

  /**
   * Down payment
   * @type {number}
   */
  private downPayment: number;

  /**
   * Loan length
   * @type {number}
   */
  private loanLength = 25;

  /**
   * Interest rate
   * @type {number}
   */
  private interestRate = 3.75;

  /**
   * Monthly income
   * @type {number}
   */
  private monthlyIncome = 30000;

  /**
   * Monthly debts
   * @type {number}
   */
  private monthlyDebts = 5000;

  private calculator: Calculator;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      dbr: 0,
      monthlyPayment: 0,
      affordablePropertyPrice: 0,
      isSalaryEnough: false,
      isDownPaymentEnough: false,
    };

    this.calculator = new Calculator();

    if (this.props.propertyPrice) { this.propertyPrice =  this.props.propertyPrice; }
    if (this.props.loanLength) { this.loanLength =  this.props.loanLength; }
    if (this.props.interestRate) { this.interestRate =  this.props.interestRate; }
    if (this.props.monthlyIncome) { this.monthlyIncome =  this.props.monthlyIncome; }
    if (this.props.monthlyDebts) { this.monthlyIncome =  this.props.monthlyDebts; }

    if (this.props.downPayment) { this.downPayment =  this.props.downPayment; }
    else { this.downPayment = Math.round(this.propertyPrice / 4); }

    this.onIncomeChange = this.onIncomeChange.bind(this);
    this.onDebtsChange = this.onDebtsChange.bind(this);
    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
  }

  componentDidMount() {
    this.updateWidget();
  }

  updateWidget() {
    const monthlyPayment = this.calculator.calculateMonthlyPayment(this.propertyPrice, this.downPayment, this.loanLength, this.interestRate);
    const dbr = this.calculator.calculateDBR(this.propertyPrice, this.downPayment, this.loanLength, this.interestRate, this.monthlyIncome, this.monthlyDebts);
    const affordablePropertyPrice = this.calculator.calculateAffordablePropertyPrice(this.downPayment, this.loanLength, this.interestRate, this.monthlyIncome, this.monthlyDebts, dbr);
    const isSalaryEnough = this.calculator.isSalaryEnough(this.propertyPrice, this.downPayment, this.monthlyIncome);
    const isDownPaymentEnough = this.calculator.isDownPaymentEnough(this.propertyPrice, this.downPayment);
    this.setState({ dbr, monthlyPayment, affordablePropertyPrice, isSalaryEnough, isDownPaymentEnough });
  }

  onIncomeChange(income: number): void {
    this.monthlyIncome = income;
    this.updateWidget();
  }

  onDebtsChange(debts: number) {
    this.monthlyDebts = debts;
    this.updateWidget();
  }

  onDownPaymentChange(downPayment: number) {
    this.downPayment = downPayment;
    this.updateWidget();
  }

  render() {
    return (
      <div className="mf-ac">
        <div className="mf-ac__wrapper">
            <Header />
            <Controls propertyPrice = { this.propertyPrice }
                      income = { '' + this.monthlyIncome }
                      debts = { '' + this.monthlyDebts }
                      downPayment = { '' + this.downPayment }
                      onIncomeChange = { this.onIncomeChange }
                      onDebtsChange = { this.onDebtsChange }
                      onDownPaymentChange = { this.onDownPaymentChange } />
            <Result dbr = { this.state.dbr }
                    affordablePropertyPrice = { this.state.affordablePropertyPrice }
                    isSalaryEnough = { this.state.isSalaryEnough }
                    isDownPaymentEnough = { this.state.isDownPaymentEnough } />
            <Footer monthlyPayment = { this.state.monthlyPayment }
                    loanLength = { this.loanLength }
                    downPayment = { this.downPayment }
                    interestRate = { this.interestRate }/>
        </div>
      </div>
    );
  }
}
