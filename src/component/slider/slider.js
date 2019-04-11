import React, { Component } from 'react';
import styled from 'styled-components';
import { width, height } from "styled-system";

import PropTypes from 'prop-types';

const Range = styled('div')(
    {
        position: 'relative',
        width: '500px',
        height: '10px',
        background: 'red',
        borderRadius: '5px'
    },
    width
);

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

export default class Slider extends Component{
    static defaultProps = {
        min: 0,
        max: 100
    }
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
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

    componentDidMount = () => {
        window.addEventListener('mouseup', this.handleMouseUp)
    }

    addMouseMoveListener = (clickEvent) => {
        this.preX = clickEvent.pageX;
        window.addEventListener('mousemove', this.handleMouseMove)
    }

    handleMouseMove = (mouseEvent) => {
        let diff = this.state.x + (mouseEvent.pageX - this.preX);
        const length = this.props.max - this.props.min;
        if (diff < 0) {
            diff = 0;
        } if (diff > length) {
            diff = length;
        }
        this.setState({
            x: diff
        });
        this.preX = mouseEvent.pageX;
    }

    handleMouseUp = () => {
        window.removeEventListener('mousemove', this.handleMouseMove)
    }

    render() {
        return (
            <Range width={this.props.max - this.props.min}
                   ref={this.rangeRef}
            >
                <Area ref={this.AreaRef}
                      onMouseDown={e => this.addMouseMoveListener(e)}
                      style={{left: this.state.x + 'px'}}
                />
            </Range>
        )
    }
}