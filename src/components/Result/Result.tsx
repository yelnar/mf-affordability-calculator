/* tslint:disable function-name */
/* tslint:disable max-line-length */

import * as React from 'react';

import * as Tools from '../../Tools';

export interface IResultProps {
  affordablePropertyPrice: number;
  dbr: number;
  isDownPaymentEnough: boolean;
  isSalaryEnough: boolean;
}

export function Result(props: IResultProps) {
  let status;
  let hideDetails = false;

  if (!props.isSalaryEnough) {
    status = 'Poor';
  } else if (!props.isDownPaymentEnough) {
    status = 'Poor';
  } else if (props.dbr <= 35) {
    status = 'Excellent';
  } else if (props.dbr <= 50) {
    status = 'Good';
  } else {
    status = 'Poor';
  }

  if (props.dbr > 100) {
    hideDetails = true;
  }

  return (
    <div className="mf-ac__result-box">
        <div className="mf-ac__result-status">
          <p>Your ability to afford this property</p>
          <h2>{ status }</h2>
          {/* <h3>{ hideDetails ? '' : props.dbr }</h3> */}
        </div>

        { hideDetails ? '' :
          <div className="mf-ac__result-detail">
            <p>You can afford properties up to { Tools.toNumberFormat(String(props.affordablePropertyPrice)) } </p>
            <a href="#" className="mf-ac__text-link">Search for affordable properties</a>
          </div>
        }
    </div>
  );
}
