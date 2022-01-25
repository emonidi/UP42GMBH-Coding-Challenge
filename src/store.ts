import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TimesSeriesItem, timeSeriesItemToCelsius } from './utils';
import moment from "moment";



const getWeather = async (locationString:string) =>{ 
    const response = await fetch(`/api/data/2.5/forecast?q=${locationString}&appid=b6907d289e10d714a6e88b30761fae22`)
    const data = await response.json();
    return data;
}



const currentReducer = createSlice({
    name: 'current',
    initialState: {} as TimesSeriesItem,
    reducers: {
        set:(state,action) => {
           
            return  {
                ...action.payload.list[0]
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
            state = action.payload.list.filter((item:TimesSeriesItem) => moment(item.dt_txt).isSameOrBefore(moment().add(24, 'hours'))) 
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

export const store = configureStore({
    reducer: {
        current:currentReducer.reducer,
        forecast:forecastReducer.reducer,
        location:location.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<any>


export const initState = async () => {
    let weather = await getWeather("munich,de");
    //for some reason the great api although it doesn't support CORS it return 404 when i request &units=metric
    weather.list = weather.list.map(timeSeriesItemToCelsius); 
    store.dispatch(currentReducer.actions.set(weather))
    store.dispatch(forecastReducer.actions.set(weather))

    const locationState = {
        name:weather.city.name,
        ...weather.city.coord
    }
    store.dispatch(location.actions.set(locationState));
}

initState();