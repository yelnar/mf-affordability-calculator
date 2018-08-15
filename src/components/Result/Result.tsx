/* tslint:disable function-name */
import * as React from 'react';

export interface IResultProps {
  status: string;
  propertyPriceLimit: string;
}

export function Result(props: IResultProps) {
  return (
    <div className="mf-ac__result-box">
        <div className="mf-ac__result-status">
          <p>Your ability to afford this property</p>
          <h2>{ props.status }</h2>
        </div>
        <div className="mf-ac__result-detail">
          <p>You can afford properties up to { props.propertyPriceLimit } </p>
          <a href="#" className="mf-ac__text-link">Search for affordable properties</a>
        </div>
    </div>
  );
}
