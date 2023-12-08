import React, { useEffect, useState } from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategorize,
  listCategorize,
  updateCategorize,
} from "../../Redux/Actions/CategorizeActions";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const categorizeList = useSelector((state) => state.categorizeList);
  const { loading, error, categorizes } = categorizeList;
  const categorizeDelete = useSelector((state) => state.categorizeDelete);
  const { error: errorDelete, success: successDelete } = categorizeDelete;
  const categorizeCreate = useSelector((state) => state.categorizeCreate);
  const { error: errorCreate, success: successCreate } = categorizeCreate;
  const categorizeUpdate = useSelector((state) => state.categorizeUpdate);
  const { error: errorUpdate, success: successUpdate } = categorizeUpdate;

  const [categorize, setCategorize] = useState("");
  const [idCategory, setIdCategory] = useState("");

  const deleteHandler = (id) => {
    if (window.confirm("Bạn có chắc là muốn xóa loại này?")) {
      dispatch(deleteCategorize(id));
    }
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      dispatch(updateCategorize(idCategory, categorize));
    }
  };

  useEffect(() => {
    dispatch(listCategorize());
  }, [dispatch, successDelete, successCreate, successUpdate]);

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>Tên Loại</th>
            <th className="text-end">Thao Tác</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {errorCreate && (
            <Message variant="alert-danger">{errorCreate}</Message>
          )}
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {categorizes.map((ctr) => (
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </td>
                  <td>
                    {ctr._id === idCategory ? (
                      <input
                        class="input-update"
                        value={categorize}
                        autoFocus
                        onChange={(e) => setCategorize(e.target.value)}
                        onKeyDown={keyDownHandler}
                      />
                    ) : (
                      <p>{ctr.name}</p>
                    )}
                  </td>
                  <td className="text-end">
                    <div className="dropdown">
                      <button
                        data-bs-toggle="dropdown"
                        className="btn btn-light"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setIdCategory(ctr._id);
                            setCategorize(ctr.name);
                          }}
                        >
                          Thay Đổi Thông Tin
                        </button>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => deleteHandler(ctr._id)}
                        >
                          Xóa Loại Sản Phẩm
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
