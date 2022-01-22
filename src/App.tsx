import React from 'react';
import {connect, RootStateOrAny,useDispatch } from 'react-redux';
import './App.scss';
import { setCurrent, TimesSeriesItem } from './store';
import WeatherIcon from './components/weatherIcon';
import TempDisplay from './components/temdisplay';
import LocationDate from './components/locationDate';
import ForecastListItem from './components/forecastListItem/forecastListItem';
import HorizontalScroll from 'react-scroll-horizontal';

function App({current, forecast,setCurrent}:RootStateOrAny) {
  
  return (
    <div id="App">
       {
         current.data ? 
         <div id="mainDisplay">
          <WeatherIcon tabIndex={0} icon={current.data.next_1_hours.summary.symbol_code}/>
          <TempDisplay/>
          <LocationDate/>
         </div> : "Loading..."
       }
       {
         forecast.length > 0 &&
         <HorizontalScroll className="forecastDisplay">
         {
           forecast.map((timeSeriesItem:TimesSeriesItem,index:number)=>{
             return <ForecastListItem key={index} item={timeSeriesItem} onClick={()=>setCurrent(timeSeriesItem)}/>
           })
         }
          </HorizontalScroll>
       }
    </div>
  );
}


export default connect((state)=>({...state}),(dispatch)=>{
  return {
    setCurrent:(data:TimesSeriesItem)=>dispatch(setCurrent(data)),
  }
})(App);
