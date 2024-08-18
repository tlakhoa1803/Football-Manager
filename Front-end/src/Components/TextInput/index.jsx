import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

/**
 * Text input component for forms.
 * @param {Object} props - The props object.
 * @param {string} props.name - The name of the input field.
 * @param {string} [props.label=""] - The label for the input field.
 * @param {Object} [props.rules={}] - Validation rules for the input field.
 * @param {string | null} [props.icon=null] - The icon to display next to the input field.
 * @param {string} [props.className=''] - Additional classes for styling.
 * @param {string} [props.hint=''] - Hint text to display below the input field.
 * @param {function} [props.click=() => {}] - Function to be executed on icon click.
 * @param {string} [props.defaultValue=''] - The default value for the input field.
 * @param {Object} rest - Additional props to be passed to the input element.
 * @returns {JSX.Element} A React component representing the text input.
 */
export default function TextInput({
  name = "",
  label = "",
  rules = {},
  icon = null,
  className = '',
  hint = '',
  click = () => { },
  defaultValue = '',
  ...rest
}) {
  const { register, formState: { errors }, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <div className="text-input relative">
      {label && <div className='mb-1'><label className="ds-input-text">{label}</label></div>}
      <input
        className={`ds-input ${icon && "pl-7"} ${className}`}
        {...register(name, { ...rules })}
        {...rest}
      />
      {
        icon && (
          <FontAwesomeIcon onClick={click} className="icon" icon={icon} />
        )
      }
      {errors[name] ? <div className='text-xs text-red-700'>{errors[name].message}</div> : <div className='ds-input-text'>{hint}</div>}
    </div>
  )
};
