import React, { Component } from 'react';
import withCountDown from '../../src/countDown';
import { mount } from 'enzyme';
import { expect } from 'chai';
import PropTypes from 'prop-types';

const positiveInteger = function(props, propName, componentName) {
    if (!/^[+]{0,1}(\d+)$/.test(props[propName]) && props[propName] != null) {
        return new Error(
            'Invalid prop `' +
                propName +
                '` supplied to' +
                ' `' +
                componentName +
                '`. Validation failed.'
        );
    }
};

class CountDownTest extends Component {
    static propTypes = {
        second: positiveInteger,
        minute: positiveInteger,
        hour: positiveInteger,
        day: positiveInteger,
        totalTime: PropTypes.shape({
            second: positiveInteger,
            minute: positiveInteger,
            hour: positiveInteger,
            day: positiveInteger,
        }),
        start: PropTypes.func,
        reset: PropTypes.func,
        pause: PropTypes.func,
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <span id="day">{this.props.day}</span>
                    <span id="hour">{this.props.hour}</span>
                    <span id="minute">{this.props.minute}</span>
                    <span id="second">{this.props.second}</span>
                </div>
                <div>
                    <button
                        id="btn-start"
                        type="button"
                        onClick={this.props.start}
                    >
                        start
                    </button>
                    <button
                        id="btn-reset"
                        type="button"
                        onClick={this.props.reset}
                    >
                        reset
                    </button>
                    <button
                        id="btn-pause"
                        type="button"
                        onClick={this.props.pause}
                    >
                        pause
                    </button>
                </div>
            </div>
        );
    }
}

const CountDownWrapper = withCountDown(CountDownTest);

describe('CoundDown', () => {
    it('Do render correctly by assign prop day, hour, minute, second', () => {
        const wrapper = mount(
            <CountDownWrapper day={1} hour={1} minute={1} second={1} />
        );
        expect(wrapper.find('#day').text()).to.equal('1');
        expect(wrapper.find('#hour').text()).to.equal('1');
        expect(wrapper.find('#minute').text()).to.equal('1');
        expect(wrapper.find('#second').text()).to.equal('1');
    });

    it('Do render correctly by assign prop totalTime', () => {
        const wrapper = mount(
            <CountDownWrapper
                totalTime={{ day: 1, hour: 2, minute: 3, second: 4 }}
            />
        );
        expect(wrapper.find('#day').text()).to.equal('1');
        expect(wrapper.find('#hour').text()).to.equal('2');
        expect(wrapper.find('#minute').text()).to.equal('3');
        expect(wrapper.find('#second').text()).to.equal('4');
    });

    it('Is start method working well', done => {
        const wrapper = mount(
            <CountDownWrapper
                totalTime={{ day: 1, hour: 2, minute: 3, second: 4 }}
            />
        );
        wrapper.find('#btn-start').simulate('click');
        setTimeout(() => {
            expect(wrapper.find('#second').text()).to.not.equal('4');
            done();
        }, 1500);
    });

    it('Is reset method working well', done => {
        const wrapper = mount(
            <CountDownWrapper
                totalTime={{ day: 1, hour: 2, minute: 3, second: 4 }}
            />
        );
        wrapper.find('#btn-start').simulate('click');
        setTimeout(() => {
            wrapper.find('#btn-reset').simulate('click');
            expect(wrapper.find('#second').text()).to.equal('4');
            done();
        }, 1500);
    });

    it('Is pause method working well', done => {
        const wrapper = mount(
            <CountDownWrapper
                totalTime={{ day: 1, hour: 2, minute: 3, second: 4 }}
            />
        );
        wrapper.find('#btn-start').simulate('click');
        wrapper.find('#btn-pause').simulate('click');
        setTimeout(() => {
            expect(wrapper.find('#second').text()).to.equal('4');
            done();
        }, 1500);
    });
});
