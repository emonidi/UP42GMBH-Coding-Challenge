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
    const {current} = state;
    return {
        temp:Math.round(current.main.temp),
        condition:current.weather[0].main,
        minMax:{
            air_temperature_max:Math.round(current.main.temp_max),
            air_temperature_min:Math.round(current.main.temp_min)
        }
      }
})(TempDisplay);