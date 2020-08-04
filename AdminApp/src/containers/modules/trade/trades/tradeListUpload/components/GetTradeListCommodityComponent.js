import React from 'react';
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import '@progress/kendo-ui';
import './GetTradeListCommodityComponent.css';
import customersCommodityTradeCountColumn from '../../tradeListCommodity/constants/GetTradeListCommidityConstants';
import {resultCommodityTrade} from '../../tradeListCommodity/constants/GetTradeListCommidityConstants';
import GetTradeListCommodityServices from "../../tradeListCommodity/services/GetTradeListCommodityServices";
import urlSettings from "../../../../../../constants/urlSettings";


class GetTradeListCommodityComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: [{
                field: "created",
                dir: "desc"
            }],
        };

    }

    render() {

        return (
            <React.Fragment>
                <Paper className={"main-paper-container"}>
                        <div className={"Result-Commodity-Trade"}>
                            <h1 style={{padding: '20px 5px'}}>رکورهای ثبت نشده</h1>
                            <GridServer
                                {...this.props}
                                {...this.state}
                                service={GetTradeListCommodityServices.resultCommodityTradeMethod}
                                Columns={resultCommodityTrade}
                                sort={this.state.sort}
                                reRender={true}
                                callServiceAgain={true}
                            >
                            </GridServer>
                        </div>

                        <div className={"Customers-Commodity-Trade-Count"}>
                            <h1 style={{padding: '20px 5px'}}>وضعیت فایل بارگزاری شده</h1>
                            <GridServer
                                {...this.props}
                                {...this.state}
                                service={GetTradeListCommodityServices.customersCommodityTradeCountMethod}
                                Columns={customersCommodityTradeCountColumn}
                                sort={this.state.sort}
                                reRender={true}
                                callServiceAgain={true}
                                >
                            </GridServer>
                        </div>
                </Paper>
            </React.Fragment>

        )
    }
}
GetTradeListCommodityComponent.defaultProps= {
    downloadURL: urlSettings.TradeUrl,
};
export default GetTradeListCommodityComponent;
