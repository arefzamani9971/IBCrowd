import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import Input from 'shared/components/formInput/inputForm'
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetAllProductsPaging from '../../../../../../services/getProducts';
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Columns from '../constants/GetBankListColumn';
import GetBankListService from '../services/GetBankListService';
import './GetBankListComponent.css';

class GetBankListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bankType: {
        name: "selectedBankType",
        field: "title",
        label: "نوع بانک",
        list: []
      },
      selectedBankType: { code: 0, title: '' },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    GetEnum('BankType', response => DropDownListDataProvider(this, "bankType", response));
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  excelReportHandler = () => {
    var command = {
      reportFilter: {
        id: null,
        bankType: this.state.selectedBankType.code
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    GetBankListService.getExcelExport(command, 'لیست بانک ها');
  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container banks-list"}>
          <GridServer
            {...this.props}
            {...this.state}
            sort={[
              {
                field: "created",
                dir: "desc"
              }
            ]}
            reloadColumnAfterGet
            service={GetBankListService.getAllCashFlowChequeMasterByFilterMethod}
            Columns={Columns}
            reportFilter={
              {
                id: null,
                bankType: this.state.selectedBankType.code
              }
            }
            callServiceAgain
            requestToService={false}
            noSearch={true}
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={4}>
                  <Input label="عنوان" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                </Grid>
                <Grid item md={4}>
                  <Input label="شناسه بانک" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <DropDownComponent
                      {...this.state.bankType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedBankType}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetBankListComponent;