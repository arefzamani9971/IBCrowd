import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { setUpdateRow } from 'store/actions';
import { connect } from "react-redux";
import '@progress/kendo-ui';
import Header from 'shared/components/stateHeader/stateHeader'
import Uploader from 'shared/components/uploader/uploaderArea';
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import urlSettings from '../../../../../../constants/urlSettings';
import Columns from '../constants/UploadExcelVoucherColumns';
import UploadExcelVoucherService from '../services/UploadExcelVoucherService';
import './UploadExcelVoucherComponent.css';

const $ = require("jquery");

class UploadExcelVoucherComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            hasError: false
        };
    }

    // HANDLE_FUNCTION
    rerenderComponent = (data) => {
        this.props.history.push(
            {
                pathname: '/main/accounting/report/addVoucher',
                uploadResultData: data.result
            }
        )
    };
    errorRerenderCompoent = (data) => {
        if (this.state.hasError) {
            this.props.setUpdateRow(Date.now());
        } else {
            this.setState({
                hasError: true
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <div className={"main-paper-container upload-excel-voucher"}>
                    <Grid container spacing={8} className="padding-20">
                        <Grid item md={6}>
                            <Uploader errorRerenderCompoent={this.errorRerenderCompoent} rerenderComponent={this.rerenderComponent}
                                uploadItem={{ title: '' }} accepted={[".xls", ".xlsx"]} uploadUrl={urlSettings.AccountingUrl}
                                uploadApi={'manualvoucher/importexcel'} />
                        </Grid>
                    </Grid>
                    <Paper className={"main-paper-container subsidiary-ledger"}>
                        {
                            this.state.hasError
                                ?
                                <GridClient
                                    {...this.state}
                                    {...this.props}
                                    service={UploadExcelVoucherService.getLastImportExcelErrors}
                                    Columns={Columns} />
                                :
                                null
                        }
                    </Paper>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUpdateRow: data => dispatch(setUpdateRow(data)),
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(UploadExcelVoucherComponent);
