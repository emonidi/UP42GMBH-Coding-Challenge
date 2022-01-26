import * as Store from './store';
const mock = JSON.stringify({
    city: {
        name: "Munich",
        coord: { lat: 48.1351, lon: 11.5756 }
    },
    list:[
        {
            main:{
                temp:273.15,
                temp_min:273.15,
                temp_max:273.15
            }
        }
    ]
})

describe("Store", () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(JSON.parse(mock)),
        }as any)
      });
      
      afterEach(() => {
        jest.restoreAllMocks();
      });
    it("should test getWeather",async ()=>{
        expect(Store.getWeather).toBeDefined();
        console.log(await Store.getWeather('blah'))
        return expect(Store.getWeather('blah')).resolves.not.toBeNull();
    })

    it("should call the dispatches in init function",async()=>{
        const store = Store.store;
        const dispatch = jest.spyOn(store, 'dispatch');
        await(Store.initState());
        expect(dispatch).toHaveBeenCalledTimes(4);
    })

    it("should transform temperatures",async ()=>{
        const store = Store.store;
        await(Store.initState());
        expect(store.getState().current.main.temp).toBe(0);
        expect(store.getState().current.main.temp_max).toBe(0);
        expect(store.getState().current.main.temp_min).toBe(0);
    })
});