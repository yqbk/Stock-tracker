import React from "react";
import "./style.css";

const LOGO_SIZE = 64;

const getChangeColor = change =>
  change[0] === "-" ? "change-red bolded" : "change-green bolded";

const CompanyInfo = ({ company }) => (
  <div className="company-container">
    <img
      className="company-image"
      src={company.logo}
      alt={`${LOGO_SIZE}x${LOGO_SIZE}`}
    />
    <div className="company-info">
      <div className="company-info-row">
        <span className="company-name">{company.name}</span>
        <span> {company.symbol}</span>
        <span> {company.domain}</span>
      </div>
      <div className="company-info-row">
        <span> {company.region}</span>
        <span> {company.time}</span>
      </div>
      <div className="company-info-row">
        <span className="bolded">{company.price}</span>
        <span> {company.currency}</span>
        <span className={getChangeColor(company.change)}>
          {" "}
          {company.change}
        </span>
        <span> {company.closed}</span>
      </div>
    </div>
  </div>
);

export default CompanyInfo;
