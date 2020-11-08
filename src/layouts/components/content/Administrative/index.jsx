import React, { Component, Fragment } from 'react';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
// Shared components
import Portlet from '../../../../components/Portlet';
import PortletHeader from '../../../../components/PortletHeader';
import PortletLabel from '../../../../components/PortletLabel';
import PortletContent from '../../../../components/PortletContent';
import PortletFooter from '../../../../components/PortletFooter';
import PortletToolbar from '../../../../components/PortletToolbar';

// Component styles
import styles from './styles';

import moment from 'moment'
import 'moment/locale/es'  
import Employee from './Employee';
import DaySale from './DaySale'
import Zone from './Zone';
import Product from './Product'
moment.locale('es')


class Administrative extends Component {

   
    constructor(props) {
        super(props);
        //console.log('month',Object.keys(props.data))
        //console.log('br', props.data)

        this.state = {
            valueMonth:0,
            data:this.props.data,
            months:Object.keys(this.props.data),
            open:false,
            anchor:null,
            dataMonth:this.props.data[Object.keys(this.props.data)[0]]
        };
    }

    handleCloseFilterMonth = () => {
        this.setState({
            anchor: null,
            open:false
        });
    };
    handlePopMonths=(event)=>{
        this.setState({
            open:true,
            anchor:event.currentTarget
        })
    }
    /*componentDidMount() {
        this.processData()
    }*/
    processData=()=>{
        //console.log('proces')
        const {valueMonth, data, months}=this.state
        //console.log(months[valueMonth])
        //console.log(data[months[valueMonth]])
        this.setState({
            dataMonth:data[months[valueMonth]]
        })
    }


    componentDidUpdate(prevProps, prevState) {
        //console.log('up')
        //console.log(prevProps.data, prevState.valueMonth, this.state.valueMonth)
        if(prevState.valueMonth!== this.state.valueMonth){
            //console.log('va a p')
            this.processData()
        }
    }

    handleChangeMonth=(event)=>{
        //console.log('change month')
        const {months, data}=this.state
        this.setState({
            valueMonth:months.indexOf(event.currentTarget.value),
            dataMonth:data[months[months.indexOf(event.currentTarget.value)]],
            anchor: null,
            open:false
        });
    }
    
    render() {
        const { months, valueMonth, open, anchor, dataMonth}=this.state
        //console.log('a',months[valueMonth], dataMonth)
        dataMonth.sort(function (a, b) {
            return (moment(a.date_closed) - moment(b.date_closed));
        });
        return (
            <Portlet>
                <PortletHeader >
                    <Grid container spacing={1}>
                        <Grid item xl={12} md={12} xs={12} lg={12} style={{textAlign:"left", paddingTop:"20px"}}>
                            <Typography variant="h4">Resumen administrativo {months[valueMonth]}
                                <IconButton
                                    variant="text"
                                    onClick={this.handlePopMonths}
                                >
                                    <ArrowDropDownIcon />
                                        
                                </IconButton>
                                </Typography>
                        </Grid>
                        <Popover open={open}
                            anchorEl={anchor}
                            onClose={this.handleCloseFilterMonth}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                        > 
                            <Grid container spacing={1}>
                                {months.map(month=>(
                                    <Grid key={month} item xl={12} md={12} xs={12} lg={12}>
                                        <Button onClick={this.handleChangeMonth} value={month}><Typography>{month}</Typography></Button>
                                    </Grid>
                                ))
                                }
                            </Grid>
                        </Popover>
                    </Grid>
                </PortletHeader>
                <PortletContent>
                    <Grid container spacing={4}>
                        <DaySale data={dataMonth} month={months[valueMonth]}/>  
                        <Employee data={dataMonth} month={months[valueMonth]}/>
                        <Zone data={dataMonth} month={months[valueMonth]}/>
                        <Product data={dataMonth} month={months[valueMonth]}/>
                    </Grid>
                </PortletContent>
                <PortletFooter></PortletFooter>
            </Portlet>
        );
    }
}

export default compose(
    withStyles(styles)
)(Administrative);
