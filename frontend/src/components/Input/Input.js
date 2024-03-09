import React from 'react'
import inputClass from './input.module.css'
import InputContainer from '../InputContainer/InputContainer';

function Input({ label, type, defaultValue, onChange, onBlur, name, error}, ref) {
    const getErrorMessage = () => {
        // If there is no error, return null
        if (!error) return;

        // If there is a message, return it
        if (error.message) return error.message;

        // If there is no message, return a default message
        switch (error.type) {
            case 'required':
                return 'This field is required';
            case 'minLength':
                return `Too short`;
            case 'maxLength':
                return `Too long`;
            default:
                return 'Invalid value';
        }
    };
    
    return (
        <InputContainer label={label}>
            <input 
            defaultValue={defaultValue}
            className={inputClass.input}
            placeholder={label}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            name={name}
            ref={ref}
            />
            {error && <div className={inputClass.error}>{getErrorMessage()}</div>}
        </InputContainer>
    )
}

export default React.forwardRef(Input);