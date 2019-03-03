import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import TrackNewCompany from "../trackNewCompany/TrackNewCompany";
import Companies from "../companies/Companies";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackNewCompanyIsActive: false
    };
  }

  switchToTackNewCompany = (isActive = true) => {
    this.setState({ trackNewCompanyIsActive: isActive });
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Stock Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.switchToTackNewCompany}>
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
          <Companies
            companies={this.props.companies}
            onClick={this.switchToTackNewCompany}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companyInfo.companies
});

export default connect(
  mapStateToProps,
  null
)(App);
