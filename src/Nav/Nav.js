import React from 'react';
import { NavLink } from "react-router-dom";
import './Nav.css';
import Context from '../Context';
import { MobileNavHeader, MobileNav, StyledNav} from '../elements/StyledNav/StyledNav'

export default function Nav(props) {
    const context = React.useContext(Context);

    return (
        <>
        <StyledNav className='Nav' noMobile>
            <div className = "nav-item nav-logo">
                <NavLink exact to={'/'} className='logo'><h1> YouChef </h1></NavLink>
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
                    <i className="fa fa-gear fa-1x"></i>

                    </NavLink>
                }

            </div>
        </StyledNav>
        <MobileNavHeader>
            <div className = "nav-item nav-logo">
                <NavLink exact to={'/'} className='logo'><h1> YouChef </h1></NavLink>
            </div>
        </MobileNavHeader>
        <MobileNav>
            <NavLink className="fa fa-home" exact to={'/'}></NavLink>
            <NavLink className="fa fa-search" to={'/find-recipes'}></NavLink>
            <NavLink className="fa fa-heart" to={'/cookbook'}></NavLink>
            <NavLink className="fa fa-user" to={'/account'}></NavLink>
        </MobileNav>
        </>
    )
}
