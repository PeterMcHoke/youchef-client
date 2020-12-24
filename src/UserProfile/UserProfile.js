import React, {useState} from 'react';
import Context from '../Context'
import * as API from '../apiCalls'
import './UserProfile.css'

export default function UserProfile(props) {
    const context = React.useContext(Context)
    const [passwordType, setPasswordType] = useState('password');
    const [message, setMessage] = useState(null)
    const togglePasswordType = () =>
        setPasswordType(passwordType === 'password' ? 'text' : 'password')

    console.log(context.user)

    const emailSubmitted = (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        API.updateEmail(email, context.token).then(
            (r) => {
                setMessage('Your email has been updated!')
                context.updateUser({ email })
            })
    }

    const passwordSubmitted = (e) => {
        e.preventDefault();
        const newPassword = e.currentTarget.newPassword.value;
        const oldPassword = e.currentTarget.oldPassword.value;
        if (newPassword === oldPassword ) {
            setMessage('The new password must be different from the old one.')
            return
        }
        API.updatePassword(newPassword, oldPassword, context.token).then(
            (r) => {
                setMessage('Your password has been updated!')

            })
        e.currentTarget.newPassword.value = '';
        e.currentTarget.oldPassword.value = '';
    }


    return (
        <section className="account-section">
         { !!message && <p className="center alert-message"> {message} </p> }
            <div className="account-form small-margin-top">
                <h1> Account Settings </h1>
                <hr />
                <form onSubmit={emailSubmitted}>
                    <div className="form-section">
                        <label htmlFor="email"> Email </label><br />
                        <input className="email" type="email" id="email" name="email" placeholder="youremail@gmail.com" autoComplete="chrome-off" defaultValue={context.user && context.user.email} autoFocus/>
                            <br />
                            <button className='outline-button'> Update </button>
                    </div>
                </form>
                <form onSubmit={passwordSubmitted}>
                    <div className="form-section">
                        <div className='form-element'>
                            <label htmlFor="old-password"> Old Password </label><br />
                              <input className="password" type={passwordType} id="old-password" placeholder="Password" name="newPassword"/>
                                <i className="fa fa-eye-slash" onClick={togglePasswordType}></i>
                        </div>
                        <div className='form-element'>
                            <label htmlFor="new-password"> New Password </label><br />
                              <input className="password" type={passwordType} id="new-password" placeholder="Password" name="oldPassword"/>
                                <i className="fa fa-eye-slash" onClick={togglePasswordType}></i>
                                <button className='outline-button'> Update </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
