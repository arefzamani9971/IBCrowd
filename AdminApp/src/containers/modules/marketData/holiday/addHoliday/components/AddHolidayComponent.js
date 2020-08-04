import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Input from 'shared/components/formInput/inputForm'
import HolidayService from '../../holidayList/services/HolidayService';

class AddHolidayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            reason: ''
        };
    }

    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            date: this.state.date,
                            reason: this.state.reason
                        }
                    }
                    service={HolidayService.addHoliday}
                    className="form-height"
                    disabled={!this.state.date || !this.state.reason}>
                
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={4}>
                            <PersianDatePicker label="تاریخ" selectedDate={this.state.date} handleOnChange={(value) => this.handleDate(value, 'date')} required />
                        </Grid>
                        <Grid item md={8}>
                            <Input id="reason" label="توضیحات" handleChange={(value) => this.handleChange(value, 'reason')} value={this.state.reason} required />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(AddHolidayComponent);