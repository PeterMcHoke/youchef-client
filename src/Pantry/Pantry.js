import React from 'react';
import Context from '../Context'
import RecipeThumbnails from '../RecipeThumbnails/RecipeThumbnails'
import * as API from '../apiCalls'
import styled from 'styled-components';


const PantryWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: auto;
    padding: 1em 1em 0em 1em;
    margin-top: 1em;
    text-align: center;
    border-radius: 1em;

    h1 {
        font-size: 1.5em;
        color: ${({ theme }) => theme.primaryDark};
        padding: 0.5em;
    }

`;

class Pantry extends React.Component {
    static contextType = Context;

    state = {
        error: null,
        ingredients: [],
        results: [],
        ingredientInput: '',
        logoInfo: {
          display: true,
          currOpacity: 10
        }
    }

    addIngredientToPantry = (newIngredientName) => {
        this.setState( {
            ingredients: [...this.state.ingredients, { name: newIngredientName }]
        })
    }

    deleteIngredient = (ingredientIndex) => {
        this.setState({
            ingredients: this.state.ingredients.filter((_, idx) => idx !== ingredientIndex)
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onKeyPressed = (e) => {
        const TAB_CODE = 9;
        const ENTER_CODE = 13;
        const { keyCode } = e;
        const currIngredient = this.state.ingredientInput;

        if (keyCode === TAB_CODE || keyCode === ENTER_CODE) {
            e.preventDefault();
            if (currIngredient === '') {
              return
            }
            this.addIngredientToPantry(currIngredient)
            //clear the input bar and show the pantry
            this.setState({ ingredientInput: '' })
        }
    }


      isAnimating = () => {
        const { display, currOpacity } = this.state.logoInfo;
        return (!display && currOpacity > 0) || (display && currOpacity < 10);
      }

      toggle = () => {
        const { logoInfo } = this.state;

        this.setState({
          logoInfo: {
            ...logoInfo,
            display: !logoInfo.display
          }
        })
      }

      componentDidUpdate() {
        const { display, currOpacity } = this.state.logoInfo;
        if (this.isAnimating()) {
          setTimeout(() => {
            this.setState({
              logoInfo: {
                display,
                currOpacity: currOpacity + (display ? 1 : -1)
              }
            })
        }, 30);
        }
      }



    handleSubmit = (e) => {
        e.preventDefault();
        this.toggle();
        API.fetchRecipes(this.state.ingredients.map(i => i.name))
        .then( results => {
            this.setState({ results })
        })
        .catch(err => alert(err.message))
    }

    render() {
        const { logoInfo } = this.state;
        return (
            <>


                    <PantryWrapper className="pantry">
                    { !logoInfo.display &&
                        <i className="fa fa-angle-double-up fa-2x toggle-icon" disabled={this.isAnimating()} onClick={this.toggle}></i>
                    }
                    { logoInfo.display &&
                        <div style={{opacity: logoInfo.currOpacity/10}}>
                            <h1>What{"'"}s in your fridge?</h1>
                            <sub>After each ingredient, press enter</sub>
                            <form action="GET" id='ingredientForm' autoComplete="off">
                                <label htmlFor="ingredientInput"></label>
                                <input type='text' name='ingredientInput' id='ingredientInput' tabIndex="0" onKeyDown={this.onKeyPressed} value={this.state.ingredientInput} onChange={this.onInputChange} required />
                            </form>
                        </div>
                    }
                    </PantryWrapper>
                { logoInfo.display &&
                <section className = "ingredientListContainer" style={{opacity: logoInfo.currOpacity/10}}>
                    { !!this.state.ingredients.length &&
                        <>
                            <h3 className="listHeader">Your Food</h3>
                            <ul id="currentIngredientList">
                                { this.state.ingredients.map( (ingredient, idx) =>
                                     <li className='listItem' key={ idx }> {ingredient.name}
                                        <i className="fa fa-times" onClick={() => this.deleteIngredient(idx)}></i>
                                     </li>
                                )}
                            </ul>
                            <button type="button" className="searchButton button autofocus" onClick={this.handleSubmit}> Find Recipes </button>
                            { !!this.state.results.length &&
                                <>
                                <br />
                                <i className="fa fa-angle-double-down fa-2x" disabled={this.isAnimating()} onClick={this.toggle}></i>
                                </>
                            }
                            <div id="searchError"></div>
                        </>
                        }
                 </section>
                }
                <section>

                    { !!this.state.results.length &&
                        <>
                            <h2 className="center">Your Menu</h2>
                            <RecipeThumbnails results={ this.state.results }/>
                        </>
                    }
                </section>
            </>
        )
    }
}

export default Pantry;
