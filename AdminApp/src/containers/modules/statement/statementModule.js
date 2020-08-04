import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import StatementAndInformationModule from './statementAndInformation/statementAndInformationModule.js';

class StatementModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/statement/statementAndInformation" component={StatementAndInformationModule} />
                </Switch>
            </div>
        )
    }
}

export default StatementModule;


