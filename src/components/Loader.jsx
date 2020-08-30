import React from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "../lottiefiles.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

export default class Loading extends React.Component {
    render() {
        return (
            <div>
                <FadeIn>
                    <div className="d-flex justify-content-center align-items-center">
                        <div style={{ "marginTop": 200 }}>
                            <Lottie options={defaultOptions} height={200} width={200} />
                        </div>
                    </div>
                </FadeIn>
            </div>
        )
    }
}