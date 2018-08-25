/* tslint:disable function-name */
import * as React from 'react';

export interface IInputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  onChange: any;
  value: string;
  errorMessage: string;
}

export function Input(props: IInputProps) {
  const randomNumber = _generateRandomNumber(7);
  const id = props.id + '_' + randomNumber;

  return (
    <div className="mf-ac__field">
        <input className="mf-ac__input"
          type={ props.type }
          name={ props.name }
          id={ id }
          value={ props.value }
          placeholder=" "
          onChange={ props.onChange } />
        <label className="mf-ac__label" htmlFor={ id }>{props.label }</label>
        <small className="mf-ac__input-error">{ props.errorMessage }</small>
    </div>
  );
}

function _generateRandomNumber(digits: number) {
  const n = Math.pow(10, digits);
  const a = n / 10;
  const b = n - a;
  return Math.floor(a + Math.random() * b);
}
