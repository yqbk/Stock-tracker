import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/weatherActions";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class TrackNewCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: ""
    };
  }

  componentDidMount() {
    this.props.fetchAPI("warsaw");
  }

  onInputChange = event => {
    this.setState({ company: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.fetchAPI(this.state.company);
    this.setState({ company: "" });
  };

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>Weather</Navbar.Brand>
        <Nav className="mr-auto" />
        <Form inline onSubmit={this.onFormSubmit}>
          <div className="search">
            <FormControl
              type="text"
              placeholder="Type company name"
              className="mr-sm-2"
              value={this.state.company}
              onChange={this.onInputChange}
            />
            <Button variant="outline-success" type="submit">
              Go!
            </Button>
          </div>
        </Form>
      </Navbar>
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