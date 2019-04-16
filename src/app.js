import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { width } from 'styled-system';
import PropTypes from 'prop-types';

import { Slider } from './slider/slider';
import { SnackBar } from './snackBar/snackBar';
import { withCountDown } from './countDown/countDown';

class CountDownTest extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    {this.props.day} 天
                    {this.props.hour} 时
                    {this.props.minute} 分
                    {this.props.second} 秒
                </div>
                <div>
                    <button type="button" onClick={this.props.start}>start</button>
                    <button type="button" onClick={this.props.reset}>reset</button>
                    <button type="button" onClick={this.props.pause}>pause</button>
                </div>
            </div>
        )
    }
}

const CountDownWrapper = withCountDown(CountDownTest);

const Button = styled('button')({
    color: 'red',
}, width);


export default class App extends Component{

    constructor(props) {
        super(props);
        this.msgRef = createRef();
    }

    change = (value) => {
        console.log(value);
    }

    componentDidMount() {
    }



    addMsg = () => {
        this.msgRef.current.addMsg('sdfsdafsdf')
    }

    render() {
        return <div>
            <Button width={100} name={123} >123123</Button>
            <div style={{marginTop: '10px', marginLeft: '50px'}}>
                <Slider sliderMoveEnd={this.change}></Slider>
            </div>
            <button onClick={this.addMsg}>sdfsadf</button>
            <div style={{marginTop: '10px', marginLeft: '50px'}}>
                <SnackBar ref={this.msgRef} stayTime={5000}></SnackBar>
            </div>
            <div style={{marginTop: '10px', marginLeft: '50px'}}>
                <CountDownWrapper totalTime={{day:1,hour:2}}></CountDownWrapper>
            </div>
        </div>
    }
}
