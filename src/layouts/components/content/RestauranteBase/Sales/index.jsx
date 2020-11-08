import React, { Component, Fragment } from 'react';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
// Material helpers
import CircularProgress from '@material-ui/core/CircularProgress';
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
   
    constructor(props) {
        super(props);
        //console.log('sale', props.data, props.month)
        this.state = {
            value:0,
            typeGraph:0,
            data:this.props.data,
            chartOptions:{},
            load:true,
            month:this.props.month,
        };
    }
    componentDidMount() {
        this.processData()
    }
    static getDerivedStateFromProps( prevState, state) {
        //console.log('derived', prevState.month, state.month)
        if( prevState.month!== state.month){
            return{
                load:true,
                month:prevState.month,
                data:prevState.data
            } 
        }
        return null
    }
    componentDidUpdate(prevProps, prevState) {
        //console.log('up', prevProps.month, prevState.month, this.state.month)
        if(prevState.month!== this.state.month){
            this.processData()
        }
    }

    processData=()=>{
        const {data, month}=this.state
        //console.log('p, sales',data, month)
        const groups = data.reduce((groups, game) => {
            //console.log(String(game.date_closed).substring(0, 10))
            const date = (String(game.date_closed).substring(0, 10));
            if (!groups[date]) {
            groups[date] = [];
            }
            groups[date].push(game);
            return groups;
        }, {});
        var seriesDays=Object.keys(groups)
        var seriesSalesDays=[]
        var sumSale=0
        var max=0
        //console.log(seriesDays.length)
        seriesDays.map(days=>{
            //console.log(typeof(days))
            var dataDay=groups[days]
            //console.log(dataDay)
            var salesDay=(dataDay.map(i=>i.total))
            var totalSalesDay = salesDay.reduce((sum, value) => ( sum + value ), 0);
            //console.log(parseInt(totalSalesDay))
            sumSale+=totalSalesDay
            if(totalSalesDay>max){
                max=totalSalesDay
            }
            seriesSalesDays.push(parseInt(totalSalesDay))
        })
        var averageSaleDay=parseFloat((sumSale/seriesDays.length).toFixed(2))
        averageSaleDay=(new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(averageSaleDay))
        max=parseFloat(max.toFixed(2))
        max=(new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(max))
        this.setState({
            average:averageSaleDay,
            max:max,
            chartOptions: {
                chart: {
                    type: 'column',
                    width:1280
                },
                title: 'VENTAS',
                xAxis: {
                    categories: seriesDays,
                    labels: {
                        rotation: -45,
                    },
                    title: {
                        text: ''
                    }
                    
                },
                yAxis: {
                    title: {
                        text: null,
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [
                    {
                        name: "venta", color: "#41B900", data: seriesSalesDays
                    },
                ]
            },
            load:false,
        });
    }

    render() {
        const {load, chartOptions, average, max}=this.state
        if(load){
            return(<PortletContent>
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
                </PortletContent>)
        }else{
            return (
                <PortletContent>
                    <Grid container spacing={1}>
                        <Grid  item xl={12} md={12} xs={12} lg={12} style={{textAlign:"right", paddingRight:"200px"}}>
                            <Typography style={{color:"#1976d2"}}>Promedio venta Mensual: {average}</Typography>
                        </Grid>
                        <Grid  item xl={12} md={12} xs={12} lg={12} style={{textAlign:"right", paddingRight:"200px"}}>
                            <Typography style={{color:"#1976d2"}}>Mayor Venta:  {max}</Typography>
                        </Grid>
                        <Grid  item xl={12} md={12} xs={12} lg={12}>
                            <FormattedChart chartOptions={chartOptions}/>
                        </Grid>
                    </Grid>
                </PortletContent>
            );
        }
        
        
    }
}
function FormattedChart(props) {
    return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={props.chartOptions} />
    )
}

export default compose(
    withStyles(styles)
)(Sales);
