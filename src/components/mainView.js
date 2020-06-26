import React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

// import { internal_data } from './internal_data';
import Heading from './Heading';
import Countdown from './countdown';
import Loading from './Loader';

import { Divider, Grid, Image, Segment } from 'semantic-ui-react';

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_fixture: null,
            home_Coach: null,
            away_Coach: null
        }
    }


    t_convert(params) {
        console.log("conversion", moment.tz(params, "Asia/Kolkata").format("MM DD YYYY, h:mm a"));
        return moment.tz(params, "Asia/Kolkata").format("MM DD YYYY, h:mm a");
    }

    async logging() {
        // const short = internal_data;
        // // console.log(data);

        // // const short = data.data.api.fixtures;
        // for (let i = 415; i < short.length; i++) {
        //     const m_date = short[i].event_date.split('T')[0];
        //     if (moment(m_date).isSameOrAfter(moment().format("YYYY-MM-DD"))) {
        //         console.log(short[i]);

        //         this.setState({
        //             current_fixture: short[i],
        //             home_Coach: "Home Coach",
        //             away_Coach: "Away Coach"
        //         });
        //         return;
        //     }
        // }
        // return;


        const data = await axios.get("https://api-football-v1.p.rapidapi.com/v2/fixtures/team/33", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
            }
        })
        const short = data.data.api.fixtures;
        for (let i = 415; i < short.length; i++) {
            const m_date = short[i].event_date.split('T')[0];
            // console.log((moment().format("YYYY-MM-DD")).isSameOrBefore(moment(m_date)));

            if (moment(m_date).isSameOrAfter(moment().format("YYYY-MM-DD"))) {
                let home_Coach = await axios.get(`https://api-football-v1.p.rapidapi.com/v2/coachs/team/${short[i].homeTeam.team_id}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                        "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
                    }
                })
                let away_Coach = await axios.get(`https://api-football-v1.p.rapidapi.com/v2/coachs/team/${short[i].awayTeam.team_id}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                        "x-rapidapi-key": "87b140eb05msh461aa1d79520e3ep12982ejsnbdaf7d3dac51"
                    }
                })
                home_Coach = home_Coach.data.api.coachs[0].firstname + home_Coach.data.api.coachs[0].lastname
                away_Coach = away_Coach.data.api.coachs[0].firstname + away_Coach.data.api.coachs[0].lastname
                this.setState({ current_fixture: short[i], home_Coach: home_Coach, away_Coach: away_Coach });
                return;
            }
        }
        return;
    }

    render() {
        return (
            <div>
                {this.state.current_fixture ?

                    <div style={{ "position": "absolute" }}>

                        <Heading league={this.state.current_fixture.league.name} />
                        <Segment style={{ "margin": "10px", "marginLeft": "100px", "backgroundColor": "transparent" }} size={'massive'}>

                            <Grid columns={2}>
                                <Grid.Column>
                                    <Image src={this.state.current_fixture.homeTeam.logo}
                                        alt="Home-Team"
                                        className="ui centered small image" />
                                    <p className="center_it">
                                        {this.state.current_fixture.homeTeam.team_name}
                                    </p>
                                    <p className="center_it">
                                        Coach : {this.state.home_Coach}
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src={this.state.current_fixture.awayTeam.logo}
                                        alt="Away-Team"
                                        className="ui centered small image" />
                                    <p className="center_it">
                                        {this.state.current_fixture.awayTeam.team_name}
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

                        <p className="center_it">
                            Venue : {this.state.current_fixture.venue}
                        </p>
                        <br />
                        <br />
                        <Countdown timeTillDate={this.t_convert(this.state.current_fixture.event_date)} />
                    </div>
                    :
                    <div>
                        <Loading />
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        this.logging();

    }
}

export default MainView;