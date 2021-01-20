import React from 'react';
import Context from '../Context.js'
import { Link } from 'react-router-dom';



export default function RecipeModal(props) {
    const handleKeyUp = (e) => {
      console.log('Keydown is firing')
      e.preventDefault();
      if (e.keyCode === 27) {
        console.log('e.keyCode:', e.keyCode)
        props.close()
        window.removeEventListener('keyup', handleKeyUp, false);
      }
    }

    React.useEffect(
       () => {
          document.body.style['overflow-y'] = 'hidden';
          window.addEventListener('keyup', handleKeyUp, false);
         return () => document.body.style['overflow-y'] = 'auto';
    });

    const context = React.useContext(Context)
    const { result } = props;
    const saved = context.savedIDs.indexOf(result.id) >= 0;

    const handleSaveClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (saved)
        context.removeRecipe(result.id);
      else
        context.save(result.id)
    }

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      props.close();
    }

    //Close Modal when ESC
    
    
    const instructions = !!result.analyzedInstructions.length ?

    result.analyzedInstructions[0].steps.map((_, idx) =>
        <li className="recipeInstruction" key={idx}><strong> { idx+1 }.</strong>  {result.analyzedInstructions[0].steps[idx].step} </li>
    )
    //take away the button tag and make a button class
    : <a href= {result.sourceUrl} target="_blank" rel="noreferrer"><button>See at {result.sourceName ? result.sourceName : `original site`}</button></a>

    const ingredients = result.extendedIngredients.map((ingredient, idx) =>
    <li className="usedIngredient" key={idx}><strong>{ingredient.amount} {ingredient.unit}</strong><span className='ingredientName'> {ingredient.name}</span></li>
)
        return (
        <div className="flex align-center align-vert modal modal--align modal--show" id="modal" onClick={(e) => handleClick(e)}>
        <div className="modal__container">
          <i className="modal__close modal__close--x" onClick={props.close}>✕</i>
          <div className="topHalf">
            <div className="recipeImage"><img src={result.image} alt="Bacon-Wrapped" blue="" cheese="" stuffed="" dates=""/></div>
            <div className="recipeHeader">
              <div className="recipeTitle"><h3>{result.title}</h3></div>
              <div className="recipeTime"><i className="fa fa-clock-o"></i><p className="minutesText">{result.readyInMinutes}min</p></div>
              <p className="servingSize"></p>
              { context.isLoggedIn() ?
                  <div className="small-margin-top">
                    <button
                        className= {`outline-button left-align ${saved ? 'green-button' : ''}`}
                        onClick={ e => handleSaveClick(e) }>
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
