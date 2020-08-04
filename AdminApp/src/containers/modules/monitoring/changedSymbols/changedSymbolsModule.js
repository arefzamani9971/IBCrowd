import React, { Component } from 'react';

import route from './changedSymbolsRoutes'
import RouteModule from 'core/routeModule';

class ChangedSymbolsModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default ChangedSymbolsModule;


