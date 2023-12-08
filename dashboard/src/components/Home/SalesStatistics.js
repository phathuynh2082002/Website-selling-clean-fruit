import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống Kê Bán Hàng</h5>
          <iframe 
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px", 
            }}
            src="https://charts.mongodb.com/charts-dfshop-svnkl/embed/charts?id=6506a6e1-1b75-49ad-8c9e-365b47b9d30f&maxDataAge=60&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
