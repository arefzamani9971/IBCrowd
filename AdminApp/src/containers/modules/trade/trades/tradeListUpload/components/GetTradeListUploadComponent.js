import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Columns from '../constants/GetTradeListUploadConstants';
import Uploader from 'shared/components/uploader/uploaderArea';
import '@progress/kendo-ui';
import urlSettings from '../../../../../../constants/urlSettings';
import UploadCommodityTrade from '../services/UploadCommodityTrade';
import './GetTradeListUploadComponent.css';

const $ = require("jquery");

class GetTradeListUploadComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: Columns(),
        };


    }

    componentDidMount() {
       this.getTradeList();
    }
    getTradeList = () => {
        let self = this;
        $("#GetTradeListUploadComponent").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                           
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 10,
                                // sort: option.data.sort ? option.data.sort :
                                //     [{
                                //         field: "",
                                //         dir: "desc"
                                //     }]
                            }
                        };
                        UploadCommodityTrade.UploadCommodityTradeMethod(command, function (response) {
                            // $("#soknaReport .k-grid-footer .k-grid-footer-wrap " +
                            //     "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                            option.success(response);
                        })
                    }
                },
                pageSize: 10,
                // sort: {
                //     field: "errorMessage",
                //     dir: "desc"
                // },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    
                    data: "result",
                    total: "totalRecords",
                },
                // aggregate: [
                //     { field: "remainT0", aggregate: "sum" },
                // ]
            },
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            // reorderable: true,
            // navigatable: false,
            // selectable: "multiple",
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
            dataBound: function (e) {
                if($("div.k-pager-sm")){
                    $("div.k-pager-sm").removeClass("k-pager-sm");
                  }
                if (this.dataSource.data().length > 0) {
                    let grid = $("#GetTradeListUploadComponent").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });
                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
               
            },
            columns: self.state.columns,
        });

    };

    rerenderComponent = (data) => {
        // this.props.history.push(
        //     {
        //         pathname: '/main/trade/trades/tradeListCommodity',
        //         uploadResultData: data.result
        //     }
        // )

    };
    errorRerenderCompoent = () => { this.getTradeList();}
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <div className={"main-paper-container GetTradeListUploadComponent"}>
                    <Grid container spacing={8} className="padding-20">
                        <Grid item md={6}>
                            <Uploader
                            rerenderComponent={this.rerenderComponent}
                            errorRerenderCompoent={this.errorRerenderCompoent}  
                            data={null}
                            uploadItem={{title: ''}} accepted={[".xls", ".xlsx"]} 
                            uploadUrl={urlSettings.TradeUrl} uploadApi={'trade/uploadcommoditytrade'} />
                        </Grid>
                    </Grid>

                    <div className={"k-rtl height-content-grid"}>
                            <div id="GetTradeListUploadComponent" className="height-page"></div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default GetTradeListUploadComponent;
