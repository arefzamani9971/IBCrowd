import React, { Component } from 'react';

import route from './futureContractRoutes'
import RouteModule from 'core/routeModule';

class futureContractModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default futureContractModule;


