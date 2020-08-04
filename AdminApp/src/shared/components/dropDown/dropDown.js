import React from 'react';
import kendo from '@progress/kendo-ui';
// import '@progress/kendo-ui';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import { filterBy } from '@progress/kendo-data-query';
import { ComboBox } from '@progress/kendo-react-dropdowns';



class DropDownComponent extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: this.props.list,
            value: this.props.value,
            loading: false,
        };
        this.filterChange = this.filterChange.bind(this);
        this.filterData = this.filterData.bind(this);
    }


    successGetFromService(response) {
        this.setState({ list: response.result });
    }
    componentDidMount() {
        let list = this.props.list;

        let list2 = [];
        let all = { title: "همه", code: -1 };
        if (list !== undefined) {

            list2 = list.filter((value) => {
                return value.code === -1;

            });
            if (list2.length === 0 && this.props.hasAll) {
                list.unshift(all);
            }
        }

        this.setState({
            data: list,
            value: this.props.value
        })


    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps !== this.props) {
            let list = this.props.list;
            let list2 = [];
            let all = { title: "همه", code: -1 };
            if (list !== undefined) {

                list2 = list.filter((value) => {
                    return value.code === -1;
                });
                if (list2.length === 0 && this.props.hasAll) {
                    list.unshift(all);
                }
            }
            this.setState({
                data: list,
                value: this.props.value
            })

        }
    }


    filterChange = (event) => {
        this.setState({
            data: this.filterData(event.filter)
        });
    };

    filterData(filter) {
        const data = this.props.list.slice();
        return filterBy(data, filter);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        this.props.handleChange({ value: e.target.value }, this.props.name);
    }

    handleBlur(e) {
        this.props.handleChange({ value: e.target.value }, this.props.name);
    }


    render() {

        switch (this.props.type) {
            case 'client':

                return (
                    <div className="k-rtl">


                        <div className="example-col">


                            {/*{this.props.required ? <span class="required-star-dropdown" >*</span> : ''}*/}

                            <DropDownList
                                data={this.state.data}
                                dataItemKey={this.props.dataItemKey}
                                textField={this.props.field}
                                filterable={this.props.isFilterable}
                                label={this.props.required ? <React.Fragment><span style={{ color: 'red' }}>*</span>{this.props.label}</React.Fragment> : this.props.label}
                                onFilterChange={this.filterChange}
                                value={this.state.value}
                                onChange={(e) => this.handleChange(e)}
                                // onClose={(e) => this.handleBlur(e)}
                                disabled={this.props.isDisabled}
                                className={"font-size-13 height-35"}
                                
                              
                            >
                            </DropDownList>
                        </div>

                    </div>

                );

            case 'server':
                return (
                    <DropDownList
                        data={!this.props.service ? this.state.data : this.state.list}
                        textField={this.props.field}
                        filterable={this.props.isFilterable}
                        label={this.props.label}
                        onFilterChange={this.serverFilterChange}
                        value={this.state.value}
                        onClose={(e) => this.handleChange(e, this.props.name)}
                    />
                );

            default: return ''


        }

    }
}
DropDownComponent.defaultProps = {
    type: 'client',
    data: [],
    field: 'title',
    isDisabled: false,
    dataItemKey: '',
    hasAll: false,
    // defaultItem: undefined,
    // defaultValue: undefined

}
export default DropDownComponent;