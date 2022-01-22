import React from "react";
import "./style.scss"
import WeatherIcon  from "../weatherIcon";
import { TimesSeriesItem } from '../../store';
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
            {moment(item.time).format("HH:mm")}
        </div>
        <WeatherIcon tabIndex={-1} icon={item.data.next_1_hours.summary.symbol_code}/>
        <div className="temperature">
           {Math.round(item.data.instant.details.air_temperature)}°
        </div>
    </div>
  );
}

export default ForecastListItem;