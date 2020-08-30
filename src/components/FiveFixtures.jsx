import React from 'react';

import { Image } from 'semantic-ui-react';

class FiveFixtures extends React.Component {
    state = {
        fixtures: this.props.nextFiveMatches
    }
    render() {
        const { fixtures } = this.state;
        return (
            <div>
                {fixtures &&
                    <div>
                        <p style={{ fontFamily: "Calistoga , cursive", textAlign: "center" }}>Next Fixtures</p>
                        {fixtures.map(element => {
                            return (
                                <div className="ui centered cards">
                                    <div className="card" style={{ width: "24rem" }}>
                                        <div className="card-body">
                                            <Image src={element.homeTeam.logo}
                                                alt="Home-Team"
                                                avatar
                                                floated="left" />
                                            <span>
                                                {element.homeTeam.team_name} vs {element.awayTeam.team_name}  </span>
                                            <Image src={element.awayTeam.logo}
                                                alt="Away-Team"
                                                avatar
                                                floated="right" />
                                            <p style={{ textAlign: "center" }}>{element.league.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div >
                }
            </div >
        )
    }
}

export default FiveFixtures;