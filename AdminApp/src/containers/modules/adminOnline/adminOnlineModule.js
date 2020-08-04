import React, { Component } from 'react';
import RouteModule from 'core/routeModule'

import route from './adminOnlineRoutes';

class AdminOnlineModule extends Component {

    render() {
        return (
         <RouteModule route={route} />
        )
    }
}

export default AdminOnlineModule;