import React from 'react';
import Lottie from 'react-lottie';
import * as legoData from '../lotties/loading-legos.json';
//import * as loadingDone from '../lotties/loading-done.json';

import FadeIn from 'react-fade-in';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

// const defaultOptions2 = {
//     loop: false,
//     autoplay: true,
//     animationData: loadingDone.default,
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice"
//     }
// };

export default function Loading(props) {
    return (
        <FadeIn>
            <div className="center">
                <h1>Finding your recipes...</h1>
                <Lottie options={defaultOptions} height={120} width={120} />
            </div>
        </FadeIn>
    )
}



