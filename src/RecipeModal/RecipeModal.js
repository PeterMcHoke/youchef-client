import React from 'react';
import Context from '../Context.js'
import { Link } from 'react-router-dom';



export default function RecipeModal(props) {

    React.useEffect(
       () => {
          document.body.style['overflow-y'] = 'hidden';
         return () => document.body.style['overflow-y'] = 'auto';
    }, []);

    const context = React.useContext(Context)

    const { result } = props;
    const instructions = !!result.infoData.analyzedInstructions.length ?

    result.infoData.analyzedInstructions[0].steps.map((ste, i) =>
        <li class="recipeInstruction"><strong> { i+1 }.</strong>  {result.infoData.analyzedInstructions[0].steps[i].step} </li>
    )
    //take away the button tag and make a button class
    : <a href= {result.infoData.sourceUrl} target="_blank" rel="noreferrer"><button>Go to {result.infoData.sourceName}</button></a>

    const ingredients = result.infoData.extendedIngredients.map((ingredient, idx) =>
    <li class="usedIngredient"><strong>{ingredient.amount} {ingredient.unit}</strong><span class='ingredientName'> {ingredient.name}</span></li>
)

    const saved = context.savedIDs.indexOf(result.id) >= 0;

        return (
        <div className="flex align-center align-vert modal modal--align modal--show" id="modal">
        <div className="modal__container">
          <i className="modal__close modal__close--x" onClick={props.close}>✕</i>
          <div className="topHalf">
            <div className="recipeImage"><img src={result.infoData.image} alt="Bacon-Wrapped" blue="" cheese="" stuffed="" dates=""/></div>
            <div className="recipeHeader">
              <div className="recipeTitle"><h3>{result.title}</h3></div>
              <p className="recipeTime"><i className="fa fa-clock-o"></i><p className="minutesText">{result.infoData.readyInMinutes}min</p></p>
              <p className="servingSize"></p>
              { context.isLoggedIn() ?
                  <div className="small-margin-top">
                    <button
                        className= {`outline-button left-align ${saved ? 'green-button' : ''}`}
                        onClick={() => ((saved ? context.removeRecipe : context.save)(result.id))}>
                          Save{!!saved && 'd'}
                    </button>
                  </div>
                  :
                  <div className='small-margin-top'>
                    <Link className="outline-button grey left-align" to='/login'> Login To Save </Link>
                  </div>
              }
            </div>
          </div>
          <hr />
          <div className="recipeInformation">
              <h3> Ingredients </h3>
              <ul className="usedIngredients"> { ingredients } </ul>
          </div>
          <hr />
          <div className="recipeInstructions">
              <h3> Steps </h3>
              <ol className="recipeSteps"> { instructions }</ol>
          </div>
        </div>
    </div>
    )
}
