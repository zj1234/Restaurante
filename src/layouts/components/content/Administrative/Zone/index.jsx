import React, { Component } from 'react';

// Externals
import compose from 'recompose/compose';
import MaterialTable from "material-table";
// Material helpers
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// Material components
import { Grid, Typography } from '@material-ui/core';

// Shared components
import PortletContent from '../../../../../components/PortletContent';

// Component styles
import styles from './styles';

import moment from 'moment'
import 'moment/locale/es'  
moment.locale('es')

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class Zone extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            load:true,
            month:this.props.month,
            newZones:[]
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
            var date=values.zone
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(values);
            return groups;
        }, {});
        //console.log(groups)
        var zones=(Object.keys(groups))
        var max=0
        var maxZone=""
        var newZones=[]
        zones.map(zone=>{
            //console.log(zone)
            var sales=(groups[zone].map(i=>i.total)).reduce((sum, value) => ( sum + value ), 0);
            //sales=(new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(sales))
            //console.log(zone, sales)
            newZones.push({'zone':zone, 'sale':sales})
        })
        newZones.sort(function (a, b) {
            return (moment(b.sale) - moment(a.sale));
        });
        //console.log(newZones)
        this.setState({
            load:false,
            newZones:newZones
        });
    }

    render() {
        const {load, newZones, month}=this.state
        if(load){
            return(<Grid  item xl={6} md={6} xs={6} lg={6} >
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
            //console.log(newZones)
            return (
                    <Grid  item xl={6} md={6} xs={6} lg={6}>
                        <Grid container spacing={1}>
                            <Grid  item xl={12} md={12} xs={12} lg={12} >
                                <Typography variant="h4" style={{color:"#616161"}}>Ranking de zonas: </Typography>
                            </Grid>
                            {newZones.map((zone, i)=>(
                                <Grid key={zone} item xl={12} md={12} xs={12} lg={12} >
                                    <Grid container spacing={1}>
                                        <Grid  item xl={6} md={6} xs={6} lg={6} >
                                            {i==0?
                                                <Typography variant="h5" style={{color:"#d32f2f"}}>{i+1}.-{zone.zone}:</Typography>
                                            :
                                                <Typography style={{color:"#1976d2"}}>{i+1}.{zone.zone}:</Typography>
                                            }
                                            
                                        </Grid>
                                        <Grid  item xl={6} md={6} xs={6} lg={6} >
                                            {i==0?
                                                <Typography variant="h5" style={{color:"#d32f2f"}}>{new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(zone.sale)}</Typography>
                                            :
                                            <Typography style={{color:"#1976d2"}}>{new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(zone.sale)} </Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                            
                        </Grid>
                    </Grid>
            );
        }
        
        
    }
}

export default compose(
    withStyles(styles)
)(Zone);
