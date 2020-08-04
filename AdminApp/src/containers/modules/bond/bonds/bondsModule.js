import React, { Component } from 'react';

import route from './bondsRoutes'
import RouteModule from 'core/routeModule';

class BondsModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default BondsModule;


