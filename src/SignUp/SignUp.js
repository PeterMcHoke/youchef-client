import React, { useState } from 'react';
import {useHistory} from 'react-router';
import * as API from '../apiCalls'
import './SignUp.css'
import Context from '../Context.js';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie'
import animationData from '../lotties/sign-up-success'

export default function SignUp(props) {
    const history = useHistory();
    const [ passwordType, setPasswordType ] = useState('password');
    const context = React.useContext(Context)
    const [accountStatus, setAccountStatus] = useState(null)
    const sections = [ 'email', 'password', 'repeatPassword', 'done'];
    const [sectionHintText] = useState({
        email: 'Save recipes, create shopping lists, etc.',
        password: 'Use at least 1 capital, 1 lowercase, and 1 number',
        repeatPassword: 'Make sure this is the same password as before'
    })
    const [section, setSection] = useState(sections[0])
    const [ form, changeForm ] = useState({
       email: '',
       password: '',
       repeatPassword: ''
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
        },
        repeatPassword() {
            const repeatPasswordValid = (form.repeatPassword === form.password)
            if (!repeatPasswordValid)
                return 'Hint: Make sure this is the same password as before'

        }
    }

    //

    const nextSection = (e) => {
        //using state to track where in the sign up form we are
        console.log('nextSection being called')
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
       console.log("Value of idx: " + idx);
       if (form && idx < 3) {
        form.elements[idx].focus();
        }
       setSection(sections[idx]);
       setError(null)
       if (idx === 3) {
           console.log()
           createAccount()
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


    function createAccount() {
        const data = {
            email: form.email,
            password: form.password
        }
        API.createAccount(data)
            .then( res => {
                //this is where we redirect the user and save user data to context
                console.log(res.user)
                context.setUser(res.user, res.token)
                setAccountStatus(true)
                history.push('/find-recipes')
            })
            //change this to display error message
            .catch(console.log)
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
            <div className="registration-form">
                { section !== 'email' && <div className="back-arrow" onClick={prevSection}><i className="fa fa-arrow-left fa-lg"></i></div> }
            <header>
                <h1>Sign Up</h1>
                { !error ? <p> { sectionHintText[section] }</p> : <p className="red"> { error }</p> }
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
                <div className={`input-section repeat-password-section ${classFor('repeatPassword')}`}>
                  <input className="repeatPassword" type={passwordType} placeholder="Repeat Password" onChange={handleInputChange} onKeyPress={(e) => onKeyPressed(e)}/>
                  <i className="fa fa-eye-slash" onClick={togglePasswordType}></i>
                  <div onClick={(e) => nextSection(e)} className="animated-button"><span className={`icon-repeat-lock ${nextSymbol}`}><i className="fa fa-lock"></i></span><span className="next-button repeatPassword"><i className="fa fa-paper-plane"></i></span></div>
                </div>
                <div className={`success ${classFor('done')} input-section`}>
                  <p> {(accountStatus === null ? 'Hold on a sec...': (accountStatus ? 'Done!' : 'Failed!'))}</p>
                </div>
            </form>
        </div>
        { !context.isLoggedIn() &&
        <section className="center signUp">
            <h3> Already have an account? </h3>
            <div className='small-margin-top'><Link to='/login'> Login </Link></div>
        </section>
        }
        </>

    )
}
