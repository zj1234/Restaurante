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

import { forwardRef } from 'react';
import MaterialTable from "material-table";
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

class EmployeeProductive extends Component {
   
    constructor(props) {
        super(props);
        //console.log('Mesero', props.data, props.month)
        this.state = {
            data:this.props.data,
            load:true,
            month:this.props.month,
            listData:[]
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
        var dataEmployee=(data.map(i=>({'waiter':i.waiter, 'total':i.total, 'zone':i.zone, 'date':i.date_closed, 'table':i.table})))
        this.setState({
            load:false,
            listData:dataEmployee
        });
    }

    render() {
        const {load,month, listData}=this.state
        if(load){
            return(<Grid  item xl={12} md={12} xs={12} lg={12} >
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
                    <Grid  item xl={12} md={12} xs={12} lg={12} >
                        <MaterialTable
                            icons={tableIcons}
                            columns={[
                                { title: "Mesero", field: "waiter",defaultGroupOrder: 0 },
                                { title: "Fecha", field: "date",defaultGroupOrder: 1 },
                                { title: "Zona", field: "zone", defaultGroupOrder: 2},
                                { title: "Tabla", field: "table"/*, type: "numeric"*/ },
                                { title: "Total", field: "total"/*, type: "numeric"*/ },
                                
                            ]}
                            data={listData}
                            title=""
                            localization={{
                                grouping: {
                                    groupedBy: 'Agrupar por:',
                                    placeholder: 'Arrastre los encabezados aquí, para agrupar',
                                },
                                body: {
                                emptyDataSourceMessage: 'No hay datos'
                                },
                                toolbar: {
                                searchTooltip: 'Buscar'
                                },
                                pagination: {
                                labelRowsSelect: 'Filas',
                                labelDisplayedRows: ' {from}-{to} de {count}',
                                firstTooltip: 'Pri. pág.',
                                previousTooltip: 'Pág. previa',
                                nextTooltip: 'Sig. pág.',
                                lastTooltip: 'Últ. pág'
                                }
                            }}
                            options={{
                                grouping: true
                            }}
                        />
                        
                    </Grid>
            );
        }
        
        
    }
}

export default compose(
    withStyles(styles)
)(EmployeeProductive);
