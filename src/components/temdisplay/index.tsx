import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import "./style.scss";
export interface TempDisplayPropType {
    temp: number;
    condition:string;
    minMax:{
        air_temperature_max:number;
        air_temperature_min:number;
    }
}

function TempDisplay({temp, condition, minMax}:TempDisplayPropType) {
   
  return (
    <div className="temp-display">
        <div className="top">
            <div className="condition" tabIndex={0}>{condition}</div>
            <div className="min-max" tabIndex={0}>{`${minMax.air_temperature_min}°/${minMax.air_temperature_max}°`}</div>
        </div>
        <div className="bottom" tabIndex={0}>
            {temp}°
        </div>
    </div>
  );
}

export default connect((state:RootState)=>{
    const {current,legends} = state;
    return {
        temp:Math.round(current.data.instant.details.air_temperature),
        condition:legends[current.data.next_1_hours.summary.symbol_code.split("_")[0]].desc_en,
        minMax:{
            air_temperature_max:Math.round(current.data.next_6_hours.details.air_temperature_max),
            air_temperature_min:Math.round(current.data.next_6_hours.details.air_temperature_min)
        }
      }
})(TempDisplay);