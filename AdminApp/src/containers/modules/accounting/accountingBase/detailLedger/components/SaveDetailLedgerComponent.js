import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import SaveDetailLedgerService from '../services/SaveDetailLedgerService';

class SaveDetailLedger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            title: '',
            accountClassTitle: {
                name: "accountClassTitle",
                field: "title",
                label: "نوع حساب تفصیل",
                list: []
            },
            selectedAccountClassTitle: {
                code: 0
            },
            status: false,
            requiredCostCenter: false,
            isAnalyzable: false,
            hasDetail: false,
            requiredSeasonalReport: false,
            description: ''
        };
    }

    // LIFE_CYCLE
    componentDidMount() {
        this.getAccountClass();
    }

    // HANDLE_FUNCTION
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleChangeAccountClassEnum = (value) => {
        this.setState({
            selectedAccountClassTitle: value.value
        })
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };

    // FUNCTION
    getAccountClass() {
        GetEnum("accountclass", (response) => {
            if (response.result) {
                this.setState({
                    selectedAccountClassTitle: response.result.filter(item => { return item.code == 1 })[0],
                    accountClassTitle: {
                        name: "accountClassTitle",
                        field: "title",
                        label: "نوع حساب تفصیل",
                        list: response.result
                    }
                })
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            code: this.state.code,
                            title: this.state.title,
                            accountClassTitle: this.state.selectedAccountClassTitle.code,
                            status: this.state.status,
                            requiredCostCenter: this.state.requiredCostCenter,
                            isAnalyzable: this.state.isAnalyzable,
                            hasDetail: this.state.hasDetail,
                            requiredSeasonalReport: this.state.requiredSeasonalReport,
                            description: this.state.description
                        }
                    }
                    redirect={"/main/accounting/base/getDetailLedger"}
                    service={SaveDetailLedgerService.savedetailledgers}
                    className="form-height">
                    <Grid container spacing={8} className="margin-bottom-30">
                        <Grid item md={3}>
                            <Input label="کد حساب" handleChange={(e) => this.handleChange(e, 'code')} value={this.state.code} />
                        </Grid>
                        <Grid item md={3}>
                            <Input label="عنوان" handleChange={(e) => this.handleChange(e, 'title')} value={this.state.title} />
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.accountClassTitle}
                                    handleChange={(value) => this.handleChangeAccountClassEnum(value)}
                                    value={this.state.selectedAccountClassTitle} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="margin-bottom-30">
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.status}
                                        onChange={this.handleChangeCheck('status')}
                                        value=""
                                        color="primary" />
                                }
                                label="فعال" />
                        </Grid>
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.requiredCostCenter}
                                        onChange={this.handleChangeCheck('requiredCostCenter')}
                                        value=""
                                        color="primary" />
                                }
                                label="مرکز هزینه اجباری" />
                        </Grid>
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isAnalyzable}
                                        onChange={this.handleChangeCheck('isAnalyzable')}
                                        value=""
                                        color="primary" />
                                }
                                label="آنالیزپذیر" />
                        </Grid>
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.hasDetail}
                                        onChange={this.handleChangeCheck('hasDetail')}
                                        value=""
                                        color="primary" />
                                }
                                label="تفصیل پذیر" />
                        </Grid>
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.requiredSeasonalReport}
                                        onChange={this.handleChangeCheck('requiredSeasonalReport')}
                                        value=""
                                        color="primary" />
                                }
                                label="اعمال در گزارش فصلی" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item md={9}>
                            <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} isMultiLine={true} />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        );
    }

};

export default SaveDetailLedger;