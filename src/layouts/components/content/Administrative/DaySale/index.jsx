import React, { Component } from 'react';

// Externals
import compose from 'recompose/compose';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
// Material helpers
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Material components
import { Grid, Typography } from '@material-ui/core';

// Shared components
import PortletContent from '../../../../../components/PortletContent';

// Component styles
import styles from './styles';

import moment from 'moment'
import 'moment/locale/es'  
moment.locale('es')


class DaySale extends Component {
   
    constructor(props) {
        super(props);
        //console.log('sale', props.data, props.month)
        this.state = {
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
        const {data}=this.state
        const groups = data.reduce((groups, values) => {
            var date = (String(values.date_closed).substring(0, 10));
            date=(moment(date).format('dddd'))
            if (!groups[date]) {
            groups[date] = [];
            }
            groups[date].push(values);
            return groups;
        }, {});
        //console.log(groups)
        var days=(Object.keys(groups))
        var serieAccummulateMonth=[]
        days.map(day=>{
            //console.log(day)
            var sales=(groups[day].map(i=>i.total)).reduce((sum, value) => ( sum + value ), 0);
            //console.log(sales)
            serieAccummulateMonth.push({'day':day, 'venta':sales})

        })
        serieAccummulateMonth.sort(function (a, b) {
            return (moment(b.day) - moment(a.day));
        });
        var listDays=['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
        var sortListDays=(listDays.map(ele=>(serieAccummulateMonth.filter(i=>i.day===ele))[0]).map(ele=>(ele.venta)))
        //console.log(sortListDays)
        //console.log(listDays)
        this.setState({
            chartOptions: {
                chart: {
                    type: 'column',
                    width:600
                },
                title: '',
                xAxis: {
                    categories: listDays,
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
                        name: "venta", color: "#41B900", data: sortListDays
                    },
                ]
            },
            load:false,
        });
    }

    render() {
        const {load, chartOptions}=this.state
        if(load){
            return(<Grid  item xl={6} md={6} xs={6} lg={6}>
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
                </Grid>)
        }else{
            return (
                <Grid  item xl={6} md={6} xs={6} lg={6}>
                    <Grid container spacing={1}>
                        <Grid  item xl={12} md={12} xs={12} lg={12}>
                            <Typography variant="h4"  style={{color:"#616161"}}>Venta diaria acumulada</Typography>
                        </Grid>
                        <Grid  item xl={12} md={12} xs={12} lg={12}>
                            <FormattedChart chartOptions={chartOptions}/>
                        </Grid>
                    </Grid>
                </Grid>
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
)(DaySale);
