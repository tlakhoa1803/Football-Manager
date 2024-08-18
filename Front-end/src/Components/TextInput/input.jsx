import React from 'react';
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
  label = "",
  icon = null,
  className = '',
  click = () => { },
  ...rest
}) {
  return (
    <div className="relative flex">
      {label && <div className='mb-1'><label className="ds-input-text">{label}</label></div>}
          <input
            className={`ds-input ds-input-text ${icon} ${className}`}
            {...rest}
          />
          {
            icon && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pl-1">
                <FontAwesomeIcon onClick={click} className="w-2 h-2" icon={icon}/>
              </div>
            )
          }
    </div>
  )
};
