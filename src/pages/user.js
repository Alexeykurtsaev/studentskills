import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Job from '../components/Job';
import StaticProfile from '../components/StaticProfile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';


class user extends Component {
    state = {
        profile: 'random',
        postIdParam: null
    };
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const postId = this.props.match.params.postId;

        if (postId) this.setState({ postIdParam: postId });

        this.props.getUserData(handle);
        this.setState({
            profile: handle
        })
        axios
        .get(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;

        const postsMarkup = loading ? (
            <p>Loading...</p>
        ) : posts === null ? (
            <p>No posts yet</p>
        ) : (
            posts.map(post => <Job key={post.postId} post={post})
        )


        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading profile</p>
                    ) : ( <StaticProfile profile={this.state.profile}/> )}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Reviews</p>
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(mapStateToProps, { getUserData })(user);
