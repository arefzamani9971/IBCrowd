import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Input from 'shared/components/formInput/inputForm';
import Fieldset from 'shared/components/fieldset/fieldset';
import SaveCustomerTradingCodeSerivces from '../services/SaveCustomerTradingCodeSerivces';
import GetPartyCodeWithMainMarketsService from '../services/GetPartyCodeWithMainMarkets';
import moment from 'moment';
import CustomerTradingCodesService from '../../customerTradingCodes/services/CustomerTradingCodeServices'
import GetPartyByIdService from '../../../../personsAndCustomers/customers/realCustomers/services/GetPartyByIdService';


class CreateCustomersTradingCodesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
                list: []
            },
            stateInfo: {},

            selectedParty: { fullName: '' },
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
            isConcatCode: true,
            list: [],
            stateInfo: {},
            isChangeParty: true,
            minDate: moment(new Date()).add(1, 'days')
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBourceCodeValid = this.handleBourceCodeValid.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);

    }
   
    componentDidMount() {
        if (this.props.history.location.state) {
            this.setState({

                stateInfo: JSON.parse(this.props.history.location.state)
            }, () => {
                let partyId = this.state.stateInfo.partyId;
                if (partyId > 0) {
                    this.getTradingCodeById(partyId);
                }

            })

        }
    }
    getTradingCodeById(partyId) {
        let command = {
            entity: partyId
        };
        GetPartyByIdService.getPartyById(command, (res) => {
          
            this.setState({
                selectedParty: res.result,
                isChangeParty: false
            }, () => {
                this.getAllPartyCodeWithMainMarkets();
            });
        });
    }

  




    getAllPartyCodeWithMainMarkets() {
        const command = {
            entity: this.state.selectedParty.id
        };
        GetPartyCodeWithMainMarketsService.getAllPartyCodeWithMainMarkets(command, (response) => {
            this.setState({
                list: response.result.mainMarkets,
                pamTSECode: response.result.pamTSECode
            })
        })
    };

    // getPartyCodeByPartyId() {
    //     var command = {
    //         entity: this.state.selectedParty.id
    //     };
    //     CustomerTradingCodesService.getPartyCodeByPartyId(command, (response) => {
    //         if (response.success) {
    //             this.getAllPartyCodeWithMainMarkets();
    //         }
    //     });
    // };


    handleAutoChange = (item) => {
        let value = item.value
        this.setState({
            selectedParty: value,
            pamTSECode: value.pamTSECode
        }, () => {
            if (this.state.selectedParty.id) {
                this.getAllPartyCodeWithMainMarkets();
            }
        })
    };

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleBourceCodeValid(value) {
        this.setState({
            tseBourseCodeValid: value
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
                <Header 
                
                {...this.props} back={this.state.stateInfo.backButton ? this.state.stateInfo.backButton : this.props.back}
                    backParams={
                        this.props.location.state === undefined ? undefined : {
                            partyId: this.state.stateInfo.partyId,
                            tabId: this.state.stateInfo.tabId
                        }

                    } 
                    />
                <Form
                    {...this.props}
                    {...this.state}
                    service={SaveCustomerTradingCodeSerivces.savepartycodeMethod}
                    redirectPage={this.state.stateInfo.backButton ?  "/main/persons/customers/completeRegisterLegalCustomer" : "/main/persons/customers/getCustomerTradingCodes"}

                    entity={
                        {
                            partyId: this.state.selectedParty.id,
                            // partyId: this.props.partyId,
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
                            nationalId: this.state.selectedParty.nationalId,
                            fullName: this.state.selectedParty.fullName
                        }
                    }
                >
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">

                        {
                            this.state.selectedParty.id && !this.state.isChangeParty ?
                                <React.Fragment>
                                    <Grid item md={3}>
                                        <h3><span>نام و نام خانوادگی: </span><strong>{this.state.selectedParty.fullName}</strong></h3>
                                    </Grid>
                                    {

                                        < Grid item md={3}>
                                            <h3><span>
                                                {
                                                    this.state.selectedParty.partyType === 1 ? "کد ملی: " : "شناسه ملی: "
                                                }

                                            </span><strong>{this.state.selectedParty.nationalId}</strong></h3>
                                        </Grid>
                                    }
                                </React.Fragment>

                                :
                                <Grid item md={12}>
                                    <AutoCompleteComplete
                                        {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.simpleSearchCustomers}
                                        required />
                                </Grid>
                        }

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
                                                    this.handleChange(e, 'pamTSECode')} value={this.state.pamTSECode}
                                                    disabled={!this.state.selectedParty.isForeignCustomer} />
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
                                                    handleOnChange={this.handleBourceCodeValid} minDate={this.state.minDate} />

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
export default withStyles(styles)(CreateCustomersTradingCodesComponent)