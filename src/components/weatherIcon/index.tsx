import React from "react";
import "./weather-icon.scss"
export interface WeatherIconPropType {
    icon:string;
    tabIndex:number;
    className?:string | null;
}

export default function WeatherIcon(props:WeatherIconPropType) {
    return(
        <div tabIndex={props.tabIndex} className={`weather-icon ${props.className ? props.className : ""}`} >
            <img src={`../assets/weather-icons/${props.icon}.svg`} alt={props.icon}/>
        </div>)
}