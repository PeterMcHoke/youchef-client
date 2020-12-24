import React from 'react';
//a stateless, presentational component to iterate through all the form errors and display them.

export const FormErrors = ({formErrors}) => {
    <div className='formErrors'>
        { Object.keys(formErrors).map((fieldName, i) => {
            //checking if the string is empty
            if(formErrors[fieldName].length > 0)
                return <p key={i}> {fieldName} {formErrors[fieldName]} </p>
            else
                return ''
        })}
    </div>
}
