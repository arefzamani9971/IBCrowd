import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import PropTypes from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import GetSubsidiaryLedgerService from '../../subsidaryLedger/services/GetSubsidiaryLedgerService';
import { detailLedgerTemplate, detailLedgerHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import GetDetailLedgerService from '../../detailLedger/services/GetDetailLedgerService';
import AddManageAccountCodesRelationService from '../services/CreateManageAccountCodesRelationService';

class AddManageAccountCodesRelation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subsidiaryLedgerCodeList: {
                name: "subsidiaryLedgerCode",
                field: "fullTitle",
                label: "کد معین",
                list: []
            },
            subsidiaryLedgerCode: { fulltitle: '', code: '' },
            detailLedgerList: {
                name: "detailLedgerCode",
                field: "fullTitle",
                label: "کد تفصیل",
                list: []
            },
            detailLedger: { id: '', title: '' }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }

    // LIFE_CYCLE
    componentDidMount() {
        this.getSubsiadaryLedgerList();
    }

    // HANDLE_FUNCTION
    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked
        })
    };

    // FUNCTION
    getSubsiadaryLedgerList() {
        let defaultCommand = {
            entity: ""
        }
        GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
            DropDownListDataProvider(this, "subsidiaryLedgerCodeList", response);
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    entity={
                        {
                            subsidiaryLedgerCode: this.state.subsidiaryLedgerCode.code,
                            detailLedgerCode: this.state.detailLedger.code
                        }
                    }
                    redirect={"/main/accounting/base/getManageAccountCodeRelation"}
                    service={AddManageAccountCodesRelationService.saveAccountCodes}
                    // disabled={!this.state.subsidiaryLedgerCode.code || !this.state.detailLedger.code}
                    className="form-height">
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={5}>
                            <div className="k-rtl">
                                <ComboBoxComponent isFilterable {...this.state.subsidiaryLedgerCodeList}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.subsidiaryLedgerCode} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <AutoCompleteComponent
                                    handleChange={(value) => this.handleChange(value, "detailLedger")}
                                    headerTemplate={detailLedgerHeaderTemplate}
                                    template={detailLedgerTemplate}
                                    fieldSearch={"searchPhrase"}
                                    label="کد تفصیل"
                                    field="fullTitle"
                                    value={this.state.detailLedger.fullTitle}
                                    placeholder="کد حساب یا کد تفصیل را وارد کنید"
                                    service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

AddManageAccountCodesRelation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddManageAccountCodesRelation);