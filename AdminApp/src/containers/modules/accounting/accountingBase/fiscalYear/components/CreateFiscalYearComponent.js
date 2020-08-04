/* #region imports */
import React from 'react';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from 'shared/components/stateHeader/stateHeader'
import Input from 'shared/components/formInput/inputForm'
import CreateFiscalYearService from "../services/CreateFiscalYearService";
import GetFiscalGroupsService from "../../fiscalGroup/services/GetFiscalGroupsService";
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import moment from 'moment';
import Form from 'shared/components/form/form';

/* #endregion */

class AddFiscalYear extends React.Component {
    constructor(props) {
        super(props);

        let date = new Date();
        let fromDate = date.setDate(date.getDate() - 60);
        this.state = {
            fiscalGroup: {
                name: "selectedFiscalGroup",
                field: "title",
                label: "گروه مالی",
                type: "client",
                list: []
            },
            selectedFiscalGroup: {},
            title: '',

            fromDate: moment(fromDate),
            toDate: moment(new Date()),
            showAutocomplete: false,

            
        }
        
        this.successGetFiscalGroups = this.successGetFiscalGroups.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.handleChangeToDate = this.handleChangeToDate.bind(this);
    }

    componentDidMount() {
        GetFiscalGroupsService.getFiscalGroups({}, this.successGetFiscalGroups)

    }

    successGetFiscalGroups(response) {
            if(response.success){
                if (response.result && response.result.length > 0) {
                    this.setState({
                        fiscalGroup: {
                            name: "selectedFiscalGroup",
                            field: "title",
                            label: "گروه مالی",
                            type: "client",
                            list: response.result
                        }
                    })
                }
            }
          
        

    }

    handleChangeFromDate(fromDate) {

        this.setState({ fromDate });
    }
    handleChangeToDate(toDate) {

        this.setState({ toDate });
    }

    handleChangeCheck = name => (event) => {

        this.setState({ showAutoComplete: event.target.checked, [name]: event.target.checked })

    }

    handleChange(value, name) {
        let item = value.value
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
                    entity={{
                        fiscalGroupId: this.state.selectedFiscalGroup.id,
                        startDate: this.state.fromDate,
                        endDate: this.state.toDate,
                        title: this.state.title,
                    }}
                    service={CreateFiscalYearService.DoSave}
                    isSave
                    // disabled={!this.state.title || !this.state.selectedFiscalGroup.id}
                >
                    <Grid container spacing={8} >
                        <Grid item md={12}>
                            <Grid item md={5} >
                                <Input label="عنوان" required handleChange={(value) => this.handleChange(value, 'title')} id="title" value={this.state.title} />
                                {/* <Autocomplete label="عنوان گروه مالی" data={this.state.fiscalGroups} handleChange={this.handleChangeFiscalGroup} title="title" /> */}
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.fiscalGroup}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedFiscalGroup} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={2} >
                            <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={this.handleChangeFromDate} selectedDate={this.state.fromDate} />
                        </Grid>
                        <Grid item md={2} >
                            <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={this.handleChangeToDate} selectedDate={this.state.toDate} />
                        </Grid>

                    </Grid>
                </Form>
            </React.Fragment>
        )
    }



}

export default withStyles(styles)(AddFiscalYear);
