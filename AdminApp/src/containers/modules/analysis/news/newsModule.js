import React, { Component } from 'react';

import route from './newsRoutes'
import RouteModule from 'core/routeModule';

class newsModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default newsModule;


