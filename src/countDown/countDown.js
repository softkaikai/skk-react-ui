import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function withCountDown (CountDown) {

    const positiveInteger = function(props, propName, componentName) {
        if (!/^[+]{0,1}(\d+)$/.test(props[propName]) && props[propName] != null) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    }

    return class CountDownWrapper extends Component{
        static defaultProps = {
            second: 0,
            minute: 0,
            hour: 0,
            day: 0
        };
        static propTypes = {
            second: positiveInteger,
            minute: positiveInteger,
            hour: positiveInteger,
            day: positiveInteger,
            totalTime: PropTypes.shape({
                second: positiveInteger,
                minute: positiveInteger,
                hour: positiveInteger,
                day: positiveInteger
            })
        };

        constructor(props) {
            super(props);
            this.backupTime = {
                second: 0,
                minute: 0,
                hour: 0,
                day: 0
            };
            this.timer = null;
            this.state = {
                totalSeconds: 0,
                second: 0,
                minute: 0,
                hour: 0,
                day: 0
            }

        }

        componentDidMount() {
            this._initCountDownTime();
        }

        _initCountDownTime() {
            if (this.props.totalTime) {
                this.backupTime = Object.assign(this.props.totalTime);

            } else {
                this.backupTime = {
                    second: this.props.second,
                    minute: this.props.minute,
                    hour: this.props.hour,
                    day: this.props.day
                }
            }
            this.setState(this.backupTime);
            this.setState({
                totalSeconds: this._getTotalSecond()
            })
        }

        _getTotalSecond() {
            let totalSeconds = 0;
            if (this.backupTime.second > 0) totalSeconds += this.backupTime.second;
            if (this.backupTime.minute > 0) totalSeconds += this.backupTime.minute * 60;
            if (this.backupTime.hour > 0) totalSeconds += this.backupTime.hour * 3600;
            if (this.backupTime.day > 0) totalSeconds += this.backupTime.day * 3600 * 24;

            return totalSeconds;
        }

        _minusOneSecond = () => {
            let totalSeconds = this.state.totalSeconds;
            if (totalSeconds <= 0) {
                this._clearTimer();
                return;
            }
            totalSeconds--;
            let tempTime = totalSeconds;
            const day = Math.floor(tempTime / (3600 * 24));
            tempTime = tempTime % (3600 * 24);
            const hour = Math.floor(tempTime / 3600);
            tempTime = tempTime % 3600;
            const minute = Math.floor(tempTime / 60);
            tempTime = tempTime % 60;
            const second = tempTime;
            this.setState({
                totalSeconds,
                second,
                minute,
                hour,
                day
            })
        }

        _clearTimer() {
            if (this.timer) clearInterval(this.timer);
            this.timer = null;
        }

        start = () => {
            if (this.state.totalSeconds > 0 && !this.timer) {
                this.timer = setInterval(this._minusOneSecond, 1000);
            }
        }

        pause = () => {
            this._clearTimer();
        }

        reset = (time) => {
            this._clearTimer();
            if (time && !time.stopPropagation) {
                this.backupTime = {
                    second: time.second || 0,
                    minute: time.minute || 0,
                    hour: time.hour || 0,
                    day: time.day || 0
                }
            }
            this.setState(this.backupTime);
            this.setState({
                totalSeconds: this._getTotalSecond()
            })
        }

        render() {
            return (
                <CountDown second={this.state.second || 0}
                           minute={this.state.minute || 0}
                           hour={this.state.hour || 0}
                           day={this.state.day || 0}
                           totalSeconds={this.state.totalSeconds || 0}
                           start={this.start}
                           pause={this.pause}
                           reset={this.reset}
                ></CountDown>
            )
        }
    }
}

