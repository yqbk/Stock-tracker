import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchAPI } from "../../actions/stockTrackerActions";

// import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./style.css";
import CompanyInfo from "./companyInfo/CompanyInfo";

const Companies = ({ companies }) => {
  return (
    <div>
      <h3>Companies</h3>
      {companies && companies.length ? (
        companies.map(company => <CompanyInfo company={company} key={company.name} />)
      ) : (
        <h4>No companies to track</h4>
      )}
    </div>
  );
};

export default Companies;
