import React, { useState } from 'react';
import * as API from '../apiCalls'
import '../SignUp/SignUp.css'
import Context from '../Context.js'
import { Link } from 'react-router-dom'
import { StyledLinkWrapper, StyledLink } from '../elements/StyledLink/StyledLink'
import { UserNotice } from '../elements/UserNotice/UserNotice'

export default function Login(props) {

    const [ passwordType, setPasswordType ] = React.useState('password');
    const context = React.useContext(Context)
    const [accountStatus, setAccountStatus] = useState(null)
    const sections = [ 'email', 'password', 'done'];
    const [section, setSection] = useState(sections[0])
    const [ form, changeForm ] = useState({
       email: '',
       password: ''
    })
    const [nextSymbol, setNextSymbol] = useState('')
    const [error, setError] = useState(null)

    const errorChecker = {
        email() {
            const emailValid = String(form.email).toLowerCase().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if (!emailValid)
                return 'Please enter a valid email address';
        },
        password() {
            const passwordValid = form.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
            if (!passwordValid)
                return 'Hint: 6-20 characters with at least 1 capital, 1 lowercase, and 1 number'
        }
    }

    const nextSection = (e) => {
        //using state to track where in the sign up form we are
       const checker = errorChecker[section];
       //if that section exists, check for errors before preceeding to next section
       if (checker) {
           const checkError = checker();
           if (checkError) {
               setError(checkError);
               return
           }
       }
       const form = e.target.form;
       const idx = sections.indexOf(section) + 1;
       if (form && idx < 2) {
        form.elements[idx].focus();
        }
       setSection(sections[idx]);
       setError(null)
       if (idx === 2) {
           login()
       }
    }



   const prevSection = () => {
      const idx = sections.indexOf(section) - 1;
      setSection(sections[idx]);
  }


   const classFor = (s) => {
       const idx = sections.indexOf(s);
       const currIdx = sections.indexOf(section);
       return (idx < currIdx ? 'fold-up' :
                    (idx > currIdx ? 'folded' : 'showing'));
   }

   const handleInputChange = (e) => {
       updateField(e.target.className, e.target.value);
       if(e.target.value !== ''){
           setNextSymbol('next')
       }
       else {
           setNextSymbol('')
       }
   }





    const updateField = (field,val) => changeForm({...form, [field]: val})


    function login() {
        console.log('login called')
        const data = {
            email: form.email,
            password: form.password
        }
        API.login(data)
            .then(res => {
                context.setUser(res.user, res.token)
                setAccountStatus(true)
            })
            //change this to show the user the error
            .catch(err => {
                console.log(err.message)
                setAccountStatus(false)
                setError(err.message)
            })
    }

    const onKeyPressed = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            e.preventDefault();
            nextSection(e);
        }
        if (e.key === 'Enter' && e.target.value === '') {
            alert('Make sure you fill out the input before moving on')
        }
    }

    const togglePasswordType = () =>
        setPasswordType(passwordType === 'password' ? 'text' : 'password')



    return (
        <>
        { !context.isLoggedIn() &&
            <div className="registration-form">
                { section !== 'email' && <div className="back-arrow" onClick={prevSection}><i className="fa fa-arrow-left fa-lg"></i></div> }
            <header>
                <h1>Login</h1>
                { !error ? <p> Please enter your account info </p> : <p className="red"> { error }</p> }
            </header>
            <form>
                <div className={`input-section email-section ${classFor('email')}`}>
                  <input className="email" type="email" placeholder="Email" autoComplete="chrome-off" onChange={handleInputChange} onKeyPress={(e) => onKeyPressed(e)} autoFocus/>
                  <div onClick={ (e) => nextSection(e)} className="animated-button"><span className={`icon-paper-plane ${nextSymbol}`}><i className="fa fa-envelope-o"></i></span><span className="next-button email"><i className="fa fa-arrow-up"></i></span></div>
                </div>
                <div className={`input-section password-section  ${classFor('password')}`} >
                  <input className="password" type={passwordType} placeholder="Password" onChange={handleInputChange} onKeyPress={(e) => onKeyPressed(e)}/>
                    <i className="fa fa-eye-slash" onClick={togglePasswordType}></i>
                  <div onClick={(e) => nextSection(e)} className="animated-button"><span className={`icon-lock ${nextSymbol}`}><i className="fa fa-lock"></i></span><span className="next-button password"><i className="fa fa-arrow-up"></i></span></div>
                </div>
                <div className={`success ${classFor('done')} input-section`}>
                  <p> {(accountStatus === null ? 'Hold on a sec...': (accountStatus ? 'Signed in!' : `Failed...`))}</p>
                </div>
            </form>
        </div>
        }
        { context.isLoggedIn() &&
            <>
            <UserNotice>
                <h2> Success! </h2>
                <br />
                <sub> Now click the button below to put in some of your ingredients </sub>
            </UserNotice>
            <StyledLinkWrapper center>
                <StyledLink exact to={'/find-recipes'} textcolor='#00476A'>
                    Play around with YouChef
                </StyledLink>
            </StyledLinkWrapper>
            </>
        }
        { !context.isLoggedIn() &&
        <section className="center signUp">
            <h3> Don't have an account? </h3>
            <div className='small-margin-top'><Link to='/sign-up'> Sign Up </Link></div>
        </section>
        }
        </>

    )
}
