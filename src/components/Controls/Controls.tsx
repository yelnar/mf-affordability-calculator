/* tslint:disable function-name */
import * as React from 'react';

import { Input } from '../Input';

export function Controls() {
  const onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    console.log('onChange', value);
  };

  return (
    <div className="mf-ac__controls">
      <div className="mf-ac__control">
        <Input
          id="income"
          name="income"
          label="Monthly income"
          placeholder="Monthly income"
          onChange={onChange}
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="debts"
          name="debts"
          label="Monthly debts"
          placeholder="Monthly debts"
          onChange={onChange}
          type="text" />
      </div>

      <div className="mf-ac__control">
        <Input
          id="downpayment"
          name="downpayment"
          label="Down payment"
          placeholder="Down payment"
          onChange={onChange}
          type="text" />
      </div>
    </div>
  );
}
