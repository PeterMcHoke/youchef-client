import React from 'react';
import RecipeThumbnail from '../RecipeThumbnail/RecipeThumbnail'

export default function RecipeThumbnails(props) {
    return (
        <div id="results">
            <p id="js-error-message" className="error-message"></p>
            <ul id="results-list">
                { props.results.map( (res, idx) => <RecipeThumbnail result={res} key={idx}/>)}
            </ul>
      </div>
    )
}
