import React from 'react';

import MainView from './mainView';

class Groundimage extends React.Component {
    render() {
        return (
            <div style={{
                "display": "block",
                "height": "auto",
                "width": "100%"
            }}>
                {/* <img
                    src="/images/Old_trafford.jpg" style={{ "width": "100%" }} > */}
                <MainView />
                {/* </img> */}

            </div>
        );
    }

}

export default Groundimage;
