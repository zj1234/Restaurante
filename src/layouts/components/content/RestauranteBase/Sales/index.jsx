import React, { Component, Fragment } from 'react';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import { Grid, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Shared components
import PortletContent from '../../../../../components/PortletContent';

// Component styles
import styles from './styles';

import moment, { isDate } from 'moment'
import 'moment/locale/es'  
moment.locale('es')


class Sales extends Component {

    services = {

    };
   
    constructor(props) {
        super(props);
        
        this.state = {
            value:0,
            nameGraph:['Resumen de Ventas'],
            typeGraph:0,
            data:this.props.data
            
        };
    }
    componentDidMount() {
        this.processData()
    }

    processData=()=>{
        const {data}=this.state
        console.log(data)
        const groups = data.reduce((groups, game) => {
            console.log(String(game.date_closed).substring(0, 10))
            const date = (String(game.date_closed).substring(0, 10));
            if (!groups[date]) {
            groups[date] = [];
            }
            groups[date].push(game);
            return groups;
        }, {});
        console.log(groups)
    }

    render() {
        const {nameGraph, typeGraph}=this.state
        return (
                <PortletContent><Typography>kljñsd</Typography></PortletContent>
        );
    }
}

export default compose(
    withStyles(styles)
)(Sales);
