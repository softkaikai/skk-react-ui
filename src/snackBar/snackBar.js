import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { width } from 'styled-system';

const MsgBox = styled.div`
    position: fixed;
    left: 20px;
    bottom: 20px;
    
    width: 288px;
    height: 50px;
`;

const Msg = styled.div.attrs(() => (
    {
        id: 'skk_snack_test_id'
    }
))`
    width: 288px;
    height: 48;
    padding: 14px 20px;
    line-height: 20px;
    border-radius: 4px;
    margin-bottom: 10px;
    
    color: #fff;
    background: #000;
    
    line-height: 20px;
    word-break: break-all;
    word-wrap: break-word;
    
    transform: translate(0, 100px);
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    
    &:last-child {
        margin-bottom: 0;
    }
`;


export class SnackBar extends Component{
    static defaultProps = {
        stayTime: 2000
    };
    static propTypes = {
        stayTime: PropTypes.number
    };
    constructor(props) {
        super(props);
        this.msg = '';
        this.msgRef = React.createRef();
        this.timer = null;
        this.state = {
            show: false,
            msg: '',
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.timer) clearTimeout(this.timer);
    }

    addMsg(msg) {
        this.setState({msg})
        this.setTransform('translate(0, 100px)');
        setTimeout(() => {
            this.setTransform('translate(0, 0)');
        }, 225);

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setTransform('translate(0, 100px)');
        }, this.props.stayTime);
    }

    setTransform(value) {
        this.msgRef.current.style.transform = value;
    }

    render() {



        return (
            <MsgBox>
                <Msg ref={this.msgRef}>{this.state.msg}</Msg>
            </MsgBox>
        )
    }
}