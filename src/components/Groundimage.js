import React from 'react';
import MainView from './mainView';
import Fixtures from './Fixtures';

class Groundimage extends React.Component {
    render() {
        return (
            <div style={{ fontFamily: "Calistoga , cursive" }}>
                <div className="center_it" style={{ marginTop: 30 }}>
                    Manchester United Fixtures <br /><br />
                </div>
                <div className="row">
                    <div className="col - 4">
                        <Fixtures />
                    </div>
                    <div className="col-8">
                        <MainView />
                    </div>
                </div>
            </div>
        );
    }

}

export default Groundimage;
