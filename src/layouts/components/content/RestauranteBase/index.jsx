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
import Portlet from '../../../../components/Portlet';
import PortletHeader from '../../../../components/PortletHeader';
import PortletLabel from '../../../../components/PortletLabel';
import PortletContent from '../../../../components/PortletContent';
import PortletFooter from '../../../../components/PortletFooter';
import PortletToolbar from '../../../../components/PortletToolbar';

// Component styles
import styles from './styles';

import Sales from './Sales'
import moment from 'moment'
import 'moment/locale/es'  
moment.locale('es')


class BaseRestaurante extends Component {

    services = {

    };
   
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            value:0,
            nameGraph:['Resumen de Ventas'],
            typeGraph:0,
            data:this.props.data
            
        };
    }

    render() {
        const {nameGraph, typeGraph, data}=this.state
        return (
            <Portlet>
                <PortletHeader >
                    <PortletLabel
                         /*  icon={<DevicesIcon />} */
                         variant="h6"
                         title={nameGraph[typeGraph]}
                    />
                     <PortletToolbar>
                        <IconButton
                            //className={classes.refreshButton}
                            //variant="text"
                            //onClick={this.handleShowSettings}
                        >
                            <ArrowDropDownIcon />
                                
                        </IconButton>
                    </PortletToolbar>
                </PortletHeader>
                <Sales data={data}/>
                <PortletFooter></PortletFooter>
            </Portlet>
        );
    }
}

export default compose(
    withStyles(styles)
)(BaseRestaurante);
