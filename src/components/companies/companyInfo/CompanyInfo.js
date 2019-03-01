import React from "react";
import "./style.css";

const LOGO_SIZE = 64;

const CompanyInfo = ({ company }) => {
  return (
    <div className="company-container">
      <img
        className="company-image"
        src={company.logo}
        alt={`${LOGO_SIZE}x${LOGO_SIZE}`}
      />
      <div className="company-info">
        <div className="company-info-row">
          <span className="company-name">{company.name || ""}</span>
        </div>
        <div className="company-info-row">
          <span>{company.domain || ""}</span>
        </div>
        <div className="company-info-row">
          <span>{company.name || ""}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
