import React from "react";
import "./style.css";
import CompanyInfo from "./companyInfo/CompanyInfo";

const Companies = ({ companies, onClick }) => {
  return (
    <div>
      <h3>Companies</h3>
      {companies && companies.length ? (
        companies.map(company => (
          <CompanyInfo company={company} key={company.name} />
        ))
      ) : (
        <div>
          <p>
            There are no companies yet.{" "}
            <span onClick={onClick} className="link">
              Track your first company.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Companies;
