/* tslint:disable function-name */
import * as React from 'react';

import { Input } from '../Input';

export function Controls() {
  return (
    <div className="mf-ac__controls">
      <div className="mf-ac__control">
        <Input
          id="income"
          name="income"
          label="Monthly income"
          placeholder="Monthly income"
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="debts"
          name="debts"
          label="Monthly debts"
          placeholder="Monthly debts"
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="downpayment"
          name="downpayment"
          label="Down payment"
          placeholder="Down payment"
          type="text" />
      </div>
    </div>
  );
}
