import React from "react";

const Icon = props => (
    <div>
        { 	
            props.icon &&
           <img width="220px" height="220px" src={'http://openweathermap.org/img/w/'+`${props.icon}`+'.png'} alt="weater-icon"/>
        }
    </div>
);

export default Icon;