/* tslint:disable max-line-length */

export class Calculator {

  /**
   * VAT: 5%
   * @type {number}
   */
  private VAT = 1.05;

  constructor() { }

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

  private getMonthlyInterest(interestRate: number) {
    const interestRateNumber = Number((interestRate / 100).toFixed(4));
    const monthlyInterest = interestRateNumber / 12;
    return monthlyInterest;
  }

  public calculateMonthlyPayment(propertyPrice: number, downPayment: number, loanLength: number, interestRate: number): number {
    const loanAmount = this.getLoanAmount(propertyPrice, downPayment);
    /**
     * @todo: add 'withFees' option
     */
    // const landDepartmentFee = this.getLandDepartmentFee(propertyPrice);
    // const registrationFee = this.getRegistrationFee(propertyPrice);
    // const mortgageRegistration = this.getMortgageRegistration(loanAmount);
    // const realEstateAgencyFee = this.getRealEstateAgencyFee(propertyPrice);
    // const bankArrangementFee = this.getBankArrangementFee(loanAmount);
    // const valuation = 3150;
    // const totalPurchaseCost = this.getTotalPurchaseCost(landDepartmentFee, registrationFee, mortgageRegistration, realEstateAgencyFee, bankArrangementFee, valuation);

    // if (withFeesValue) {
    //   loanAmount += 0.75 * totalPurchaseCost;
    // }

    const periods = loanLength * 12;
    const monthlyInterest = this.getMonthlyInterest(interestRate);
    const term = Math.pow((1 + monthlyInterest), periods);
    const monthlyPayment = loanAmount * (monthlyInterest * term / (term - 1));
    return monthlyPayment;
  }

  public calculateDBR(propertyPrice: number, downPayment: number, loanLength: number, interestRate: number, monthlyIncome: number, monthlyDebts: number): number {
    const monthlyPayment = this.calculateMonthlyPayment(propertyPrice, downPayment, loanLength, interestRate);
    const totalMonthlyDebts = monthlyPayment + monthlyDebts;
    return Math.ceil(totalMonthlyDebts / monthlyIncome * 100);
  }

  public calculateAffordablePropertyPrice(downPayment: number, loanLength: number, interestRate: number, monthlyIncome: number, monthlyDebts: number, dbr: number): number {
    if (dbr && dbr <= 50) {
      return 4 * downPayment;
    }

    const periods = loanLength * 12;
    const monthlyInterest = this.getMonthlyInterest(interestRate);
    const term = Math.pow((1 + monthlyInterest), periods);
    const monthlyPaymentFactor = monthlyInterest * term / (term - 1);
    const monthlyPayment = monthlyIncome / 2 - monthlyDebts;
    return Math.round((monthlyPayment / monthlyPaymentFactor) + downPayment);
  }

  public isSalaryEnough(propertyPrice: number, downPayment: number, monthlyIncome: number): boolean {
    const loanAmount = this.getLoanAmount(propertyPrice, downPayment);
    return loanAmount < 7 * 12 * monthlyIncome;
  }

  public isDownPaymentEnough(propertyPrice: number, downPayment: number): boolean {
    return 4 * downPayment >= propertyPrice;
  }
}
