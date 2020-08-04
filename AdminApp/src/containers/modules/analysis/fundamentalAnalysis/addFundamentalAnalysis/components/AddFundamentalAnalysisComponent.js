import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Checkbox from '@material-ui/core/Checkbox';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import AddFundamentalAnalysisService from './../services/AddFundamentalAnalysisService';






class AddFundamentalAnalysisComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSymbol: {},

      statementType: {
        name: "selectedStatementType",
        field: "title",
        label: "نوع مجمع",
        list: []
      },
      selectedStatementType: { code: 0, title: '' },
      codalReportPeriod: {
        name: "selectedCodalReportPeriod",
        field: "title",
        label: "دوره ",
        list: []
      },
      selectedCodalReportPeriod: {},
      advantageList:[]
      
    };
    this.handleChange = this.handleChange.bind(this);


  }

  componentWillMount() {
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }





  handleChangeCheck = name => (event) => {
    this.setState({
      isLastLevel: event.target.checked,
      [name]: event.target.checked
    })

  };
  getSymbolValue(value) {
    this.setState({
      selectedSymbol: value
    });
  }


  handleKeyUp(event,value) {
    const advantage = event.taget.value;
    if (event.keyCode === 13) {
      this.state.advantageList.push(advantage);
    }    
  }




  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Form
          disabled={true}
          {...this.props}
          {...this.state}
          entity={
            {



            }
          }
          service={AddFundamentalAnalysisService.addAnalysis}
          className="form-height"
        >

          <Grid container spacing={8} className="pl-3">
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={7}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="خلاصه معرفی"
                />
              </div>
            </Grid>
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={7}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="معرفی کامل"
                />
              </div>
            </Grid>
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={7}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="خلاصه بررسی هوشمند بنیادی"
                />
              </div>
            </Grid>

            <Grid item md={4} className="mt-3">
              <Input
                keyDownPress={true}
                id="" label="نکات برجسته"
                value={this.state.amountOfTheDocument}
                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                handleKeyDown={(value)=>this.handleKeyUp(value)}
                type="text"

              />
            </Grid>
            <Grid item md={4} className="mt-3">
              <Input

                id="" label="پارامترهای اثر گذار بر شرکت"
                value={this.state.amountOfTheDocument}
                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                type="text"

              />

            </Grid>
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={3}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="نظرنهایی تحلیل گر"
                />
              </div>
            </Grid>

            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداکثر قیمت پیشنهادی"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداقل قیمت پیشنهادی"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداکثر  ارزش منصفانه"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداقل  ارزش منصفانه"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
          </Grid>
        </Form>
      </React.Fragment>
    )
  }
}
AddFundamentalAnalysisComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddFundamentalAnalysisComponent);