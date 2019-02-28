import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAPI } from "../../actions/requestActions";
import { Navbar, Nav } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
        <h2>Companies</h2>
        <p>
          There are no companies yet.
          <a href="#new"> Track your first company.</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
