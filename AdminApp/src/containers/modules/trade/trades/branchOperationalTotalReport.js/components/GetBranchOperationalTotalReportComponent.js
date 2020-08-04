import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import moment from 'moment';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import './GetBranchOperationalTotalReportComponent.css';
import urlSettings from "../../../../../../constants/urlSettings";
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import Columns from '../constants/GetBranchOperationalTotalReportColumn';
import PersianDatePicker from 'shared/components/persianDatePicker/imrcDatePicker';
import GetBranchOperationalTotalReportServices from '../services/GetBranchOperationalTotalReportServices';


const $ = require("jquery");

class GetBranchOperationalTotalReportComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      response: {},
      columns: Columns(),
      open: false,
      startDate: moment(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      branchOperation: {
        name: "branchOperationSelected",
        field: "title",
        label: "گزارش عملکرد شعب",
        list: [{ title: 'کلی', code: 0 }, { title: 'حقیقی و حقوقی', code: 1 }, { title: 'اوراق مشارکت سهام', code: 2 }]
      },
      branchOperationSelected: {},
      isLoading: true
    }
  }

  componentDidMount() {
    this.getBranchOperationalTotalReport();

  }
  search = () => {
    $("#branchOperationalReport").data("kendoGrid").dataSource.read(this);
    this.setState({
      open: false
    })
  };

  handleExpandSearchPanel = () => {
    this.setState({
      open: !this.state.open
    })
  };

  getBranchOperationalTotalReport = () => {
    let self = this;
    $("#branchOperationalReport").kendoGrid({
      dataSource: {

        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                branchId: 0,
                dateFilter: {
                  startDate: self.state.startDate,
                  endDate: self.state.endDate,
                }
              },
              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  [{
                    field: "",
                    dir: ""
                  }]
              }
            }
            self.setState({
              isLoading: true
          });
            GetBranchOperationalTotalReportServices.getbranchoperationaltotalreportMethod(command, function (response) {
              if (response.success) {
                self.setState({ response: response })
              }
              self.setState({
                isLoading: false
              }, () => {
                option.success(response)
              });
            })
          }
        },

        pageSize: 50,
        sort: {
          field: "",
          dir: ""
        },
        serverPaging: true,
        serverSorting: true,
        schema: {

          data: "result",
          total: "totalRecords"

        },

      },

      autoBind: true,
      sortable: {
        allowUnsort: false
      },
      resizable: true,
      reorderable: true,
      navigatable: false,
      columnMenu: {
        messages: {
          sortAscending: "صعودی",
          sortDescending: "نزولی",
          columns: "ستون ها"
        }
      },
      pageable: {
        pageSizes: [50, 150, 200],
        buttonCount: 5,
        messages: {
          itemsPerPage: "تعداد سطر در هر صفحه",
          display: "{0} - {1} از {2} مورد",
          empty: ""
        }
      },
      allowCopy: true,
      noRecords: {
        template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      toolbar: excelAndPdfToolbar,
      dataBound: function (e) {
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {

          let grid = $("#branchOperationalReport").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = item.uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1) {
              // currentRow.css({ display: 'none', visibility: 'hidden' });
            } else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };


      },
      columns: self.state.columns

    });
    $("#branchOperationalReport .excel-report").on("click", function () {
      self.getExcelReport();
    });
    $("#branchOperationalReport .pdf-report").on("click", function () {
      self.getPdfReport();
    });
  };


  getCommand = () => {
    var grid = $("#branchOperationalReport").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        branchId: 0,
        dateFilter: {
          startDate: "2019-01-27",
          endDate: "2019-08-27",
          // startDate: this.state.startDate,
          // endDate: this.state.endDate,
        }
      },
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource ? dataSource.sort() :
          [{
            field: "netAmount",
            dir: "asc"
          }]
      }
    }
    return command;
  };
  // getExcelReport = () => {
  //     var command = this.getCommand();
  //     // alert('excel')
  //     GetBranchOperationalTotalReportServices.getExcelExport(command, 'معاملات');
  // };


  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetBranchOperationalTotalReportServices.getPdfExport(command, "گزارش فعالیت شعب");

  }
  getA = () => { }
  getb = () => { }
  handleChangeDate = (value, name) => {

    this.setState({
      [name]: value,
    })
  }


  handleType = (item) => {
    if (item.value.code == 0) {
      this.getBranchOperationalTotalReport();
    } else if (item.value.code == 1) {

    } else if (item.value.code == 2) {

    }
    this.setState({ branchOperationSelected: item.value })
  }

  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container branchOperationalReport"}>
          <Filter search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">



                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent
                      {...this.state.branchOperation}
                      handleChange={(value) => this.handleType(value)}
                      value={this.state.branchOperationSelected}
                    />
                  </div>
                </Grid>


                <Grid item md={2}>
                  {/* <NoDataDatePicker isNull={true} selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")}/> */}
                  <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
                </Grid>

                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
                </Grid>



                {/* <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.transportationList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedTransportationList} />
                  </div>
                </Grid> */}

              </Grid>
            </div>

          </Filter>
          { this.state.isLoading ? <Loading /> : '' }
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="branchOperationalReport" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}
GetBranchOperationalTotalReportComponent.defaultProps = {
  downloadURL: urlSettings.TradeUrl,
};
export default GetBranchOperationalTotalReportComponent;
