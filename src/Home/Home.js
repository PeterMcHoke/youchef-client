import React from 'react'
import KitchenWare from '../images/HangingKitchenware.svg'
import { Header } from '../elements/Header/Header'
import { HeaderElement } from '../elements/HeaderElement/HeaderElement'
import {StyledLinkWrapper, StyledLink} from '../elements/StyledLink/StyledLink'


export default function Home(props) {

    React.useEffect(() =>
        fetch('http://localhost:8000/').then(r => r.json()).then(console.log), [])

    return (
        <Header>
            <HeaderElement flexSize='1'>
                <div>
                    <h1> Welcome to <strong>YouChef</strong> </h1>
                    <h2> Find recipes that <br />use ingredients <br />you already have </h2>
                    <h3> Missing some ingredients? Automatically generate a shopping list. </h3>
                    <StyledLinkWrapper>
                        <StyledLink to='/find-recipes' white> Try it out </StyledLink>
                    </StyledLinkWrapper>
                </div>
            </HeaderElement>
            <HeaderElement noMobile flexSize='1.5'>
                <img src={KitchenWare} alt="hanging kitchenware" className="heroImage hero-content"/>
            </HeaderElement>
        </Header>
    )
}
