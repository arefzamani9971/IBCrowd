import React, { Component } from 'react';

import route from './holidayRoutes'
import RouteModule from 'core/routeModule';

class HolidayModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default HolidayModule;


