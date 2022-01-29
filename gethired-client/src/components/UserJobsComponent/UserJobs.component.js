import React, { Component } from "react";
import UserService from "../../services/user.service";

export default class UserJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        UserService.getUserJobs(this.props.username).then(
            response => {
                console.log(response.data.content)
                this.setState({
                    jobs: response.data.content
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>hello</h3>
                    <div>
                        <ul>
                            {this.state.jobs.map(job => (<li key={job.id}>{job.jobListingName} {job.link} {job.referral} {job.status} {job.company}</li>))}
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}