import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Job from '../components/Job';
import Profile from '../components/Profile';
import { getJobs } from '../redux/actions/dataActions'
import { connect } from 'react-redux';

class home extends Component {

    componentDidMount(){
        this.props.getJobs();
    }
    render() {
        const { jobs, loading } = this.props.data;
        let recentJobsMarkup = !loading ? (
            jobs.map((job) => <Job key={job.jobId} job={job}/>)
        ) : ( <p>Loading...</p>
        )
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentJobsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getJobs: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getJobs })(home);
