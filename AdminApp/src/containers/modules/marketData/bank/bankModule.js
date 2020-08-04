import React, { Component } from 'react';

import route from './bankRoutes'
import RouteModule from 'core/routeModule';

class BankModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default BankModule;


