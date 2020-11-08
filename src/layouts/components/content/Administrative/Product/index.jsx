import React, { Component, Fragment } from 'react';

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


class Product extends Component {
   
    constructor(props) {
        super(props);
        //console.log('sale', props.data, props.month)
        this.state = {
            data:this.props.data,
            load:true,
            month:this.props.month,
            products:[]
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
        var products=(data.map(i=>i.products))
        var totalProducts=[]
        products.map(item=>{
            item.map(ele=>{
                totalProducts.push(ele)
            })
        })
        //console.log(totalProducts)
        const groups = totalProducts.reduce((groups, values) => {
            var category=values.category
            if (!groups[category]) {
            groups[category] = [];
            }
            groups[category].push(values);
            return groups;
        }, {});
        var categories=Object.keys(groups)
        var newList=[]
        categories.map(cat=>{
            //console.log(cat)
            var salesProduct=(groups[cat].map(i=>i.price)).reduce((sum, value) => ( sum + value ), 0);
            //console.log(salesProduct)
            newList.push({'categoria':cat, 'venta':salesProduct})
        })
        newList.sort(function (a, b) {
            return (moment(b.venta) - moment(a.venta));
        });
        this.setState({
            load:false,
            products:newList
        });
    }

    render() {
        const {load, products}=this.state
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
                            <Grid  item xl={12} md={12} xs={12} lg={12} >
                                <Typography variant="h4" style={{color:"#616161"}}>Ranking de categoria: </Typography>
                            </Grid>
                            {products.map((product, i)=>(
                                <Grid key={i} item xl={12} md={12} xs={12} lg={12} >
                                    <Grid container spacing={1}>
                                        <Grid  item xl={6} md={6} xs={6} lg={6} >
                                            {i==0?
                                                <Typography variant="h5" style={{color:"#d32f2f"}}>{i+1}.-{product.categoria}:</Typography>
                                            :
                                                <Typography style={{color:"#1976d2"}}>{i+1}.{product.categoria}:</Typography>
                                            }
                                        </Grid>
                                        <Grid  item xl={6} md={6} xs={6} lg={6} >
                                            {i==0?
                                                <Typography variant="h5" style={{color:"#d32f2f"}}>{new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(product.venta)}</Typography>
                                            :
                                            <Typography style={{color:"#1976d2"}}>{new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(product.venta)} </Typography>
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
)(Product);
