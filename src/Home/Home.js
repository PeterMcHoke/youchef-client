import React from 'react'
import './Home.css'
import KitchenWare from '../images/HangingKitchenware.svg'
import { Link } from 'react-router-dom';

export default function Home(props) {
    return (
        <header className='home-header'>
            <div className=" hero left">
                <div className="hero-content">
                    <h1> Welcome to <strong>YouChef</strong> </h1>
                    <h2> Find recipes made with ingredients you already have </h2>
                    <h3> Missing some ingredients? Automatically generate a shopping list. </h3>
                    <div className="big-margin-top">
                        <Link to='/find-recipes' className="outline-button white"> Try it out </Link>
                    </div>
                </div>
            </div>
            <div className="right">

                <img src={KitchenWare} alt="hanging kitchenware" className="heroImage hero-content"/>
            </div>
        </header>
    )
}
