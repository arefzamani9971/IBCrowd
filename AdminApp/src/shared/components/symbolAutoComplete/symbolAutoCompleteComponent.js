
import React, { Component } from 'react';
import symbolAutoCompleteService from './symbolAutoCompleteService';
import { symbolTemplate, symbolHeaderTemplate } from 'constants/autoCompleteTemplate';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';

class SymbolAutoCompleteComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      symbol: {
        name: "selectedSymbol",
        field: "symbol",
        headerTemplate: symbolHeaderTemplate,
        template: symbolTemplate,
        fieldSearch: "phrase",
        label: "عنوان نماد"
      },
      selectedSymbol: { id: 0, fullProductName: '' },
    };
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
  }
  handleSymbolChange(value) {
    
    this.setState({ selectedSymbol: value.value },()=>{
      this.props.handleSymbolChange(this.state.selectedSymbol)
    });
  }
  render() {
    return (

      <React.Fragment>
        <AutoCompleteComponent

          {...this.state.symbol}
          handleChange={(value) => this.handleSymbolChange(value)}
          value={this.state.selectedSymbol.title}
          service={symbolAutoCompleteService.searchSymbol}
          hasBond={this.props.hasBond}
          required={this.props.required}
        />
      </React.Fragment>
    );
  }
}


SymbolAutoCompleteComponent.defaultProps = {
  hasBond: false
}

export default SymbolAutoCompleteComponent;