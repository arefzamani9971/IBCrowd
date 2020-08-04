import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import Email from 'shared/components/email/email'
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import AddUserService from '../services/CreateUserService';
import GetUsersService from '../services/GetUsersService';
import PhoneNumber from 'shared/components/phoneNumber/phoneNumber';
import GetAllMainMarkets from '../../../../../../services/GetAllMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';

class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            userRole: { id: 0 },
            password: '',
            confirmedPassword: '',
            userRoles: {
                list: [],
                name: "userRole",
                field: "name",
                label: "نقش کاربر",

            },
            branches: {
                name: "branch",
                field: "title",
                label: "شعبه",
                list: []
            },
            mainMarket: {
                name: "selectedMainMarkets",
                field: "title",
                label: "بازار",
                list: []
            },
            branch: { id: 0, },
            selectedMainMarkets: []

        }
        this.successGetBranch = this.successGetBranch.bind(this);
        this.successGetRoles = this.successGetRoles.bind(this);
        this.successGetAllMainMarkets = this.successGetAllMainMarkets.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.getBranches();
        this.getUserRoles();
        this.getAllMainMarkets();
    }

    getAllMainMarkets() {
        GetAllMainMarkets(this.successGetAllMainMarkets)
    }

    successGetAllMainMarkets(response) {
        if (response.result) {

            this.setState({
                mainMarket: {
                    name: "selectedMainMarkets",
                    field: "title",
                    label: "بازار",
                    list: response.result
                }
            })
        }
    }

    getBranches() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        GetBranchService.getBranchesByFilter(command, this.successGetBranch);
    }

    successGetBranch(response) {
        if (response.result) {
            this.setState({
                branches: {
                    name: "branch",
                    field: "title",
                    label: "شعبه",
                    list: response.result
                }
            })
        }
    }

    getUserRoles() {
        var command = {
            ReportFilter: ""
        }
        GetUsersService.getAllRole(command, this.successGetRoles);
    }

    successGetRoles(response) {

        if (response.result) {
            this.setState({
                userRoles: {
                    name: "userRole",
                    field: "name",
                    label: "نقش کاربر",
                    list: response.result
                }
            })
        }
    }

    handleChange(value, name) {

        let item = value.value;

        this.setState({
            [name]: item
        });
    }

    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddUserService.addNewUser}
                    entity={
                        {
                            userName: this.state.userName,
                            password: this.state.password,
                            email: this.state.email,
                            displayName: this.state.fullName,
                            mobile: this.state.phoneNumber,
                            branchId: this.state.branch.id,
                            roleId: this.state.userRole.id,
                            mainMarketIds: this.state.selectedMainMarkets.length > 0 ? this.state.selectedMainMarkets.map(m => { return m.id }) : []
                        }
                    }
                    disabled={this.state.userName == '' || this.state.password == '' || this.state.phoneNumber == '' || this.state.password == '' ||
                        this.state.confirmedPassword == '' || this.state.confirmedPassword != this.state.password || !this.state.branch.id || this.state.branch.id == 0 ||
                        this.state.userRole.id == 0 || this.state.selectedMainMarkets.length == 0}
                    className="form-height"
                >
                    <Grid container spacing={8}>
                        <Grid item md={12}>

                            <Grid item md={11}>
                                <Input label="نام و نام خانوادگی" required handleChange={(e) => this.handleChange(e, 'fullName')} value={this.state.fullName} />
                            </Grid>

                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Input label="نام کاربری" required handleChange={(e) => this.handleChange(e, 'userName')} value={this.state.userName} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Email handleChange={(e) => this.handleChange(e, 'email')} value={this.state.email} isLeftStartText={true} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <PhoneNumber
                                    require={true}
                                    id="mobile" label="شماره همراه"
                                    value={this.state.mobile}
                                    handleChange={(value) => this.handleChange(value, 'mobile')} type="number"
                                />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>

                            <Grid item md={11}>
                                <Input label="رمز عبور" type="password" required
                                    handleChange={(e) => this.handleChange(e, 'password')} value={this.state.password} />
                            </Grid>

                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Input label="تایید رمز عبور"
                                    externalError={this.state.confirmedPassword != '' && this.state.password !== this.state.confirmedPassword}
                                    externalErrorDescription="رمز عبور با تکرارش مطابقت ندارد"
                                    type="password" required handleChange={(e) => this.handleChange(e, 'confirmedPassword')} value={this.state.confirmedPassword} />
                            </Grid>
                        </Grid>


                        <Grid item md={12}>
                            <Grid item md={11}>
                                <ComboBoxComponent required  {...this.state.branches}
                                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                    value={this.state.branch} />
                            </Grid>
                        </Grid>
                        <Grid container md={12} className="p-1">
                            <Grid item md={4} className="pl-2">
                                <div className="k-rtl">
                                    <DropDownComponent required {...this.state.userRoles} isFilterable={true}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.userRole} />
                                </div>
                            </Grid>
                            <Grid item md={5}>
                                <div className="k-rtl">
                                    <MultiSelectComponent {...this.state.mainMarket}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="mainMarket"
                                        value={this.state.selectedMainMarkets} required />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }
}
AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default AddUser;