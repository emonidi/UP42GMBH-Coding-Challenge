import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import ErrorBoundary from ".";
import { LoadStatus } from "../../store";

describe('<ErrorBoundary/>', () => { let wrapper:ShallowWrapper;
    beforeEach(()=>{
        const props = {
            status:LoadStatus.STATE_LOADING,
            children: <div id="test">Test</div>
        }
        wrapper = shallow(<ErrorBoundary {...props} />);
    })

   describe('when status is STATE_LOADING', () => {
    it('should render the component',()=>{
        expect(wrapper.length).toBe(1);
    })

    it('should render Preloader',()=>{
        expect(wrapper.find('Preloader').length).toBe(1);
    })
   })    

   describe('when status is STATE_LOADED', () => {
       beforeEach(() =>{
           wrapper.setProps({...wrapper.props(), status:LoadStatus.STATE_LOADED}).update()
       })

       it('should render the children',()=>{
           expect(wrapper.find('div#test').length).toBe(1);
       })
   });

   describe('when status is STATE_ERROR', () => {
         beforeEach(() =>{
              wrapper.setProps({...wrapper.props(), status:LoadStatus.STATE_ERROR}).update()
         })
    
         it('should render the error message',()=>{
              expect(wrapper.find('div.bar.error').length).toBe(1);
         })
   })
})