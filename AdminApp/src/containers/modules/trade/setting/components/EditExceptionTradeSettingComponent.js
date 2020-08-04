import React, { Component } from 'react';
import './EditExceptionTradeSettingComponent.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import EditExceptionTradeSettingService from './../services/EditExceptionTradeSettingService';
import toastr from 'toastr';
import Form from 'shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
var renderForm = false;

class EditExceptionTradeSettingComponent extends Component {
    constructor(props) {
        super(props);
  
            this.state = {
                settingTradeExceptionList: {
                    name: "ExceptionTypeSelected",
                    field: "title",
                    label: "نوع استثنا ",
                    list: []
                },

        }

        this.handleChangeDropdown=this.handleChangeDropdown.bind(this)

    }

    componentDidMount(){
        var self = this;//TODO API
        GetEnum("settingtypeforproducttype", (response) => DropDownListDataProvider(this, "settingTradeExceptionList", response, this.thenGetEnum(response)))
    }


    handleChangeDropdown(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        });

    }
    render() {
        return (
            <React.Fragment>
                <Paper className={"main-paper-container edit-wage-financial-tools"}>
                    <Grid item md={3}>
                        <div className="k-rtl">
                            <DropDownComponent
                               
                                {...this.state.settingTradeExceptionList}
                                handleChange={(value, name) => this.handleChangeDropdown(value, name)}
                                value={this.state.ExceptionTypeSelected}

                            />
                        </div>

                    </Grid>
                </Paper>

            </React.Fragment>
        );
    }
}

export default EditExceptionTradeSettingComponent;