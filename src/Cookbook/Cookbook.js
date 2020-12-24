import React, {useState, useEffect} from 'react';
import RecipeThumbnails from '../RecipeThumbnails/RecipeThumbnails'
import Context from '../Context';
import './Cookbook.css'
import { Link } from 'react-router-dom'
import * as API from '../apiCalls'

export default function Cookbook(props) {
    const context = React.useContext(Context);
    const [_results,setResults] = useState([])
    const results = _results.filter( r => context.savedIDs.indexOf(r.id) >= 0)
    useEffect(() => {
        API.getSavedRecipes(context.token)
            .then( results => {
                setResults(results)
            })
            .catch(() => alert('Error!'))
    },[context.token])
    
    return (
        <>
        { !context.isLoggedIn() &&
            <section>
                <h1> Whoops, you have to login before seeing your cookbook </h1>
                <div className="small-margin-top"><Link to='/login' className='outline-button dark'> Login </Link></div>
            </section>
        }
        { context.isLoggedIn() &&
            <>
            <header>
                <div className='hero'>
                    <h2> Cookbook</h2>
                    <h3> This is where you can see your saved recipes and your current list of ingredients </h3>
                </div>
            </header>
            <section>
                <h2 className="center"> Your Saved Recipes </h2>
                { !results.length &&
                    <>
                        <div className='center'>
                            <p className="small-margin-top"> You don't have any recipes saved yet.</p>
                            <br />
                            <br />
                            <Link to='/find-recipes' className="outline-button dark med-margin-top"> Find Recipes </Link>
                        </div>
                    </>
                }
                <RecipeThumbnails results={results}/>
            </section>
            </>
        }
        </>
    )
}
