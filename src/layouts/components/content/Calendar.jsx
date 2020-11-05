import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import { addDays, addMonths } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            range: {},
            dateRange: {
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            },
            startDate:this.props.props.dateStart,
            finalDate:this.props.props.finalDate,

            
        }
    }

    static getDerivedStateFromProps( prevState, state) {
        if(prevState.dateStart!==state.startDate||prevState.finalDate!==state.finalDate){
            return {
                startDate: prevState.props.dateStart,
                finalDate:prevState.props.finalDate
            }
        }
        return null
    }

    onOpenModal = () => {
        this.setState({
            open: true,
            range: {}
        });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onCloseModalButton = () => {
        this.setState({ open: false });
        Graph(this.props, this.state)
    };

    handleRangeChange(which, payload) {
        this.setState({
            [which]: {
                ...this.state[which],
                ...payload,
            },
        });
    }

    render() {
        const { open, startDate, finalDate } = this.state;
        let dateNewStart= (moment(startDate).format("DD-MM-YYYY"))
        let dateNewEnd= (moment(finalDate).format("DD-MM-YYYY"))
        return (
            <div>
                <List>
                    <ListItem>
                    <Button onClick={this.onOpenModal}>
                        <Typography style={{color:"rgba(0, 0, 0, 0.87)"}} variant="subtitle2">Periodo consultado:&nbsp;</Typography>
                        <Typography style={{color:"grey"}} variant="subtitle2">{dateNewStart}</Typography>
                        <Typography style={{color:"rgba(0, 0, 0, 0.87)"}} variant="subtitle2">&nbsp;AL&nbsp;</Typography>
                        <Typography style={{color:"grey"}} variant="subtitle2">{dateNewEnd}</Typography><ArrowDropDownIcon />
                    </Button>
                        <Popover open={open}
                                onClose={this.onCloseModal}
                                anchorOrigin={{vertical: 'center', horizontal: 'center'}}
                                transformOrigin={{vertical: 'center', horizontal: 'center' }}>
                            <div>
                                <DateRange
                                    maxDate={addDays(new Date(), 0)}
                                    minDate={addMonths(new Date(), -3)}
                                    locale={rdrLocales.es}
                                    onChange={this.handleRangeChange.bind(this, 'dateRange')}
                                    moveRangeOnFirstSelection={false}
                                    ranges={[this.state.dateRange.selection]}
                                    className={'PreviewArea'}
                                />
                            </div>
                            <Button onClick={this.onCloseModalButton}>Generar</Button>
                        </Popover>
                    </ListItem>
                </List>
            </div>
        )
    }
}

function Graph(props, state) {
    props.onClick(state)
}


export default Calendar;