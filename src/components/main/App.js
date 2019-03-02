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

    this.state = {
      trackNewCompanyIsActive: false
    };
  }

  switchToTackNewCompany = isActive => {
    this.setState({ trackNewCompanyIsActive: isActive });
  };

  render() {
    console.log("->", this.props.companies);
    console.log("   ->", this.state.trackNewCompanyIsActive);

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Stock Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.switchToTackNewCompany(true)}>
                Track new company
              </Nav.Link>
              <Nav.Link onClick={() => this.switchToTackNewCompany(false)}>
                Companies
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        {this.state.trackNewCompanyIsActive ? (
          <TrackNewCompany
            changeTab={() => this.switchToTackNewCompany(false)}
          />
        ) : (
          <Companies companies={this.props.companies} />
        )}
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
