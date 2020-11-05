import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';


import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Modal } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import TrafficLight from 'react-trafficlight';
import ReactSpeedometer from "react-d3-speedometer"
import UpdateIcon from '@material-ui/icons/Update';
import BounceLoader from "react-spinners/BounceLoader";
import TimerIcon from '@material-ui/icons/Timer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import WarningIcon from '@material-ui/icons/Warning';
import Badge from '@material-ui/core/Badge';
import Calendar from './Calendar';
import BaseRestaurante from './RestauranteBase'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {getData} from '../../../services/getData'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')


let params = new URLSearchParams(location.search);
var keyGet = String(params.get('token'))

class Base extends Component {
    constructor(props) {
        super(props)
        var validKey=false
        if(keyGet===process.env.REACT_APP_TOKEN){
            validKey=true
        }
        //this.handlePeriodClick = this.handlePeriodClick.bind(this)
        this.state = {
            key:validKey,
            value: 0,
            load:true,
            data:[]
        }
    }
    

    componentDidMount() {
        this.processData()
    }

    processData = () => {
        getData().then(data=>{
            data.sort(function (a, b) {
                return (moment(b.date_closed) - moment(a.date_closed));
            });
            //console.log(data)
            this.setState({
                load:false,
                data:data
            })
        })
        
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };
    
    render() {
        const {key, value, load, data}=this.state
        if(key){
            if(load){
                return(<Grid container
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item lg={12} xl={12}>
                        <Typography
                        variant="h6"
                        >
                            <CircularProgress
                            variant="indeterminate"
                            size={20}
                            thickness={3}
                            
                            />
                        Cargando Informacion...
                        </Typography>
                    </Grid>
                </Grid>)
            }else{
                return (
                    <Grid container direction="row" justify="center" alignItems="center" spacing={1} key={1}>
                        <AppBar position="static">
                                <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
                                    <Tab label="Resumen Ejecutivo" style={{paddingTop:"15px"}} />
                                    <Tab label="Clientes" style={{paddingTop:"15px"}}/>
                                    <Tab label="Ordenes" style={{paddingTop:"15px"}}/>
                                </Tabs>
                        </AppBar>
                            { value == 0 ? 
                                <BaseRestaurante data={data} />
                            : value == 1 ?
                                <div>sjkh</div>
                            : value==2?
                                <div>sjsdakh</div>
                            :null }
                    </Grid>
                    
                )
            }
            
        }else{
            return (
                <Grid container direction="row" justify="center" alignItems="center" spacing={3} key={1}>
                    <Grid item item style={{textAlign:"right"}} xs={5} md={5} lg={5}>
                        <WarningIcon style={{color: "red"}}/>
                    </Grid>
                    <Grid item item xs={7} md={7} lg={7}>
                        <Typography variant="h5">
                            Debe ingresar Token
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
    }
}



export {Base}