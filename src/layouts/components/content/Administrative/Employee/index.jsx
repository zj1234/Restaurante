import React, { Component } from 'react';

// Externals
import compose from 'recompose/compose';
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


class Employee extends Component {
   
    constructor(props) {
        super(props);
        //console.log('Mesero', props.data, props.month)
        this.state = {
            data:this.props.data,
            load:true,
            month:this.props.month,
            max:0,
            waiter:""
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
        //console.log(data)
        const groups = data.reduce((groups, values) => {
            //var date = (String(values.date_closed).substring(0, 7));
            var date=values.waiter
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(values);
            return groups;
        }, {});
        var waiters=(Object.keys(groups))
        var max=0
        var maxWaiter=""
        var sale=0
        waiters.map(waiter=>{
            var sales=(groups[waiter].map(i=>i.total)).reduce((sum, value) => ( sum + value ), 0);
            if(sales>max){
                max=sales
                maxWaiter=waiter
                sale=sales/groups[waiter].length
            }
        })

        max=(new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(max))
        sale=(new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(sale))
        this.setState({
            max:max,
            sale:sale,
            waiter:maxWaiter,
            load:false,
        });
    }

    render() {
        const {load,month, max, waiter, sale}=this.state
        //console.log('r e', max, waiter)
        if(load){
            return(<Grid  item xl={6} md={6} xs={6} lg={6} style={{textAlign:"center", paddingRight:"200px"}}>
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
                    <Grid  item xl={6} md={6} xs={6} lg={6} >
                        <Grid container spacing={1}>
                            <Grid  item xl={12} md={12} xs={12} lg={12} >
                                <Typography variant="h4" style={{color:"#616161"}}>Mesero del Mes</Typography>
                            </Grid>
                            <Grid  item xl={12} md={12} xs={12} lg={12} >
                                <Typography style={{color:"#616161"}}> {waiter}</Typography>
                            </Grid>
                            <Grid  item xl={12} md={12} xs={12} lg={12} >
                                <Typography style={{color:"#1976d2"}}>Monto Promedio de Venta diario {sale}</Typography>
                            </Grid>
                            <Grid  item xl={12} md={12} xs={12} lg={12} >
                                <Typography style={{color:"#1976d2"}}>Monto Acumulado Mensual de Venta {max}</Typography>
                            </Grid>
                        </Grid>
                        
                    </Grid>
            );
        }
        
        
    }
}

export default compose(
    withStyles(styles)
)(Employee);
