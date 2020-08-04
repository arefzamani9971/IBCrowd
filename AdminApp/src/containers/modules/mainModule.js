import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import AccountingModule from './accounting/accountingModule';
import BasicInformationModule from './basicInformation/basicInformationModule';
import PersonsAndCustomersModule from './personsAndCustomers/personsAndCustomersModule';
import TradeModule from './trade/tradeModule';
import OrderModule from './order/orderModule';
import './styles/moduleStyle.css';
// import chequeManagementModule from "./cashflow/chequeManagement/chequeManagementModule";
import CashFlowModule from "./cashflow/cashFlowModule";
import ResourceModule from './resource/resourceModule';
import AdminOnlineModule from './adminOnline/adminOnlineModule';
import StatementModule from './statement/statementModule';
import BondModule from './bond/bondModule';
import MarketDataModule from './marketData/marketDataModule';
import MonitoringModule from './monitoring/monitoringModule';
import AnalysisModule from './analysis/analysisModule';

class MainMdoules extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (

            <div className="height-page" >
                {/* <Switch>
                    <Route exact path="/main">
                        <Redirect to="/main/dashboard" />
                    </Route>
                    <Route path="/main/dashboard" render={(props) => <Dashboard userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/basicInformation" render={(props) =><BasicInformationModule userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/accounting" render={(props) =><AccountingModule userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/persons" component={PersonsAndCustomersModule} render={(props) =><PersonsAndCustomersModule userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/trade" component={TradeModule} render={(props) =><TradeModule userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/order" component={OrderModule} render={(props) =><OrderModule userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/cashFlow" component={CashFlowModule} render={(props) =><CashFlowModule userAccessPages={this.props.userAccessPages} />} />
                    <Route path="/main/resource" component={ResourceModule} render={(props) =><ResourceModule userAccessPages={this.props.userAccessPages} />} />
                </Switch> */}
                    <Switch>
                    <Route exact path="/main">
                        {/* <Redirect to="/main/dashboard" /> */}
                        <Redirect to="/main/statement/statementAndInformation/index" />
                    </Route>
                    <Route path="/main/dashboard" component={Dashboard}  />
                    <Route path="/main/basicInformation" component={BasicInformationModule} />
                    <Route path="/main/accounting" component={AccountingModule} />
                    <Route path="/main/persons"  component={PersonsAndCustomersModule}/>
                    <Route path="/main/trade" component={TradeModule}  />
                    <Route path="/main/order" component={OrderModule} />
                    <Route path="/main/cashFlow" component={CashFlowModule} />
                    <Route path="/main/resource" component={ResourceModule} />
                    <Route path="/main/adminOnline" component={AdminOnlineModule} />
                    <Route path="/main/statement" component={StatementModule} />
                    <Route path="/main/bond" component={BondModule} />
                    <Route path="/main/marketData" component={MarketDataModule} />
                    <Route path="/main/monitoring" component={MonitoringModule} />
                    <Route path="/main/analysis" component={AnalysisModule} />
                </Switch>
            </div>


        )
    }
}

export default MainMdoules;
