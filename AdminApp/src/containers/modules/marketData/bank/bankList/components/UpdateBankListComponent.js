import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Input from 'shared/components/formInput/inputForm'
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import UpdateBankListService from "../services/UpdateBankListService";

class UpdateBankListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bankType: {
                name: "selectedBankType",
                field: "title",
                label: "نوع بانک",
                list: []
            },
            selectedBankType: { code: 0, title: '' },
            bankStatus: {
                name: "selectedBankStatus",
                field: "title",
                label: "وضعیت",
                list: []
            },
            selectedBankStatus: { code: 0, title: '' },


        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        GetEnum('BankType', response => DropDownListDataProvider(this, "bankType", response));
        GetEnum('BankStatus', response => DropDownListDataProvider(this, "bankStatus", response));

    }

    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            bankType: this.state.selectedBankType.code,
                            bankStatus: this.state.selectedBankStatus.code

                        }
                    }
                    service={UpdateBankListService.updatecashflowchequemasterMethod}
                    className="form-height">
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نام بانک</Grid>
                        <Grid item md={6}>نام لاتین بانک</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <Input label="نام بانک" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={6}>
                            <Input label="نام لاتین بانک" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>کد</Grid>
                        <Grid item md={6}>شناسه ملی</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <Input label="کد" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={6}>
                            <Input label="شناسه ملی" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>وضعیت</Grid>
                        <Grid item md={6}>وضعیت</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.bankType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedBankType} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <Input label="وضعیت" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نوع دستگاه</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.bankStatus}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedBankStatus} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateBankListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateBankListComponent);