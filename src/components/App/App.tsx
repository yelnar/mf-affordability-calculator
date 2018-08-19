/* tslint:disable no-increment-decrement */
/* tslint:disable max-line-length */

import * as React from 'react';

import { Header } from '../Header';
import { Controls, IControlsReturn } from '../Controls';
import { Result } from '../Result';
import { Footer } from '../Footer';

import * as Tools from '../../Tools';
import { IncomingMessage } from 'http';

export interface AppProps {
  propertyPrice: number;
  downPayment: number;
  loanLength: number;
  interestRate: number;
  monthlyIncome: number;
  monthlyDebts: number;
}
export interface IAppState { dbr: number; }

// export const HelloWorld = (
//     props: HelloWorldProps) => <h1>Hello from { props.compiler } and { props.framework }</h1>;

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
  private downPayment = 375000;

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
  private monthlyIncome = 15000;

  /**
   * Monthly debts
   * @type {number}
   */
  private monthlyDebts = 5000;

  /**
   * VAT: 5%
   * @type {number}
   */
  private VAT = 1.05;

  constructor(props: AppProps) {
    super(props);
    this.state = { dbr: 12 };

    if (this.props.propertyPrice) { this.propertyPrice =  this.props.propertyPrice; }
    if (this.props.downPayment) { this.downPayment =  this.props.downPayment; }
    if (this.props.loanLength) { this.loanLength =  this.props.loanLength; }
    if (this.props.interestRate) { this.interestRate =  this.props.interestRate; }
    if (this.props.monthlyIncome) { this.monthlyIncome =  this.props.monthlyIncome; }
    if (this.props.monthlyDebts) { this.monthlyIncome =  this.props.monthlyDebts; }

    this.calculateDBR = this.calculateDBR.bind(this);
    this.calculateMonthlyPayment = this.calculateMonthlyPayment.bind(this);
    this.getLoanAmount = this.getLoanAmount.bind(this);
    this.getLandDepartmentFee = this.getLandDepartmentFee.bind(this);
    this.getRegistrationFee = this.getRegistrationFee.bind(this);
    this.getMortgageRegistration = this.getMortgageRegistration.bind(this);
    this.getRealEstateAgencyFee = this.getRealEstateAgencyFee.bind(this);
    this.getBankArrangementFee = this.getBankArrangementFee.bind(this);
    this.getTotalPurchaseCost = this.getTotalPurchaseCost.bind(this);
    this.getMothlyPayment = this.getMothlyPayment.bind(this);
    this.getNumberValue = this.getNumberValue.bind(this);
    this.onIncomeChange = this.onIncomeChange.bind(this);
    this.onDebtsChange = this.onDebtsChange.bind(this);
    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
  }

  private calculateDBR(): number {
    const monthlyPayment = this.calculateMonthlyPayment();
    const totalMonthlyDebts = monthlyPayment + this.monthlyDebts;
    return Math.round(totalMonthlyDebts / this.monthlyIncome * 100);
  }

  private calculateMonthlyPayment(withFeesValue = false): number {
    let loanAmount = this.getLoanAmount(this.propertyPrice, this.downPayment);
    const landDepartmentFee = this.getLandDepartmentFee(this.propertyPrice);
    const registrationFee = this.getRegistrationFee(this.propertyPrice);
    const mortgageRegistration = this.getMortgageRegistration(loanAmount);
    const realEstateAgencyFee = this.getRealEstateAgencyFee(this.propertyPrice);
    const bankArrangementFee = this.getBankArrangementFee(loanAmount);
    const valuation = 3150;
    const totalPurchaseCost = this.getTotalPurchaseCost(landDepartmentFee, registrationFee, mortgageRegistration, realEstateAgencyFee, bankArrangementFee, valuation);

    if (withFeesValue) {
      loanAmount += 0.75 * totalPurchaseCost;
    }

    const monthlyPayment = this.getMothlyPayment(this.loanLength, this.interestRate, loanAmount);
    return monthlyPayment;
  }

  /**
   * Calculates loan amount
   * @param {number} propertyPrice
   * @param {number} downPayment
   * @returns {number}
   */
  private getLoanAmount(propertyPrice: number, downPayment: number): number {
    return propertyPrice - downPayment;
  }

  /**
   * Calculates land department fee
   * @param {number} propertyPrice
   * @returns {number}
   */
  private getLandDepartmentFee(propertyPrice: number): number {
    return propertyPrice * 0.04 + 580;
  }

  /**
   * Calculates registration fee including VAT
   * @param {number} propertyPrice
   * @returns {number} registration fee + VAT
   */
  private getRegistrationFee(propertyPrice: number): number {
    const registrationFee = propertyPrice < 500000 ? 2000 : 4000;
    return registrationFee * this.VAT;
  }

  /**
   * Calculates mortgage registration fee
   * @param {number} loanAmount
   * @returns {number} 0.25% of loan amount + 10 AED
   */
  private getMortgageRegistration(loanAmount: number): number {
    return loanAmount * (0.25 / 100) + 10;
  }

  /**
   * Calculates real estate agency fee including VAT
   * @param {number} propertyPrice
   * @returns {number} 2% of property price + VAT
   */
  private getRealEstateAgencyFee(propertyPrice: number): number {
    return propertyPrice * 0.02 * this.VAT;
  }

  /**
   * Calculates loan amount including VAT
   * @param {number} loanAmount
   * @returns {number} 0.25% of loan amount + VAT
   */
  private getBankArrangementFee(loanAmount: number): number {
    return loanAmount * 0.0025 * this.VAT;
  }

  /**
   * Calculates total purchase cost
   * @param {number[]} costs
   * @returns {number}
   */
  private getTotalPurchaseCost(...costs: number[]): number {
    return costs.reduce((sum, x) => sum + x);
  }

  /**
   * Calculate monthly payment
   * @param {number} loanLength
   * @param {number} interestRate
   * @param {number} loanAmount
   * @returns {number}
   */
  private getMothlyPayment(loanLength: number, interestRate: number, loanAmount: number): number {
    const periods = loanLength * 12;
    const interestRateNumber = Number((interestRate / 100).toFixed(4));
    const monthlyInterest = interestRateNumber / 12;
    const term = Math.pow((1 + monthlyInterest), periods);
    return loanAmount * (monthlyInterest * term / (term - 1));
  }

  private getNumberValue(event: Event): number {
    const value = (event.target as HTMLInputElement).value;
    if (!value) return 0;
    const numberValue = Tools.toNumber(value);
    if (Number.isNaN(numberValue)) return 0;
    return numberValue;
  }

  onIncomeChange(event: Event): void {
    const income = this.getNumberValue(event);
    if (income < 0) { return; }
    this.monthlyIncome = income;
    const dbr = this.calculateDBR();
    this.setState({ dbr });
  }

  onDebtsChange(event: Event) {
    const debts = this.getNumberValue(event);
    if (debts < 0) { return; }
    this.monthlyDebts = debts;
    const dbr = this.calculateDBR();
    this.setState({ dbr });
  }

  onDownPaymentChange(event: Event) {
    const downPayment = this.getNumberValue(event);
    if (downPayment < 0) { return; }
    this.downPayment = downPayment;
    const dbr = this.calculateDBR();
    this.setState({ dbr });
  }

  render() {
    return (
      <div className="mf-ac">
        <div className="mf-ac__wrapper">
            <Header />
            <Controls income = { this.monthlyIncome }
                      debts = { this.monthlyDebts }
                      downPayment = { this.downPayment }
                      onIncomeChange = { this.onIncomeChange }
                      onDebtsChange = { this.onDebtsChange }
                      onDownPaymentChange = { this.onDownPaymentChange } />
            <Result status = "Excellent" propertyPriceLimit = "1,500,000" dbr = { this.state.dbr } />
            <Footer monthlyPayment = "7,845 AED/month"
                    loanDuration = "25"
                    downPayment = "25"
                    interestRate = "3.24"/>
        </div>
      </div>
    );
  }
}
