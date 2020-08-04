import React from 'react';
import kendo from '@progress/kendo-ui';
import ReactDOM from 'react-dom';
import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import { customerTemplate, customerHeaderTemplate } from 'constants/autoCompleteTemplate'
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from 'containers/layout/panel/theme';
import './autocomplete.css';

class AutoCompleteComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.list,
            value: this.props.value,
        };

        let self = this;
        this.dataSource = new kendo.data.DataSource({

            transport: {
                read: function (option) {
                    if (option) {
                        self.filterChangeAutoComplete(option);
                    }
                }
            },
            pageSize: 100,
            serverPaging: true,
            serverFiltering: true,
            schema: {

                data: "result",
                total: "totalRecords",
            }
        })

        this.filterChangeAutoComplete = this.filterChangeAutoComplete.bind(this);
        this.handleFilterItem = this.handleFilterItem.bind(this);
        this.focus = this.focus.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        if (this.props.focus)
            this.focus();
        if (this.props.keyDownPress)
            this.autoComplete.widgetInstance.element[0].addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(event) {

        this.props.onKeyDownPress(event);
    }


    componentDidUpdate(prevProps) {

        if (this.state.value && this.state.value.length >= 3) {
            this.dataSource.transport.read();
        }
        if (prevProps !== this.props) {
            this.setState({
                data: this.props.list,
                value: this.props.value
            })
        }

    }


    handleSelectedItem(e) {
        this.setState({
            value: e.dataItem
        })
        this.props.handleChange({ value: e.dataItem });
    }


    handleFilterItem(e) {
        this.setState({
            value: e.filter.value
        });
        if(!e.filter.value){  
            e.preventDefault();
          }
    }

    focus() {
        this.autoComplete.widgetInstance.element[0].focus()
    }
    filterChangeAutoComplete = (option) => {


        var command = {
            optionalFilter: {
                take: 100,
                page: 1,
            },
            reportFilter: {},
        }
        if (this.props.additionalFilter) {
            Object.entries(this.props.additionalFilter).forEach(function ([key, value]) {
                command.reportFilter[key] = value;
            });
            command.reportFilter[this.props.fieldSearch] = this.state.value;
        } else {
            command = {
                reportFilter: {
                    [this.props.fieldSearch]: this.state.value,
                    hasBond : this.props.hasBond
                },
                optionalFilter: {
                    take: 100,
                    page: 1,
                    sort:this.props.sort
                }
            }
            if(this.state.value === undefined){
                command.reportFilter.phrase="";
            }
        }
        var self = this;
        this.props.service(command, function (response) {
                response.totalRecords = response.result.length;
                if (self.props.initialValue) {
                    var initialValue = response.result.find(r => {
                        return r[initialValue.field] === initialValue.value
                    });
                    self.setState({ value: initialValue });
                }
                option.success(response);
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControlAutoComplete} xs={8} variant="outlined" error={this.state.error} fullWidth>
                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    className={!this.state.error ? classes.inputLabelOutLineFoccused : classes.inputLabelOutLineErrorFoccused}

                    htmlFor={this.props.id}
                >
                    {this.props.required ?
                        <span class="required-star" >*</span> : ''
                    }
                    {this.props.label}
                </InputLabel>

                <AutoComplete

                    ref={(auto) => { this.autoComplete = auto; }}
                    dataSource={this.dataSource}
                    dataTextField={this.props.field}
                    minLength={this.props.minLength}
                    autoWidth={true}
                    headerTemplate={this.props.headerTemplate}
                    template={this.props.template}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    filtering={(e) => this.handleFilterItem(e)}
                    select={(e) => this.handleSelectedItem(e)}
                    virtual={{ itemHeight: 26 }}
                    enable={this.props.enable}
              
            
                />


            </FormControl>

        )
    }
}
AutoCompleteComponent.defaultProps = {
    template: customerTemplate,
    headerTemplate: customerHeaderTemplate,
    fieldSearch: "pharse",
    additionalFilter: false,
    roleCode: 0,
    minLength: 3,
    enable: true,
    sort:[],
    hasBond : false
    // schemaField:"result"

}

export default withStyles(styles)(AutoCompleteComponent);