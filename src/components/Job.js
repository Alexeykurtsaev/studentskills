import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteJob from './DeleteJob';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// Redux
import { connect } from 'react-redux';
import { interestJob, uninterestJob } from '../redux/actions/dataActions';

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

class Job extends Component {
    interestedJob = () => {
        if(this.props.user.interests && this.props.user.interests.find(interest => interest.jobId === this.props.job.jobId))
        return true;
        else return false;
    }
    interestJob = () => {
        this.props.interestJob(this.props.job.jobId);
    }
    uninterestJob = () => {
        this.props.uninterestJob(this.props.job.jobId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, job : {body, createdAt, userHandle, jobId, interestCount}, user: { authenticated, credentials: { handle } } } = this.props;
        const interestButton = !authenticated ? (
            <MyButton tip="Show interest">
                <Link to="/login">
                    <CheckCircleOutlineIcon color="primary" />
                </Link>
            </MyButton>
        ) : (
            this.interestedJob() ? (
                <MyButton tip="Not interested" onClick={this.uninterestJob}>
                    <CheckCircleIcon color="primary" />
                </MyButton>
            ) : (
                <MyButton tip="Show interest" onClick={this.interestJob}>
                    <CheckCircleOutlineIcon color="primary" />
                </MyButton>
            )
        )
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteJob jobId={jobId}/>
        ) : null;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={'/user/'+ userHandle} color="primary">{userHandle}
                    
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    {interestButton}
                    <span>{interestCount} People interested</span>
                    <MyButton tip="Write to employer">
                        <ChatIcon color="primary"/>
                    </MyButton>
                </CardContent>
            </Card>
        )
    }
}

Job.propTypes = {
    interestJob: PropTypes.func.isRequired,
    uninterestJob: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    interestJob,
    uninterestJob
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Job));
