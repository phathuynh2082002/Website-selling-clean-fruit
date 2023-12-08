import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { listCategorize } from "../../Redux/Actions/CategorizeActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainCategories = () => {

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Loại Sản Phẩm</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory />
            {/* Categories table */}
            <CategoriesTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
