import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/stockTrackerActions";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./style.css";

class TrackNewCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: ""
    };
  }

  //   componentDidMount() {
  //     this.props.fetchAPI("warsaw");
  //   }

  onInputChange = event => {
    this.setState({ company: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.fetchAPI(this.state.company);
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
          <Button
            // variant="outline-success"
            type="submit"
            className={"track-button"}
            // class="btn btn-primary"
          >
            Track
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAPI: company => dispatch(fetchAPI(company))
});

export default connect(
  null,
  mapDispatchToProps
)(TrackNewCompany);
