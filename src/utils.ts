
export const toCelsius = (kelvin:number) => kelvin - 273.15;

export interface TimesSeriesItem{
    dt:number;
    main: any;
    weather: any;
    clouds: any;
    wind: any;
    sys: any;
    dt_txt: string;
}

export const timeSeriesItemToCelsius = (item:TimesSeriesItem) => {
    item.main.temp = toCelsius(item.main.temp);
    item.main.temp_max = toCelsius(item.main.temp_max);
    item.main.temp_min = toCelsius(item.main.temp_min);

    return item;
}