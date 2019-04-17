import React, { Component } from 'react';
import styled from 'styled-components';
import { width, height } from "styled-system";

import PropTypes from 'prop-types';

const Range = styled('div')(
    {
        position: 'relative',
        width: '500px',
        height: '10px',
        background: '#07d',
        borderRadius: '5px',
        userSelect: 'none'
    },
    width
);

const Min = styled('span')(
    {
        position: 'absolute',
        right: '100%',
        top: '-7px',
        marginRight: '12px'
    }
)

const Max = styled('span')(
    {
        position: 'absolute',
        left: '100%',
        top: '-7px',
        marginLeft: '12px'
    }
)

const Area = styled.div`
    position: absolute;
    left: 0;
    top: 5px;
    width: 20px;
    height: 1px;

    ::before {
        position: absolute;
        left: 0;
        top: 0;
        
        content: '';
        width: 20px;
        height: 20px;
        margin-left: -50%;
        margin-top: -50%;
        background: orange;
        border-radius: 100%;
        cursor: pointer;
    };
    ${width}
    ${height}
`;

const CurrentValue = styled('span')(
    {
        position: 'absolute',
        left: '-25px',
        top: '10px',

        width: '50px',
        textAlign: 'center'
    }
)

export default class Slider extends Component{
    static defaultProps = {
        min: 0,
        max: 100
    }
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        sliderMove: PropTypes.func,
        sliderMoveEnd: PropTypes.func
    }
    constructor(props) {
        super(props);

        this.AreaRef = React.createRef();
        this.rangeRef = React.createRef();
        this.preX = 0;
        this.state = {
            x: 0
        }
    }

    handleMove(value) {
        if (this.props.sliderMove) this.props.sliderMove(value);
    }

    handleMoveEnd(value) {
        if (this.props.sliderMoveEnd) this.props.sliderMoveEnd(value);
    }

    componentDidMount = () => {
        window.addEventListener('mouseup', this.handleMouseUp)
    }

    addMouseMoveListener = (clickEvent) => {
        this.preX = clickEvent.pageX;
        window.addEventListener('mousemove', this.handleMouseMove)
    }

    handleMouseMove = (mouseEvent) => {
        const diff = this.getDiff(mouseEvent);
        this.setState({
            x: diff
        });
        this.handleMove(diff + this.props.min);
    }

    handleMouseUp = (mouseEvent) => {
        window.removeEventListener('mousemove', this.handleMouseMove)
    }

    getDiff(mouseEvent) {
        let diff = this.state.x + (mouseEvent.pageX - this.preX);
        const length = this.props.max - this.props.min;
        if (diff < 0) {
            diff = 0;
        } if (diff > length) {
            diff = length;
        }

        this.preX = mouseEvent.pageX;
        return diff;
    }

    rangeClick = (e) => {
        const diff = this.getDiff(e);
        this.setState({
            x: diff
        });
        this.handleMoveEnd(diff + this.props.min);
    }

    render() {
        return (
            <Range width={this.props.max - this.props.min}
                   ref={this.rangeRef}
                   onClick={e => this.rangeClick(e)}
            >
                <Min>{this.props.min + ''}</Min>
                <Max>{this.props.max + ''}</Max>
                <Area ref={this.AreaRef}
                      onMouseDown={e => this.addMouseMoveListener(e)}
                      style={{left: this.state.x + 'px'}}
                >
                    <CurrentValue>{(this.props.min + this.state.x) || ''}</CurrentValue>
                </Area>
            </Range>
        )
    }
}
