import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
// Icons
import Avatar from '@material-ui/core/Avatar';
// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    }
}

class Dialogues extends Component {
    render() {
        const { classes, dialogues } = this.props;
        return (
            <Card className={classes.card}>
                <Avatar alt="user img" src="https://firebasestorage.googleapis.com/v0/b/unprotect-5499a.appspot.com/o/407207788.jpg?alt=media" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary">{dialogues}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

Dialogues.propTypes = {
    dialogues: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dialogues));