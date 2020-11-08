import React, { Component } from 'react';


import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';
import BaseRestaurante from './RestauranteBase'
import Administrative from './Administrative'
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
            const groups = data.reduce((groups, values) => {
                var date = (String(values.date_closed).substring(0, 7));
                date=(moment(date).format('MMMM'))
                if (!groups[date]) {
                groups[date] = [];
                }
                groups[date].push(values);
                return groups;
            }, {});
            //console.log('de', groups)
            this.setState({
                load:false,
                dataMonth:groups
            })
        })
        
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };
    
    render() {
        const {key, value, load, dataMonth}=this.state
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
                                    <Tab label="Resumen Comercial" style={{paddingTop:"15px"}} />
                                    <Tab label="Resumen Administrativo" style={{paddingTop:"15px"}}/>
                                </Tabs>
                        </AppBar>
                            { value == 0 ? 
                                <BaseRestaurante data={dataMonth} />
                            : value == 1 ?
                                <Administrative data={dataMonth}/>
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