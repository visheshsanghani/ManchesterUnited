import React from 'react';
import axios from 'axios';

import NextFixture from './NextFixture';
import FiveFixtures from './FiveFixtures';
import Loading from './Loader';

class ScreenDivider extends React.Component {
    state = {
        currentMatch: null,
        nextFiveMatches: null
    }

    async componentDidMount() {
        const data = await axios.get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/33/next/6", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
            }
        })
        this.setState({
            currentMatch: data.data.api.fixtures[0],
            nextFiveMatches: data.data.api.fixtures.splice(1)
        });
    }
    render() {
        const { width } = this.props;
        const isMobile = width <= 500;
        const { currentMatch, nextFiveMatches } = this.state;
        if (currentMatch && nextFiveMatches) {
            if (isMobile) {
                return (
                    <div style={{ fontFamily: "Calistoga , cursive" }}>
                        <div className="center_it" style={{ paddingTop: 10 }}>
                            Manchester United Fixtures
                        </div>
                        <div>
                            <div>
                                <NextFixture isMobile={isMobile} currentMatch={currentMatch} />
                            </div>
                            <div style={{
                                width: "24rem", position: "relative", display: "block", alignItems: "center"
                            }} >
                                <FiveFixtures isMobile={isMobile} nextFiveMatches={nextFiveMatches} />
                            </div>
                        </div>
                    </div >
                )
            } else {
                return (
                    <div style={{ fontFamily: "Calistoga , cursive" }}>
                        <div className="center_it" style={{ paddingTop: 10 }}>
                            Manchester United Fixtures
                    </div>
                        <div className="row">
                            <div className="col - 4">
                                <FiveFixtures isMobile={isMobile} nextFiveMatches={nextFiveMatches} />
                            </div>
                            <div className="col-8">
                                <NextFixture isMobile={isMobile} currentMatch={currentMatch} />
                            </div>
                        </div>
                        <a class="twitter-timeline" data-width="100" data-height="100" data-theme="dark" href="https://twitter.com/ManUtd?ref_src=twsrc%5Etfw">Tweets by ManUtd</a>
                    </div>)
            }
        }
        else {
            return (
                <Loading />
            )
        }

    }
}

export default ScreenDivider;
