import React, { Component } from 'react';
import { connect } from "react-redux";
import Loading from '../../../core/Loading';
import './dashboardTheme.css'

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };

    }

    render() {

        if (this.state.isLoading) {
            return (<Loading />)
        }
        else {
            return (
                <React.Fragment>
                    <div className='mainHeader'>پیشخوان</div>
                </React.Fragment>
            )
        }


    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
export default Dashboard; 