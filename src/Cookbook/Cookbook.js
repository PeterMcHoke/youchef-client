import React, {useState, useEffect} from 'react';
import RecipeThumbnails from '../RecipeThumbnails/RecipeThumbnails'
import Context from '../Context';
import './Cookbook.css'
import { Link } from 'react-router-dom'
import * as API from '../apiCalls'
import { UserNotice } from '../elements/UserNotice/UserNotice'
import Loading from '../loading/loading'


export default function Cookbook(props) {
    const context = React.useContext(Context);
    const [results,setResults] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (context.token)
            API.getSavedRecipes(context.token)
                .then(res => {
                    setResults(res);
                    setLoading(false)
                })
                .catch((err) => alert(err.message))
    }, [context.token, context.savedIDs])

    return (
        <>
        { !context.isLoggedIn() &&
            <UserNotice>
                <h1> Whoops, you have to login before seeing your cookbook </h1>
                <div className="small-margin-top"><Link to='/login' className='outline-button dark'> Login </Link></div>
            </UserNotice>
        }
        { context.isLoggedIn() &&
            <>
            <header>
                <UserNotice>
                    <h2> Cookbook</h2>
                    <br />
                    <sub> This is where you can see your saved recipes and your current list of ingredients </sub>
                </UserNotice>
            </header>
            <section>
                { loading ? 
                    <Loading /> 
                    :
                    (
                        !results.length ?
                            (
                                <div className='center'>
                                    <p className="small-margin-top"> You don't have any recipes saved yet.</p>
                                    <br />
                                    <br />
                                    <Link to='/find-recipes' className="outline-button dark med-margin-top"> Find Recipes </Link>
                                </div>
                            )
                            :
                            <RecipeThumbnails results={results}/>
                    )      
                }
            </section>
            </>
        }
        </>
    )
}

