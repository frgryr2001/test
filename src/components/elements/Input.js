import React from 'react';

const Input = ({
  type,
  placeholder,
  className,
  nameInput = '',
  register,
  ...rest
}) => {
  if (register) {
    return (
      <input
        type={type || 'text'}
        placeholder={placeholder}
        className={className}
        name={nameInput}
        {...register(nameInput)}
        {...rest}
      />
    );
  }
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
};
export default Input;
