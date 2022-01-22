import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import "./style.scss";

export interface LocationDatePropsType{ 
    cityName:string;
    dayOfWeek:string;
    dayOfMonth:string;
    month:string;
}

const LocationDate = ({cityName,dayOfWeek, dayOfMonth, month}:LocationDatePropsType)=>{

    return(
        <div className="location-date">
            <div className="location"  tabIndex={0}>
                {cityName}
            </div>
            <div className="date" tabIndex={0}>
                {dayOfWeek}
                <br/>
                {dayOfMonth}. {month}
            </div>
        </div>
    )
}


export default connect((state:RootState)=>{
    const {location,current} = state;
    return {
        cityName:location.name,
        dayOfWeek:moment(current.time).format("dddd"),
        dayOfMonth:moment(current.time).format("DD"),
        month:moment(current.time).format("MMMM")
    }
})(LocationDate);