import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/stockTrackerActions";
import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import TrackNewCompany from "../trackNewCompany/TrackNewCompany";
import Companies from "../companies/Companies";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log("->", this.props.companies);

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Stock Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#new">Track new company</Nav.Link>
              <Nav.Link href="#companies">Companies</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <h3>Companies</h3>
        <p>
          There are no companies yet.
          <a href="#new"> Track your first company.</a>
        </p> */}
        <TrackNewCompany />
        <Companies companies={this.props.companies} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // companies: state.responses.companies
  companies: state.responses.companies
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
