import React from 'react';
import RecipeThumbnail from '../RecipeThumbnail/RecipeThumbnail'

export default function RecipeThumbnails(props) {
    return (
        <section id="results">
            <p id="js-error-message" className="error-message"></p>
            <ul id="results-list">
                { props.results.map( (res) => <RecipeThumbnail result={res}/>)}
            </ul>
      </section>
    )
}
