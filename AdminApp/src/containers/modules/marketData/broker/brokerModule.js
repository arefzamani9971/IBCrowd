import React, { Component } from 'react';

import route from './brokerRoutes'
import RouteModule from 'core/routeModule';

class BrokerModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default BrokerModule;


