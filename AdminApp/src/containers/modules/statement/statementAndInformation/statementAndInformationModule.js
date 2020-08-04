import React, { Component } from 'react';

import route from './statementAndInformationRoutes'
import RouteModule from 'core/routeModule';

class StatementAndInformationModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default StatementAndInformationModule;


