/* tslint:disable no-increment-decrement */
import * as React from 'react';

import { Header } from '../Header';
import { Controls } from '../Controls';
import { Result } from '../Result';
import { Footer } from '../Footer';

export interface AppProps { product: string; owner: string; }
export interface IAppState { isToggleOn: boolean; }

// export const HelloWorld = (
//     props: HelloWorldProps) => <h1>Hello from { props.compiler } and { props.framework }</h1>;

export class App extends React.Component<AppProps, IAppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="mf-ac">
        <div className="mf-ac__wrapper">
            <Header />
            <Controls />
            <Result status="Excellent" propertyPriceLimit="1,500,000" />
            <Footer
              monthlyPayment="7,845 AED/month"
              loanDuration="25"
              downPayment="25"
              interestRate="3.24"/>
            {/* <h1 className={this.state.isToggleOn ? 'red' : 'green'}
              onClick={ this.handleClick }>
              { this.props.product } by { this.props.owner }
            </h1> */}
        </div>
      </div>
    );
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }
}
