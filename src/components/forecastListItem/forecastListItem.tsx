import React from "react";
import "./style.scss"
import WeatherIcon  from "../weatherIcon";
import { TimesSeriesItem } from '../../utils';
import moment from "moment";

export interface ForecastListItemPropsType{
    key:number;
    item:TimesSeriesItem;
    onClick:()=>void;
}

const ForecastListItem:React.FC<ForecastListItemPropsType> = (props:ForecastListItemPropsType) => {
  const {item} = props;
  return (
    <div 
      tabIndex={0} 
      className="forecast-list-item" 
      onClick={props.onClick} 
      onKeyDown={(ev)=>{
       ev.key === "Enter" && props.onClick();
      }}
      onFocus={props.onClick}
    >
        <div className="time">
            {moment(item.dt_txt).format("HH:mm")}
        </div>
        <WeatherIcon tabIndex={-1} icon={item.weather[0].icon}/>
        <div className="temperature">
           {Math.round(item.main.temp)}°
        </div>
    </div>
  );
}

export default ForecastListItem;