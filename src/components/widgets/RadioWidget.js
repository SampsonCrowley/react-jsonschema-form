import React from "react";
import PropTypes from "prop-types";

function RadioWidget(props) {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, inline } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <div className="field-radio-group">
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        const disabledCls = disabled || readonly ? "disabled" : "";
        const radio = (
          <input
            className="form-check-input"
            type="radio"
            checked={checked}
            name={name}
            required={required}
            value={option.value}
            disabled={disabled || readonly}
            autoFocus={autofocus && i === 0}
            onChange={_ => onChange(option.value)}
          />
        );

        return inline
          ? <label
              key={i}
              className={`radio-inline form-check form-check-label form-check-inline ${disabledCls}`}>
              {radio}
              <span>{option.label}</span>
            </label>
          : <div key={i} className={`radio form-check ${disabledCls}`}>
              <label className="form-check-label">
                {radio}
                <span>{option.label}</span>
              </label>
            </div>;
      })}
    </div>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
