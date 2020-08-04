import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import Input from 'shared/components/formInput/inputForm';
import Fieldset from 'shared/components/fieldset/fieldset';
import GetPartyCodeWithMainMarketsService from '../../customerTradingCodes/services/GetPartyCodeWithMainMarkets';
import GetPartyByIdService from '../../realCustomers/services/GetPartyByIdService';
import CustomerTradingCodesService from '../../customerTradingCodes/services/CustomerTradingCodeServices';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
class EditLegalCustomersTradingCodesComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            partyId: this.props.location.state.partyId,
            partyFullName: '',
            nationalId: '',
            isConcatCode: true,
            //TSE
            pamTSECode: '',
            thirdOldTSEBourseCode: '',
            secondOldTSEBourseCode: '',
            firstOldTSEBourseCode: '',
            tseBourseCodeValid: null,
            tseBourseCode: '',
            //IME
            imeBourseCode: '',
            imeBuyerBourseCode: '',
            imeSellerCode: '',
            imeFutureCode: '',
            //EFP and IEE
            pamIEECode: '',
            ieeBourseCode: '',
            pamEFPCode: '',
           minDate: moment(new Date()).add(1, 'days')
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBourceCodeValid = this.handleBourceCodeValid.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }
    componentDidMount() {
        this.getPartyById();
    }

    getPartyById() {
        let command = {
            entity: this.state.partyId
        };
        GetPartyByIdService.getPartyById(command, (res) => {
            this.setState({
                partyFullName: res.result.fullName,
                nationalId: res.result.nationalId
            });
            this.getAllPartyCodeWithMainMarkets();
        });
    }

    getAllPartyCodeWithMainMarkets = () => {
        const body = {
            entity: this.state.partyId
        };
        GetPartyCodeWithMainMarketsService.getAllPartyCodeWithMainMarkets(body, (response) => {
            this.setState({
                list: response.result.mainMarkets
            }, () => {
                this.getPartyCodeByPartyId();
            })
        })
    };

    getPartyCodeByPartyId = () => {
        var command = {
            entity: this.state.partyId
        };
        CustomerTradingCodesService.getPartyCodeByPartyId(command, (response) => {
            this.setState({
                //TSE
                pamTSECode: response.result.pamTSECode,
                thirdOldTSEBourseCode: response.result.thirdOldTSEBourseCode,
                secondOldTSEBourseCode: response.result.secondOldTSEBourseCode,
                firstOldTSEBourseCode: response.result.firstOldTSEBourseCode,
                tseBourseCodeValid: response.result.tseBourseCodeValidJalali !== '' ? response.result.tseBourseCodeValid : null,
                tseBourseCode: response.result.tseBourseCode,
                //IME
                imeBourseCode: response.result.imeBourseCode,
                imeBuyerBourseCode: response.result.imeBuyerBourseCode,
                imeSellerCode: response.result.imeSellerCode,
                imeFutureCode: response.result.imeFutureCode,
                //EFP and IEE
                pamIEECode: response.result.pamIEECode,
                ieeBourseCode: response.result.ieeBourseCode,
                pamEFPCode: response.result.pamEFPCode
            })
        });
    };
    handleBourceCodeValid(value) {
        this.setState({
            tseBourseCodeValid: value
        })
    }
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleChangeCheck = event => {
        if (!event.target.checked) {
            let persianRegex = /^[\u0600-\u06FF\s0-9]+$/;
            let arrayCode = this.state.tseBourseCode.trim();
            arrayCode = arrayCode.split(/([0-9]+)/).filter(Boolean);
            let bourseCode = '';
            if (persianRegex.test(this.state.tseBourseCode) && arrayCode.length <= 2) {
               
                bourseCode = arrayCode[1] ? `${arrayCode[0]}ـ${arrayCode[1]} ` : `${arrayCode[0]}ـ`;
            } else {
                bourseCode = this.state.tseBourseCode;
            }
            this.setState({
                tseBourseCode: bourseCode
            })
        } else {
            this.setState({
                tseBourseCode: this.state.tseBourseCode.replace(/[ـ]/g, '')
            })
        }
        this.setState({
            isConcatCode: event.target.checked,
        })
    };
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} backParams={
                    this.props.location.state === undefined ? undefined : {
                        path: this.props.location.state.backPath,
                        customeBackInfo: true,
                        partyId: this.props.location.state.partyId,
                        tabId: 5,

                    }
                } />
                <Form
                    {...this.props}
                    {...this.state}
                    service={GetPartyCodeWithMainMarketsService.updatePartyCode}
                    entity={
                        {
                            id: this.props.location.state.id,
                            partyId: this.state.partyId,
                            tseBourseCode: this.state.tseBourseCode,
                            tseBourseCode: this.state.tseBourseCode,
                            tseBourseCodeValid: this.state.tseBourseCodeValid,
                            firstOldTSEBourseCode: this.state.firstOldTSEBourseCode,
                            secondOldTSEBourseCode: this.state.secondOldTSEBourseCode,
                            thirdOldTSEBourseCode: this.state.thirdOldTSEBourseCode,
                            pamTSECode: this.state.pamTSECode,
                            pamIEECode: this.state.pamIEECode,
                            pamEFPCode: this.state.pamEFPCode,
                            ieeBourseCode: this.state.ieeBourseCode,
                            imeBourseCode: this.state.imeBourseCode,
                            imeBuyerBourseCode: this.state.imeBuyerBourseCode,
                            imeSellerCode: this.state.imeSellerCode,
                            imeFutureCode: this.state.imeFutureCode,
                            nationalId: this.state.nationalId,
                            fullName: this.state.partyFullName
                        }
                    }

                    cancelModal={() => { }}
                    afterSubmit={
                        () => {

                            this.props.history.push(
                                {
                                    pathname: "/main/persons/customers/completeRegisterLegalCustomer",
                                    state: {
                                        customeBackInfo: true,
                                        partyId: this.state.partyId,
                                        tabId: 5,
                                    }
                                }
                            );
                        }
                    }
                >
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <h3><span>نام/ نام خانوادگی: </span><strong>{this.state.partyFullName}</strong></h3>
                            </Grid>
                            <Grid item md={3}>
                                <h3><span>شناسه ملی: </span><strong>{this.state.nationalId}</strong></h3>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    {this.state.list.map(value => {
                        return (
                            value.id === 1
                                ?
                                <React.Fragment>
                                    <Fieldset legend={value.title}>
                                        <Grid container spacing={16} className="no-margin">
                                            <Grid item md={3}>
                                                <Input label="پم کد معاملات بورسی اوراق" handleChange={(e) =>
                                                    this.handleChange(e, 'pamTSECode')} value={this.state.pamTSECode} />
                                            </Grid>
                                            <Grid item md={3}>
                                                <Input label="کد بورسی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'tseBourseCode')} value={this.state.tseBourseCode} />
                                            </Grid>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.isConcatCode}
                                                        onChange={this.handleChangeCheck}
                                                        value="isConcatCode"
                                                        color="primary"
                                                    />
                                                }
                                                label="حروف بزرگ"
                                            />
                                            <Grid item md={3}>
                                                <PersianDatePicker selectedDate={this.state.tseBourseCodeValid} label="تاریخ اعتبار کد بورسی معاملات اوراق"
                                                    handleOnChange={this.handleBourceCodeValid} minDate={this.state.minDate}/>

                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={16} className="no-margin">
                                            <Grid item md={3}>
                                                <Input label="اولین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'firstOldTSEBourseCode')}
                                                    value={this.state.firstOldTSEBourseCode} disabled />
                                            </Grid>
                                            <Grid item md={3}>
                                                <Input label="دومین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'secondOldTSEBourseCode')}
                                                    value={this.state.secondOldTSEBourseCode} disabled />

                                            </Grid>
                                            <Grid item md={3}>
                                                <Input label="سومین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'thirdOldTSEBourseCode')}
                                                    value={this.state.thirdOldTSEBourseCode} disabled />

                                            </Grid>
                                        </Grid>
                                    </Fieldset>
                                    <br />
                                </React.Fragment>

                                :
                                value.id === 2
                                    ?
                                    <React.Fragment>
                                        <Fieldset legend={value.title}>
                                            <Grid container spacing={16} className="no-margin">
                                                <Grid item md={2}>
                                                    <Input label="کد بورسی معاملات کالا" handleChange={(e) => this.handleChange(e, 'imeBourseCode')}
                                                        value={this.state.imeBourseCode} />
                                                </Grid>
                                                <Grid item md={3}>
                                                    <Input label="کد بورسی آتی کالا" handleChange={(e) => this.handleChange(e, 'imeFutureCode')}
                                                        value={this.state.imeFutureCode} />
                                                </Grid>
                                                <Grid item md={3}>
                                                    <Input label="کد بورسی معاملات کالا/ خریدار" handleChange={(e) => this.handleChange(e, 'imeBuyerBourseCode')}
                                                        value={this.state.imeBuyerBourseCode} />
                                                </Grid>
                                                <Grid item md={3}>
                                                    <Input label="کد بورسی معاملات کالا/ فروشنده" handleChange={(e) => this.handleChange(e, 'imeSellerCode')}
                                                        value={this.state.imeSellerCode} />
                                                </Grid>

                                            </Grid>
                                        </Fieldset>
                                        <br />
                                    </React.Fragment>
                                    :
                                    value.id === 3
                                        ?
                                        <React.Fragment>
                                            <Fieldset legend={value.title}>
                                                <Grid container spacing={16} className="no-margin">
                                                    <Grid item md={3}>
                                                        <Input label="پم کد معاملات بورس انرژی/ برق"
                                                            handleChange={(e) => this.handleChange(e, 'pamIEECode')} value={this.state.pamIEECode} />
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Input label="کد بورسی معاملات انرژی/ برق" handleChange={(e) => this.handleChange(e, 'ieeBourseCode')}
                                                            value={this.state.ieeBourseCode} />
                                                    </Grid>

                                                </Grid>
                                                <Grid container spacing={16} className="m-0">
                                                    <Grid item md={3}>
                                                        <Input label="پم کد معاملات بورسی انرژی/ فیزیکی" handleChange={(e) => this.handleChange(e, 'pamEFPCode')}
                                                            value={this.state.pamEFPCode} />
                                                    </Grid>
                                                </Grid>
                                            </Fieldset>
                                            <br />
                                        </React.Fragment>
                                        :
                                        null

                        )
                    }
                    )}

                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(EditLegalCustomersTradingCodesComponentTab)