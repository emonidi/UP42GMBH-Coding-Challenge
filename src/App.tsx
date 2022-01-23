import React, { useCallback, useRef } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import './App.scss';
import { setCurrent, TimesSeriesItem } from './store';
import WeatherIcon from './components/weatherIcon';
import TempDisplay from './components/temdisplay';
import LocationDate from './components/locationDate';
import ForecastListItem from './components/forecastListItem/forecastListItem';


function App({ current, forecast, setCurrent }: RootStateOrAny) {

  const fdRef = useRef<HTMLDivElement>(null);
  const onWheel = useCallback((event) => {
    const containerScrollPosition: number = fdRef.current?.scrollLeft || 0;
    fdRef.current?.scrollTo({
      top: 0,
      left:containerScrollPosition + event.deltaY*6, 
      behavior: 'smooth'
    });
    console.log(fdRef.current?.scrollLeft);
  }, [])
  return (
    <div id="App">
      {
        current.data ?
          <div id="mainDisplay">
            <WeatherIcon tabIndex={0} icon={current.data.next_1_hours.summary.symbol_code} />
            <TempDisplay />
            <LocationDate />
          </div> : "Loading..."
      }
      {
        forecast.length > 0 &&
        <div ref={fdRef} id="forecastDisplay" onWheel={onWheel}>
          {
            forecast.map((timeSeriesItem: TimesSeriesItem, index: number) => {
              return <ForecastListItem
                key={index}
                item={timeSeriesItem}
                onClick={() => setCurrent(timeSeriesItem)}
              />
            })
          }
        </div>
      }
    </div>
  );
}


export default connect((state) => ({ ...state }), (dispatch) => {
  return {
    setCurrent: (data: TimesSeriesItem) => dispatch(setCurrent(data)),
  }
})(App);
