import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategorzie } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const Categorize = () => {
  const dispatch = useDispatch();

  const categorizeList = useSelector((state) => state.categorizeList);
  const { loading, error, categorizes } = categorizeList;
  
  useEffect(() => {
    dispatch(listCategorzie());
  },[])

  return (
    <>
      <button
        class="btn btn-outline-success categorize"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Loại Sản Phẩm
      </button>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            DANH SÁCH LOẠI SẢN PHẨM
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        {
        loading ? (<Loading />) 
        : error ? (<Message variant='alert-danger'>{error}</Message>)
        :
        (
          <div class="offcanvas-body">
            <ul class="list-group list-group-flush">
              {categorizes.map((categorize) => (
                <Link  
                  class="list-group-item categorize-item" 
                  to={`/categorize/${categorize.name}`}        
                  key={categorize._id}
                >
                  {categorize.name}
                </Link>
              ))}
            </ul>
          </div>
        )
      }
      </div>
    </>
  );
};

export default Categorize;
