import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
// MUI
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    }
};

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            accType: 'student',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
            accType: "student"
        }
        this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} helperText={errors.password} error={errors.password ? true : false} value={this.state.password} onChange={this.handleChange} fullWidth/>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} value={this.state.confirmPassword} onChange={this.handleChange} fullWidth/>
                        <TextField id="handle" name="handle" type="text" label="Unique Handle" className={classes.textField} helperText={errors.handle} error={errors.handle ? true : false} value={this.state.handle} onChange={this.handleChange} fullWidth/>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>Signup{loading && (<CircularProgress size={30} className={classes.progress}/>)}</Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  export default connect(
    mapStateToProps,
    { signupUser }
  )(withStyles(styles)(signup));