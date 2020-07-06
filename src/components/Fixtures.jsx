import React from 'react';
import axios from 'axios';

import { Image } from 'semantic-ui-react';

class Fixtures extends React.Component {
    state = {
        fixtures: []
    }
    async componentDidMount() {
        const data = await axios.get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/33/next/5", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
            }
        })
        this.setState({ fixtures: data.data.api.fixtures.slice(1) });
    }
    render() {
        const { fixtures } = this.state;
        return (
            <div>
                {fixtures &&
                    <div>
                        <p style={{ fontFamily: "Calistoga , cursive" , textAlign : "center" }}>Next Fixtures</p>
                        {fixtures.map(element => {
                            return (
                                <div className="card" style={{ width: "24rem", marginLeft: 10 }}>
                                    <div className="card-body">
                                        <Image src={element.homeTeam.logo}
                                            alt="Home-Team"
                                            avatar />
                                        <span>
                                            {element.homeTeam.team_name} vs {element.awayTeam.team_name}  </span>
                                        <Image src={element.awayTeam.logo}
                                            alt="Away-Team"
                                            avatar />
                                        <p style={{ textAlign: "center" }}>{element.league.name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default Fixtures;