import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import styles from 'containers/layout/panel/theme';
import moment from 'moment';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetCalculateAdjustedPriceService from "../services/GetCalculateAdjustedPriceService";

class GetCalculateAdjustedPriceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
    };
  }

  componentDidMount() {
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
          entity={{}}
          service={GetCalculateAdjustedPriceService.updatecashflowchequemasterMethod}
          className="form-height">
          <Grid container spacing={8}>
            <Grid item md={6}>تاریخ تأیید مجمع</Grid>
          </Grid>
          <Grid container spacing={8} className="mt-2">
            <Grid item md={6}>
              <PersianDatePicker label="تاریخ تأیید مجمع" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
            </Grid>
          </Grid>
        </Form>
      </React.Fragment>
    )

  }

}

GetCalculateAdjustedPriceComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GetCalculateAdjustedPriceComponent);