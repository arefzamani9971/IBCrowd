import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.className + " k-loading-mask"} >
        <span className="k-loading-text">Loading</span>
        <div className="k-loading-image"></div>
        <div className="k-loading-color"></div>
      </div>


    );

  }

};

// const loadingPanel = (

// );


Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};
Loading.defaultProps   ={
  className:''
}

export default withStyles(styles)(Loading);
