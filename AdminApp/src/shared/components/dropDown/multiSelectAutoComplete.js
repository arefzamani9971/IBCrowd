import React from 'react';
import ReactDOM from 'react-dom';
import kendo from '@progress/kendo-ui';
import { MultiSelect } from '@progress/kendo-dropdowns-react-wrapper';
import { customerTemplate, customerHeaderTemplate } from 'constants/autoCompleteTemplate';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from 'containers/layout/panel/theme';
import './autocomplete.css'
let mainValue = '';
class MultiSelectAutoCompleteComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        var self = this;
        this.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    if (options) {
                        self.filterChangeAutoComplete(options);
                    }
                }
            },
            pageSize: 100,
            serverPaging: true,
            serverFiltering: true
        });



        this.dataTextField = this.props.dataTextField;
        this.dataValueField = this.props.dataValueField;
        this.filterChangeAutoComplete = this.filterChangeAutoComplete.bind(this);
        this.handleFilterItem = this.handleFilterItem.bind(this);
        // this.handleSelectedItem = this.handleSelectedItem.bind(this);
        // this.handleDeselectItem = this.handleDeselectItem.bind(this);
        // this.callAgain = this.callAgain.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.defaultValue !== this.props.defaultValue) {
    //                 this.setState({
    //             value: this.props.defaultValue,
    //         }, () => {
    //             this.forceUpdate()
    //         })
    //     }
    // }

    // callAgain(value){
    //     this.setState({
    //         value: value
    //     }, () => {
    //         value = value;
    //         this.forceUpdate()
    //     })
    // }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.defaultValue) {
    //         this.callAgain(nextProps.defaultValue);

    //         // this.setState({
    //         //     reRender : !this.state.reRender
    //         // }, () => {
    //         //     value =  nextProps.defaultValue;
    //         // })
    //     }

    // }


    // handleSelectedItem(e) {
    //     // let result=this.state.result;
    //     // result.push(e.dataItem);
    //     this.props.handleChange(e.dataItem);

    //     // let result = [];
    //     // result.push(e.dataItem);
    //     // this.setState({
    //     //     result: result
    //     // })
    //     // this.props.handleChange({ value: result });
    // }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    // handleDeselectItem(e) {

    //     // this.props.handleRemoveItem(e.dataItem);

    // }
    handleFilterItem(e) {
        this.setState({
            value: e.filter.value
        });
        if (e.filter.value === '') {
            this.props.handleChange({ value: [] });
        }
    }
    filterChangeAutoComplete = (options) => {
        let command = {
            reportFilter: {
                // [this.props.fieldSearch]: this.state.value
                [this.props.fieldSearch]: mainValue
            },
            optionalFilter: {
                take: 25,
                page: 1,
            }
        };
        let self = this;
        this.props.service(command, function (response) {
            if (response.success) {
                response.totalRecords = response.result.length;
                if (self.props.initialValue) {
                    let initialValue = response.result.find(r => {
                        return r[initialValue.field] === initialValue.value
                    });
                    // self.setState({value:initialValue});
                }
                options.success(response.result);
            }

        })
    };


    changeItems = (e) => {
        if(e.filter){
            mainValue = e.filter.value;
            this.dataSource.transport.read();
        }
        // if (e.filter === undefined) {
        //     mainValue = '';
        //     this.dataSource.transport.read();
        // } else {
        //     mainValue = e.filter.value;
        //     this.dataSource.transport.read();

        // }
    };

    handleChange(e, name) {
        this.props.handleChange({ value: e.sender.value() }, name);
    }

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControlAutoComplete + this.props.classes} xs={8} variant="outlined" error={this.state.error} fullWidth>
                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    className={!this.state.error ? classes.inputLabelOutLineFoccusedMultiSelect : classes.inputLabelOutLineErrorMultiSelect}
                    htmlFor={this.props.id}
                >
                    {this.props.required ? <span class="required-star" >*</span> : ''}
                    {this.props.label}
                </InputLabel>

                <MultiSelect
                    ref={(auto) => { this.autoComplete = auto; }}
                    dataSource={this.dataSource}
                    dataTextField={this.dataTextField}
                    dataValueField={this.dataValueField}
                    minLength={3}
                    autoWidth={true}
                    placeholder={this.props.placeholder}
                    select={this.handleSelectedItem}
                    deselect={this.handleDeselectItem}
                    filtering={this.changeItems}
                    headerTemplate={this.props.headerTemplate}
                    itemTemplate={this.props.template}
                    value={this.props.defaultValue}
                    autoBind={false}
                    enable={!this.props.disabled}
                    change={(e) => this.handleChange(e, this.props.name)}
                />
            </FormControl>

        )
    }
}
MultiSelectAutoCompleteComponent.defaultProps = {
    template: customerTemplate,
    headerTemplate: customerHeaderTemplate,
    fieldSearch: "pharse",
    disabled: false,
    defaultValue: []
};

export default withStyles(styles)(MultiSelectAutoCompleteComponent);