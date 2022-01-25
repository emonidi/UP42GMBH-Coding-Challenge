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
            <img src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`} alt={props.icon}/>
        </div>)
}