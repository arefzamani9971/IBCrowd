import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import FundamentalAnalysisModule from './fundamentalAnalysis/fundamentalAnalysisModule';
import newsModule from './news/newsModule';

class AnalysisModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/analysis/fundamentalAnalysis" component={FundamentalAnalysisModule} />
                    <Route path="/main/analysis/news" component={newsModule} />
                </Switch>
            </div>
        )
    }
}

export default AnalysisModule;


