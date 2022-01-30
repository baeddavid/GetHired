import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

export default class UserJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        };
    }

    componentDidMount() {
        UserService.getUserJobs(this.props.username).then(
            response => {
                this.setState({
                    jobs: response.data.content
                });
            }
        );
    }

    deleteJob(jobId) {
        UserService.deleteJob(jobId);
        const updatedJobs = this.state.jobs.filter(job => job.id !== jobId);
        this.setState({jobs: updatedJobs});
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>hello</h3>
                    <div>
                        <ul>
                            {this.state.jobs.map(job => (<li key={job.id}>{
                                job.jobListingName}
                                {job.link}
                                {job.referral}
                                {job.status}
                                {job.company}
                                <Link to={`/edit_job/${job.id}`}
                                    state={{
                                        jobListingName: job.jobListingName,
                                        link: job.link,
                                        referral: job.referral,
                                        status: job.status,
                                        company: job.company,
                                        tags: job.tags,
                                        jobLength: job.jobLength
                                    }}>edit job</Link>
                                <button onClick={() => { this.deleteJob(job.id); }}>Delete</button>
                            </li>
                            ))}
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}