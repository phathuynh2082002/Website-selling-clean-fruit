import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategorize } from "../../Redux/Actions/CategorizeActions";

const CreateCategory = () => {

  const dispatch = useDispatch();
  const [categorize, setCategorize] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategorize(categorize));
    setCategorize('');
  }

  return (
    <div className="col-md-12 col-lg-4">
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Tên Loại Sản Phẩm
          </label>
          <input
            type="text"
            placeholder="Tên Loại Sản Phẩm"
            className="form-control py-3"
            id="product_name"
            required
            value={categorize}
            onChange={(e) => setCategorize(e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
          ></textarea>
        </div> */}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary py-3">Thêm Loại Sản Phẩm</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
