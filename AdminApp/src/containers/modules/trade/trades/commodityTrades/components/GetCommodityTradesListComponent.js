import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import './GetCommodityTradesListComponent.css';
import urlSettings from "../../../../../../constants/urlSettings";
import GetCommodityTradesListService from '../services/GetCommodityTradesListServices';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import Columns from '../constants/GetCommodityTradesListColumn';
import { searchCommodityProductsTemplate, searchCommodityProductsHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import getBroker from '../../../../../../services/getBroker';
import getAllProducer from '../../../../../../services/getAllProducer';
import getAllTransportation from '../../../../../../services/getAllTransportation';
import getAllDeliveryPlace from '../../../../../../services/getAllDeliveryPlace';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import getCommodityContractType from '../../../../../../services/getCommodityContractType';
const $ = require("jquery");

class GetCommodityTradesListComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {


      response: {},
      columns: Columns(),


      // transactionStateList: {
      //   name: "transactionState",
      //   field: "title",
      //   label: "وضعیت معامله ",
      //   list: []
      // },
      // transactionState: [],






      // partyTypeList: {
      //   name: "partyType",
      //   field: "title",
      //   label: "نوع مشتری ",
      //   list: []
      // },

      // simpleSecurityExchangeList: {
      //   name: "simpleSecurityExchange",
      //   field: "title",
      //   label: "نوع بازار ",
      //   list: []
      // },

      // productTypeList: {
      //   name: "productType",
      //   field: "title",
      //   label: "نوع زیر بازار ",
      //   list: []
      // },
      // productType: { code: 0, id: '' },




      // isinsList: {
      //   name: "isins",
      //   // field: "title",
      //   placeholder: 'جستجوی نماد',
      //   dataTextField: 'symbol',
      //   dataValueField: 'id',
      //   fieldSearch: 'phrase',
      //   template: productTemplate,
      //   headerTemplate: productHeaderTemplate
      //   // list: []
      // },
      // isins: [],

      // sectorList: {
      //   name: "sector",
      //   field: "title",
      //   label: "صنعت",
      //   list: []
      // },
      // sector: { code: 0, id: '' },


      party: {
        name: "selectedParty",
        field: 'fullName',
        dataValueField: 'id',
        placeholder: 'نام نام خانوادگی کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید',
        label: "نام و نام خانوادگی مشتری"
      },
      selectedParty: { id: 0, fullName: '' },





      productCommodity: {
        name: "selectedProductCommodity",
        field: 'title',
        dataValueField: 'id',
        template: searchCommodityProductsTemplate,
        headerTemplate: searchCommodityProductsHeaderTemplate,
        placeholder: 'عنوان نماد یا عنوان کالا را وارد نمایید',
        label: "عنوان نماد",
        fieldSearch: 'phrase'
      },
      selectedProductCommodity: { id: 0, title: '' },




      securityTransactionTypeList: {
        name: "selectedSecurityTransactionTypeList",
        field: "title",
        label: "نوع معامله ",
        list: []
      },
      selectedSecurityTransactionTypeList: { code: 0, title: '' },







      brokerList: {
        name: "selectedBrokerList",
        field: "title",
        label: "کاگزار طرف مقابل",
        list: []
      },
      selectedBrokerList: { id: 0, title: '' },


      producerList: {
        name: "selectedProducerList",
        field: "producerTitle",
        label: "تولید کننده  ",
        list: []
      },
      selectedProducerList: { producerCode: '' },

      transportationList: {
        name: "selectedTransportationList",
        field: "title",
        label: "موسسه حمل ونقل ",
        list: []
      },
      selectedTransportationList: { id: 0, title: '' },



      deliveryPlaceList: {
        name: "selectedDeliveryPlaceList",
        field: "deliveryPlace",
        label: "محل تحویل ",
        list: []
      },
      selectedDeliveryPlaceList: { deliveryPlace: '' },


      open: false,
      dailyAggregate: false,


      startDate: null,
      endDate: null,

      contractType: {
        name: "selectedContractType",
        field: "title",
        label: "نوع قراداد",
        list: []
      },
      selectedContractType: { code: 0, title: '' },
      isLoading: true
    }

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getTradeList();
    GetEnum('securitytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response));
    getBroker.getallbrokerMethod({}, response => DropDownListDataProvider(this, "brokerList", response));
    getAllProducer.getallproducerMethod({}, response => DropDownListDataProvider(this, "producerList", response));
    getCommodityContractType.getcommoditycontracttypeMethod({}, response => DropDownListDataProvider(this, "contractType", response));
    getAllTransportation.getalltransportationMethod({}, response => DropDownListDataProvider(this, "transportationList", response));
    getAllDeliveryPlace.getalldeliveryplaceMethod({}, response => DropDownListDataProvider(this, "deliveryPlaceList", response));

  }
  handleAutoCompleteChange = (value, name) => {
    this.setState({
      [name]: value.value
    })
  }
  handleChange = (value, name) => {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }

  search() {
    $("#commodity-trades-list").data("kendoGrid").dataSource.read(this);
    this.setState({
      open: false
    })
  };
  handleExpandSearchPanel = () => {
    this.setState({
      open: !this.state.open
    })
  };
  getTradeList = () => {
    let self = this;
    $("#commodity-trades-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                partyId: self.state.selectedParty.id,
                commodityProductId: self.state.selectedProductCommodity.id,
                transactionType: self.state.selectedSecurityTransactionTypeList.code,
                brokerId: self.state.selectedBrokerList.code,
                producer: self.state.selectedProducerList.producerCode,
                contractType: self.state.selectedContractType.code,
                transportationId: self.state.selectedTransportationList.id,
                deliveryPlace: self.state.selectedDeliveryPlaceList.deliveryPlace,
                // dailyAggregate: self.state.dailyAggregate,
                dateFilter: {
                  startDate: self.state.startDate,
                  endDate: self.state.endDate
                }
              },
              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  [{
                    field: "contrctNumber",
                    dir: "asc"
                  }]
              }
            }
            self.setState({
              isLoading: true
          });
            GetCommodityTradesListService.getAllCommodityMethod(command, function (response) {
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
          field: "created",
            dir: "desc"
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
        var scrollOffset = {
          left: 10000,
        };
        var container = e.sender.wrapper.children(".k-grid-content");
        container.scrollLeft(scrollOffset.left);
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {

          let grid = $("#commodity-trades-list").data("kendoGrid");
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
    $("#commodity-trades-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    });
    $("#commodity-trades-list .pdf-report").on("click", function (item) {
      self.getPdfReport();
    });
  };
  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };

  handleChangeDate = (value, name) => {
    this.setState({
      [name]: value,
    })
  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container commodity-trades-list"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={12}>
                  <AutoCompleteComponent
                    {...this.state.party}
                    handleChange={(value) => this.handleAutoCompleteChange(value, 'selectedParty')}
                    value={this.state.selectedParty.fullName}
                    service={GetPartiesService.simpleSearchCustomers}
                  />
                  <AutoCompleteComponent {...this.state.productCommodity}
                    handleChange={(value) => this.handleAutoCompleteChange(value, 'selectedProductCommodity')}
                    value={this.state.selectedProductCommodity.title}
                    service={GetCommodityTradesListService.searchcommodityproductsMethod} />

                </Grid>

                <Grid item md={2}>
                  <NoDataDatePicker isNull={true} selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
                  {/* <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} /> */}
                </Grid>

                <Grid item md={2}>
                  <NoDataDatePicker isNull={true} selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
                  {/* <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} /> */}
                </Grid>



                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.securityTransactionTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedSecurityTransactionTypeList} />

                  </div>
                </Grid>

                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.brokerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedBrokerList} />
                  </div>
                </Grid>


                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.producerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedProducerList} />
                  </div>
                </Grid>

                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.contractType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedContractType} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.transportationList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedTransportationList} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.deliveryPlaceList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedDeliveryPlaceList} />
                  </div>

                </Grid>
                <Grid item md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.dailyAggregate}
                        onChange={(e) => this.handleChangeCheck(e, 'dailyAggregate')}
                        value=""
                        color="primary"
                      />
                    }
                    label="معاملات تجمعی روزانه"
                  />
                </Grid>


              </Grid>
            </div>

          </Filter>
          { this.state.isLoading ? <Loading /> : '' }
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="commodity-trades-list" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}
GetCommodityTradesListComponent.defaultProps = {
  downloadURL: urlSettings.TradeUrl,
};
export default GetCommodityTradesListComponent;
