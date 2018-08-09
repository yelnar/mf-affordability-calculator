import * as React from 'react';

import { Wow } from '../Wow';

export interface AppProps { compiler: string; framework: string; }

// export const HelloWorld = (
//     props: HelloWorldProps) => <h1>Hello from { props.compiler } and { props.framework }</h1>;

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
        <div>
            <h1>Hello from { this.props.compiler } and { this.props.framework }</h1>
            <Wow />
        </div>
    );
  }
}
