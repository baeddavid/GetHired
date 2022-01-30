import React, { Component } from "react";
import Form from"react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../../services/user.service";

export default class extends Component {
    constructor(props) {
        super(props);
        this.handleJob = this.handleJob.bind(this);
        this.onChangeJobListingName = this.onChangeJobListingName.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeReferral = this.onChangeReferral.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeJobLength = this.onChangeJobLength.bind(this);

        this.state = {
            jobListingName: this.props.jobListingName,
            link: this.props.link,
            company: this.props.company,
            status: this.props.status,
            referral: this.props.referral,
            tags: this.props.tags,
            jobLength: {days: 1, hours: 1}, 
        };
    }
    

    onChangeJobListingName(e) {
        this.setState({
            jobListingName: e.target.value
        });
    }

    onChangeLink(e) {
        this.setState({
            link: e.target.value
        });
    }

    onChangeReferral(e) {
        this.setState({
            referral: e.target.value
        });
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeJobLength(e) {
        this.setState({
            jobLength: e.target.value
        });
    }

    handleJob(e) {
        e.preventDefault();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            UserService.updateJob(
                this.state.jobListingName,
                this.state.link,
                this.state.company,
                this.state.referral,
                this.state.status,
                this.state.tags,
                this.state.jobLength,
                this.props.jobId
            );
        }
    }


    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleJob}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    <div>
                        <label>Job listing name</label>
                        <Input
                            type="text"
                            name="jobListingName"
                            value={this.state.jobListingName}
                            onChange={this.onChangeJobListingName}
                        />
                    </div>
                    <div>
                        <label>Link</label>
                        <Input
                            type="text"
                            name="link"
                            value={this.state.link}
                            onChange={this.onChangeLink}
                        />
                    </div>
                    <div>
                        <label>referral</label>
                    </div>
                    <div>
                        <label>company</label>
                        <Input
                            type="text"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChangeCompany}
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <Input
                            type="text"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChangeStatus}
                        />
                    </div>
                    <div>
                        <label>Job Length</label>
                        <Input
                            type="text"
                            name="jobLength"
                            value={this.state.jobLength}
                            onChange={this.onChangeJobLength}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">update</button>
                    </div>
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        )
    }
}