import React from 'react';
import {TestApp} from './App';
import {RootStateOrAny } from 'react-redux';
import {shallow, ShallowWrapper } from 'enzyme';

describe('<App/>', () => {
  let wrapper:ShallowWrapper;
  let props:RootStateOrAny;
  beforeEach(()=>{
    props = {
      ui:{
        status:'STATE_LOADED'
      },
      current:{
        weather:[{
          icon:'01d'
        }],
        location:{
          name:'London',
        },
        dt_txt:"2017-02-16 12:00:00"
      },
      forecast:[{
        "dt": 1487246400,
        "main": {
          "temp": 286.67,
          "temp_min": 281.556,
          "temp_max": 286.67,
          "pressure": 972.73,
          "sea_level": 1046.46,
          "grnd_level": 972.73,
          "humidity": 75,
          "temp_kf": 5.11
        },
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": {
          "all": 0
        },
        "wind": {
          "speed": 1.81,
          "deg": 247.501
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": "2017-02-16 12:00:00"
      }]
    }
    wrapper = shallow(<TestApp {...props} />);
  })

  it('should render App', () => {
    expect(wrapper.length).toBe(1);
  })

  it("should show the ErrorBoundary",()=>{
    expect(wrapper.find('ErrorBoundary').length).toBe(1);
  })

  it("should render infoWrapper",()=>{
    expect(wrapper.find('.info-wrapper').length).toBe(1);
  })

  it("should render TempDisplay",()=>{
    expect(wrapper.find('Connect(TempDisplay)').length).toBe(1);
  })

  it("should render LocationDate",()=>{
    expect(wrapper.find('Connect(LocationDate)').length).toBe(1);
  })

  it("should show the forecast icon",()=>{
    const weatherIcon = wrapper.find('WeatherIcon').get(0);
    expect(weatherIcon).toBeDefined();    
  })

  it('should render the forecastDisplay',()=>{
    expect(wrapper.find('#forecastDisplay').length).toBe(1);
  })

  it('should render the forecastListItem',()=>{
    expect(wrapper.find('ForecastListItem').length).toBe(1);
  })

  it('should call setCurrent prop function on item click',()=>{
    const mockTrigger = jest.fn();
    wrapper.setProps({ ...wrapper.props(), setCurrent:mockTrigger}).update();
    wrapper.find('ForecastListItem').simulate('click');
    expect(mockTrigger).toHaveBeenCalled();
  })

  it('should create ref',()=>{
    const refSpy = jest.spyOn(React,'useRef');
    shallow(<TestApp {...props} />);
    expect(refSpy).toHaveBeenCalled();
  })

  it('should call onWheel prop function on wheel',()=>{
    const scrollToMockFn = jest.fn()
    const refSpy = jest.spyOn(React,'useRef').mockReturnValue({current:{scrollLeft:0,scrollTo:scrollToMockFn}});
    const onWheelSpy = jest.spyOn(React,'useCallback');
    const wrapper = shallow(<TestApp {...props} />);
    wrapper.find('#forecastDisplay').simulate('wheel',{deltaY:1});
    expect(onWheelSpy).toHaveBeenCalled();
    expect(refSpy).toHaveBeenCalled();
    expect(scrollToMockFn).toHaveBeenCalled();
  })

})