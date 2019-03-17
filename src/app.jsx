import React, { Component } from 'react';
import styled from 'styled-components';
import { width } from 'styled-system';
import PropTypes from 'prop-types';

const Button = styled('button')({
    color: 'red',
}, width);

/*Button.propTypes = {
    width: PropTypes.symbol,
    name: PropTypes.string
};*/

/*const Button = styled.button`
    color: red;
    ${width}
`*/


export default class App extends Component{
    render() {
        return <div>
            <Button width={100} name={123}>123123</Button>
        </div>
    }
}