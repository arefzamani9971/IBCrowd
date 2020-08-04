import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import styles from 'containers/layout/panel/theme';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetChangeSymbolService from "../services/GetChangeSymbolService";
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetChangeSymbolColumn';
import Paper from '@material-ui/core/Paper';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';

import './GetChangeSymbolComponent.css';

class GetChangeSymbolComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            simpleStatus: {
                name: "selectedSimpleStatus",
                field: "title",
                label: "وضعیت بررسی",
                list: []
            },
            selectedSimpleStatus: { code: 0, title: '' },
            selectedSymbol: {},
            boardType: {
                name: "selectedBoardType",
                field: "title",
                label: "نوع Board",
                list: []
            },
            selectedBoardType: { code: 0, title: '' },
            bazarType: {
                name: "selectedBazarType",
                field: "title",
                label: "نوع بازار",
                list: []
            },
            selectedBazarType: { code: 0, title: '' }
        };
        this.handleChange = this.handleChange.bind(this);
        this.getSymbolValue = this.getSymbolValue.bind(this);

    }
    componentDidMount() {
        GetEnum('SimpleStatus', response => DropDownListDataProvider(this, "simpleStatus", response));
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    getSymbolValue(value) {
        this.setState({
            selectedSymbol: value
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container symbol-change"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "created",
                                dir: "desc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetChangeSymbolService.getAllCashFlowChequeMasterByFilterMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                isin: this.state.selectedSymbol.isin,

                            }
                        }
                        callServiceAgain
                        requestToService={false}
            noSearch={true}
                        reRender
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
                        <div className="ml-3" classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin d-flex align-items-center">
                                <Grid item md={6}>
                                    <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />
                                </Grid>
                                <Grid item md={6}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable
                                            hasAll
                                            {...this.state.bazarType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedBazarType} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin d-flex align-items-center">
                                <Grid item md={3}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable
                                            hasAll
                                            {...this.state.boardType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedBoardType} />
                                    </div>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.simpleStatus}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedSimpleStatus} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>

            </React.Fragment>
        )
    }

}

GetChangeSymbolComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GetChangeSymbolComponent);