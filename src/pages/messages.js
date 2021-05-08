import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Dialogues from '../components/Dialogues';

import { connect } from 'react-redux';
import { getDialogues, getMessages } from '../redux/actions/dataActions';

class messages extends Component {
    componentDidMount(){
        this.props.getDialogues();
        this.props.getMessages();
    }
    render() {
        const{ dialogues, loading } = this.props.data;
        let dialoguesMarkup = !loading ? (
            dialogues.map((dialogue)=> <Dialogues dialogue={dialogue}/> )
        ) : (
            <p>Loading...</p>
        )
        return (
            <Grid container spacing={0}>
                <Grid item sm={4} xs={12}>
                    {dialoguesMarkup}
                </Grid>
                <Grid item sm={8} xs={12}>
                    <p>Messages</p>
                </Grid>
            </Grid>
        )
    }
}

messages.propTypes = {

}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getDialogues, getMessages })(messages);
