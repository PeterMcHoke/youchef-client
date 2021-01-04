import React from 'react'
import RecipeModal from '../RecipeModal/RecipeModal'

export default function RecipeThumbnail(props) {
    const [isOpen, setOpen] = React.useState(false);
    const close = () => setOpen(false)
    const { result } = props;
    const style = {
        background:`
            linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.9))
            ,url(${result.infoData.image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center'
    }
    return (
        <>
        <li className='recipe-result' key={ result.id } onClick={ ()=> setOpen(true)}>
          <div className='recipe-image modal-trigger' style={ style }>
            <div className="readyInMin">
            <i className="fa fa-clock-o" ariaHidden="true"></i>
            <p className="minutesText">{ result.infoData.readyInMinutes }min</p>
            </div>
            <h3 className="recipe-name">{ result.title }</h3>
            { result.missedIngredientCount ?
                <p className='missing-ingredients'> You're only missing
                <span className='green'> { result.missedIngredientCount } </span>
                ingredient{result.missedIngredientCount > 1 && 's'}</p>
                :
                <p className='missing-ingredients'><span className="green">You have all of the ingredients!</span></p>
            }
          </div>
      </li>
      { isOpen && <RecipeModal close={close} result={ result } /> }
      </>
    )
}
