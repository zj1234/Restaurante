import React, { Component } from 'react';
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
import { key, specialObjective } from '../../../common/globals';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')


let params = new URLSearchParams(location.search);

var objective = params.get('objective_id');
var user = params.get('user')
var keyGet = params.get('token')

class Objective1 extends Component {
    constructor(props) {
        super(props)
        this.handlePeriodClick = this.handlePeriodClick.bind(this)
        this.state = {
            refresh:500000
        }
    }
    
    

    handlePeriodClick(stateCalendar){
        this.setState({
            dateStart:stateCalendar.dateRange.selection.startDate.toISOString().substring(0, 10),
            finalDate:stateCalendar.dateRange.selection.endDate.toISOString().substring(0, 10),
        })
    }

    componentDidMount() {
        this.refresh()
        
    }


    getDataFromAPI = () => {
        const {dateStart, finalDate, user, objectiveMaster, keyGet}=this.state
            this.processData('nullObjectiveMaster')
    }

    refresh(){
        setInterval(
            () => this.getDataFromAPI(),
            this.state.interval
        )
        this.getDataFromAPI()
    }

    
    processData = (externalData) => {
        this.state = {
            load:true
        }
    }
    render() {

            return (
                <Grid container direction="row" justify="center" alignItems="center" spacing={3} key={1}>
                    <Grid item>
                        <WarningIcon style={{color: "red"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            Debe ingresar user
                        </Typography>
                    </Grid>
                </Grid>
            )
        
    }
}



export {Objective1}