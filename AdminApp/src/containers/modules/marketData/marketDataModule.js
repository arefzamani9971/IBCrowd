import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HolidayModule from './holiday/holidayModule';
import OptionDetailsModule from './optionDetails/optionDetailsModule';
import futureContractModule from './futureContract/futureContractModule';
import BankModule from './bank/bankModule';
import BrokerModule from './broker/brokerModule';

class MarketDataModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/marketData/holiday" component={HolidayModule} />
                    <Route path="/main/marketData/optionDetails" component={OptionDetailsModule} />
                    <Route path="/main/marketData/futureContract" component={futureContractModule} />
                    <Route path="/main/marketData/bank" component={BankModule} />
                    <Route path="/main/marketData/broker" component={BrokerModule} />
                </Switch>
            </div>
        )
    }
}

export default MarketDataModule;


