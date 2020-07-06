import React from 'react';
import moment from 'moment';

import '../CSS/countDown.css';

export default class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate } = this.props;
            const then = moment(timeTillDate);
            // console.log("then", then.format("D HH mm"))
            const now = moment();
            // console.log("then", now.format("D HH mm")) 
            const countdown = moment(then - now);
            // a.diff(b, 'days')
            // console.log(then.diff(now,'hours'))
            // console.log("then", countdown.format("D HH mm")) 
            const days = then.diff(now, 'days');
            const hours = then.diff(now, 'hours') % 24;
            const minutes = then.diff(now, 'minutes') % 60;
            const seconds = countdown.format('ss');
            // console.log("cd", days , hours , minutes , seconds , "CD" , countdown);
            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;
        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        return (
            <div>
                <h1 style={{ fontFamily: "Calistoga , cursive" }}>Countdown</h1>
                <div className='countdown-wrapper'>
                    {days !== 0 && (
                        <div className='countdown-item'>
                            <SVGCircle radius={daysRadius} />
                            {days}
                            <span>days</span>
                        </div>
                    )}
                    {hours !== 0 && (
                        <div className='countdown-item'>
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {minutes !== 0 && (
                        <div className='countdown-item'>
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds !== 0 && (
                        <div className='countdown-item'>
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke-width="4" stroke="#333" d={describeArc(50, 50, 48, 0, radius)} />
    </svg>
);

// ReactDOM.render(
//     <Countdown
//         match_time = "2019-26-5T15:50:00+05:30"
//     //  moment.tz('2019-11-28T15:50:00+00:00',"Asia/Kolkata").format();
//     // "2019-11-28T21:20:00+05:30"
//     // moment.tz('2019-11-28T19:50:00+00:00',"Asia/Kolkata").format("MM DD YYYY, h:mm a")
//         timeTillDate="05 26 2019, 6:00 am"
//         timeFormat="MM DD YYYY, h:mm a"
//     />,
//     document.getElementById('count')
// );

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}