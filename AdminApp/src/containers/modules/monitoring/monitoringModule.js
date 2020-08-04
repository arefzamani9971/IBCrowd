import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AgentStatusModule from './agentStatus/agentStatusModule';
import ChangedSymbolsModule from './changedSymbols/changedSymbolsModule';

class MonitoringModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/monitoring/changedSymbols" component={ChangedSymbolsModule} />
                    <Route path="/main/monitoring/agentStatus" component={AgentStatusModule} />
                </Switch>
            </div>
        )
    }
}

export default MonitoringModule;


