import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCompanyInfo } from "../../actions/getCompanyInfoActions";

import { Form, FormControl, Button } from "react-bootstrap";
import "./style.css";

class TrackNewCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: ""
    };
  }

  onInputChange = event => {
    this.setState({ company: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.fetchCompanyInfo(this.state.company);
    this.setState({ company: "" });
    this.props.changeTab();
  };

  render() {
    return (
      <div>
        <h3>Track new company</h3>
        <p>Company symbol</p>
        <Form inline onSubmit={this.onFormSubmit} className="track-form">
          <FormControl
            type="text"
            placeholder="Company symbol"
            className="mr-sm-2"
            value={this.state.company}
            onChange={this.onInputChange}
          />
          <span>
            Provide the stock exchange symbol of a company you want to track
          </span>
          <Button type="submit" className={"track-button"}>
            Track
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCompanyInfo: company => dispatch(fetchCompanyInfo(company))
});

export default connect(
  null,
  mapDispatchToProps
)(TrackNewCompany);
