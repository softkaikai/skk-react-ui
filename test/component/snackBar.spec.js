import React from 'react';
import { SnackBar } from '../../src/snackBar/snackBar';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';


describe('SnackBar', () => {

    it('Is transform correctly', () => {
        let msgRef = React.createRef();
        const wrapper = mount(<SnackBar ref={msgRef}></SnackBar>);
        const testWrapper = wrapper.find('#skk_snack_test_id');
        expect(testWrapper.is('#skk_snack_test_id')).to.be.true;
    })

    it('Is componentDidMount called', () => {
        spy(SnackBar.prototype, 'componentDidMount');
        const wrapper = mount(<SnackBar></SnackBar>);
        expect(SnackBar.prototype.componentDidMount).to.have.property('callCount', 1);
    })


    it('Is props correctly', () => {
        let msgRef = React.createRef();
        const wrapper = mount(<SnackBar ref={msgRef} stayTime={5000}></SnackBar>);
        expect(wrapper.prop('stayTime')).to.equal(5000);
    })

    it('Is render correctly', (done) => {
        let msgRef = React.createRef();
        const wrapper = mount(<SnackBar ref={msgRef}></SnackBar>);
        wrapper.instance().addMsg('123');
        setTimeout(() => {
            expect(wrapper.find('#skk_snack_test_id').text()).to.equal('123');
            done();
        }, 100);

        //
    })
})