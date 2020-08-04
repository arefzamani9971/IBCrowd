import React, { Component } from 'react';

import route from './fundamentalAnalysisRoutes'
import RouteModule from 'core/routeModule';

class analysisModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default analysisModule;


