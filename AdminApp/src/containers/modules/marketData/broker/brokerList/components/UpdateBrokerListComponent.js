import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import Input from 'shared/components/formInput/inputForm'
import moment from 'moment';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import UpdateBrokerListService from "../services/UpdateBrokerListService";

class UpdateBrokerListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
    }

    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                          
                        }
                    }
                    service={UpdateBrokerListService.updatecashflowchequemasterMethod}
                    className="form-height">
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نام کارگزاری</Grid>
                        <Grid item md={6}>نام لاتین کارگزاری</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <Input label="نام کارگزاری" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={6}>
                            <Input label="نام لاتین کارگزاری" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>کد</Grid>
                        <Grid item md={6}>شناسه ملی</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <Input label="کد" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={6}>
                            <Input label="شناسه ملی" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>معتبر از</Grid>
                        <Grid item md={6}>معتبر تا</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <PersianDatePicker label="از معتبر" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker label="تا معتبر" handleOnChange={(value) => this.handleDate(value, 'ToDate')} selectedDate={this.state.ToDate} />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateBrokerListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateBrokerListComponent);