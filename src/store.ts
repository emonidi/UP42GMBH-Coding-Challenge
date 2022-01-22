import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Feature } from 'geojson';
import moment from "moment";


const getWeather = async (lat:number, lon:number) =>{ 
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`)
    const data:Feature = await response.json();
   
    return data;
}

const getLocation = async (city:string) =>{
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZW1vbmlkaSIsImEiOiJjajdqd3pvOHYwaThqMzJxbjYyam1lanI4In0.V_4P8bJqzHxM2W9APpkf1w`)
    const data = await response.json();
    return data;
}

const getLegends = async () =>{
    const response = await fetch(`https://api.met.no/weatherapi/weathericon/2.0/legends`)
    const data = await response.json();
    return data;
}

export interface TimesSeriesItem{
    time:string;
    data:{
        instant:any,
        next_12_hours:any,
        next_6_hours:any,
        next_1_hours:any,
    }
}

const currentReducer = createSlice({
    name: 'current',
    initialState: {} as TimesSeriesItem,
    reducers: {
        set:(state,action) => {
            return  {
                ...action.payload.properties.timeseries.filter((item:TimesSeriesItem) => moment(item.time).isSame(moment(), 'hour'))[0]
            }
        },
        setCurrent(state,action){
            return {...action.payload};
        }
    }
})

export const setCurrent = currentReducer.actions.setCurrent;



const forecastReducer = createSlice({
    name: 'forecast',
    initialState: [],
    reducers: {
        set:(state,action)=>{
            state = action.payload.properties.timeseries.filter((item:TimesSeriesItem) => moment(item.time).isSameOrBefore(moment().add(24, 'hours'))) 
            return state;
        }
    }
})

const location = createSlice({
    name:'location',
    initialState: {},
    reducers: {
        set:(state,action)=>{
            return {...action.payload}
        }
    }
})

const legends = createSlice({
    name:'legends',
    initialState: {},
    reducers: {
        set:(state,action)=>{
          
            return {...action.payload}
        }
    }
})


export const store = configureStore({
    reducer: {
        current:currentReducer.reducer,
        forecast:forecastReducer.reducer,
        location:location.reducer,
        legends:legends.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<any>


export const initState = async () => {
    const weatherLocation = await getLocation('Dallas');
    const locationState = {
        name:weatherLocation.features[0].text,
        lat:weatherLocation.features[0].center[1],
        lon:weatherLocation.features[0].center[0]
    }
    store.dispatch(location.actions.set(locationState));

    const legendsData = await getLegends();
    store.dispatch(legends.actions.set(legendsData));
    
    const weather = await getWeather(locationState.lat, locationState.lon);
    store.dispatch(currentReducer.actions.set(weather))
    store.dispatch(forecastReducer.actions.set(weather))
}

initState();