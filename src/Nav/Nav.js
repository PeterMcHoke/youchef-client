import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import Context from '../Context';

export default function Nav(props) {
    const context = React.useContext(Context);

    return (
        <nav className='Nav'>
            <div className = "nav-item nav-logo">
                <NavLink to={'/'} className='logo'><h1> YouChef </h1></NavLink>
            </div>
            <div className='nav-item'>
                <NavLink to={'/find-recipes'} className='nav-link button'>
                    Find Recipes
                </NavLink>
                { context.isLoggedIn() &&
                    <NavLink to={'/cookbook'} className='nav-link'>
                        My Cookbook
                    </NavLink>
                }
                { !context.isLoggedIn() &&
                    <NavLink to={'/login'} className='nav-link button'>
                        Login
                    </NavLink>
                }
                { context.isLoggedIn() &&
                    <NavLink to={'/account'} className='nav-link'>
                        Account
                    </NavLink>
                }
                { context.isLoggedIn() &&
                    <NavLink exact to={'/'} className='nav-link button' onClick={()=> context.logout()}>
                        Logout
                    </NavLink>
                }
            </div>
        </nav>
    )
}
