import React from 'react';
import { Slider }  from '../../src/slider/slider';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('Slider', () => {

    it('set min and max prop', () => {
        const wrapper = mount(<Slider min={100} max={300}></Slider>);
        expect(wrapper.props().min).to.equal(100);
        expect(wrapper.props().max).to.equal(300);
    })

    it('trigger change callback', () => {
        const callback = spy();
        const wrapper = mount(<Slider sliderMoveEnd={callback}></Slider>);
        wrapper.simulate('click');

        expect(callback.called).to.be.true;
    })

    it('has 3 span node', () => {
        const wrapper = mount(<Slider min={100} max={300}></Slider>);
        expect(wrapper.find('span')).to.have.lengthOf(3);
    })

    it('render node correctly', () => {
        const wrapper = mount(<Slider></Slider>);
        expect(wrapper.equals(<Slider></Slider>)).to.be.true;
    })

    it('set state.x to 10 and min to 10, the result is 20', () => {
        const wrapper = mount(<Slider min={10}></Slider>);
        expect(wrapper.setState({x: 10}).find('span').last().text()).to.equal('20');
    })
})
