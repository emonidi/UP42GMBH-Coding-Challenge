import React from "react";
import "./weather-icon.scss"
export interface WeatherIconPropType {
    icon:string;
    tabIndex:number;
}

export default function WeatherIcon(props:WeatherIconPropType) {
    return(
        <div tabIndex={props.tabIndex} className="weather-icon" >
            <img src={`../assets/weather-icons/${props.icon}.svg`} alt={props.icon}/>
        </div>)
}