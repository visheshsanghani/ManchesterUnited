import React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Heading from './Heading';
import Countdown from './countdown';
import Loading from './Loader';

import { Divider, Grid, Image, Segment } from 'semantic-ui-react';

class NextFixture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_fixture: this.props.currentMatch,
            home_Coach: null,
            away_Coach: null
        }
    }


    t_convert(params) {
        return moment.tz(params, "Asia/Kolkata").format("MM DD YYYY, h:mm a");
    }

    async logging() {
        const { current_fixture } = this.state;
        let home_Coach = await axios.get(`https://api-football-v1.p.rapidapi.com/v2/coachs/team/${current_fixture.homeTeam.team_id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
            }
        })
        let away_Coach = await axios.get(`https://api-football-v1.p.rapidapi.com/v2/coachs/team/${current_fixture.awayTeam.team_id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
            }
        })
        if (home_Coach.data.api.coachs[0] && away_Coach.data.api.coachs[0]) {
            home_Coach = home_Coach.data.api.coachs[0].firstname + home_Coach.data.api.coachs[0].lastname
            away_Coach = away_Coach.data.api.coachs[0].firstname + away_Coach.data.api.coachs[0].lastname
            this.setState({ home_Coach, away_Coach });
        }
        return;
    }

    componentDidMount() {
        this.logging();

    }

    render() {
        const { isMobile } = this.props;
        const { current_fixture } = this.state;
        console.log('current_fixture: ', current_fixture);
        const { homeTeam } = this.state.current_fixture;
        const { awayTeam } = this.state.current_fixture;
        return (
            <div>
                {this.state.current_fixture ?
                    <div style={isMobile ? { "position": "relative", display: "block", alignItems: "center" } : { "position": "relative", marginLeft: 100, alignItems: "center" }}>
                        <Heading league={current_fixture.league.name} />
                        <Segment style={{ "margin": "10px", "backgroundColor": "transparent" }} size={'massive'}>

                            <Grid columns={2}>
                                <Grid.Column>
                                    <Image src={homeTeam.logo}
                                        alt="Home-Team"
                                        className="ui centered small image" />
                                    <p className="center_it">
                                        {homeTeam.team_name}
                                    </p>
                                    <p className="center_it">
                                        Coach : {this.state.home_Coach}
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src={awayTeam.logo}
                                        alt="Away-Team"
                                        className="ui centered small image" />
                                    <p className="center_it">
                                        {awayTeam.team_name}
                                    </p>
                                    <p className="center_it">
                                        Coach : {this.state.away_Coach}
                                    </p>
                                </Grid.Column>
                            </Grid>

                            <Divider vertical>
                                VS
                            </Divider>
                        </Segment>

                        <div className="center_it">
                            <p>Venue : {current_fixture.venue}</p>
                            <p>Referee : {current_fixture.referee ? current_fixture.referee : "Yet to decide"}</p>
                        </div>
                        <br />
                        <Countdown timeTillDate={this.t_convert(current_fixture.event_date)} />
                    </div>
                    :
                    <div>
                        <Loading />
                    </div>
                }
            </div>
        )
    }


}

export default NextFixture;