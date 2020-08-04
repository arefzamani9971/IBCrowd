import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Submit from 'shared/components/submitAction/actionSubmit';
import Form from 'shared/components/form/form';
import SaveVoucherTypeManagementPriorityService from '../services/SaveVoucherTypeManagementPriorityService';
import GetVoucherTypeManagamentService from '../services/GetVoucherTypeManagamentService';
import UpdateVoucherTypeManagmentPriorityService from '../services/UpdateVoucherTypeManagmentPriorityService';

class EditVoucherTypeManagmentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            priority: undefined,
            dayOfAutomaticLock: undefined,
            code: 0
        }
    };

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    componentDidMount() {
        GetVoucherTypeManagamentService.getfullvouchercategoryMethod({ entity: this.props.location.state.code }, (res) => {
            const { title, priority, dayOfAutomaticLock, code } = res.result;
            this.setState({
                title,
                priority,
                dayOfAutomaticLock,
                code,
            })
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
                            code: this.state.code,
                            title: this.state.title,
                            priority: this.state.priority === undefined ? 0 : parseInt(this.state.priority, 10),
                            dayOfAutomaticLock: this.state.dayOfAutomaticLock === undefined ? 0 : parseInt(this.state.dayOfAutomaticLock, 10),
                        }
                    }
                    service={UpdateVoucherTypeManagmentPriorityService.updatevouchercategoryMethod}
                    className="form-height"
                    // disabled={this.state.title == undefined || this.state.title == null || 
                    //         this.state.priority == undefined || this.state.priority == null ||
                    //         this.state.dayOfAutomaticLock == undefined || this.state.dayOfAutomaticLock == null}
                // SubmitTitle={'ذخیره و تکمیل اطلاعات'}
                // otherAction={[
                //     {
                //         color: "#43a047",
                //         title: 'ذخیره و ثبت مشتری جدید',
                //         action: {
                //             isSubmit: true,
                //             method: this.refresh
                //         }
                //     }
                // ]}
                >
                    <Fieldset legend={'اطلاعات نوع سند'}>
                        <Grid container spacing={8}>
                            <Grid item md={6}>
                                <Input label="عنوان" handleChange={(e) => this.handleChange(e, 'title')} value={this.state.title} required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <NumberFormatComponent
                                        id=""
                                        label="رتبه مرتب سازی"
                                        value={this.state.priority}
                                        handleChange={(value, error) => this.handleChange(value, 'priority')}
                                        type="number"
                                        isSeparator={false}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <NumberFormatComponent
                                        id=""
                                        label="تعداد روز قفل خودکار"
                                        value={this.state.dayOfAutomaticLock}
                                        handleChange={(value, error) => this.handleChange(value, 'dayOfAutomaticLock')}
                                        type="number"
                                        isSeparator={false}
                                        required
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Form>
            </React.Fragment>
        )
    }
}
EditVoucherTypeManagmentComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditVoucherTypeManagmentComponent);