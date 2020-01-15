import React from 'react';

function Heading(props){
    return(
        <div style = {{"padding" : "15px 25px 5px 25px"}} className = "center_it"> 
            Manchester United Fixtures <br/><br/>
            {props.league}
        </div>
    );
}

export default Heading;