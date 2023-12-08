import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listCategorize } from "../../Redux/Actions/CategorizeActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

var standard_current = '';

const EditProductMain = (props) => {
  const std = ["vietgap", "globalgap"];

  const { productId } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [categorize, setCategorize] = useState("");
  const [standard, setStandard] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product, nameCategorize } = productEdit;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;
  const categorizeList = useSelector((state) => state.categorizeList);
  const { categorizes } = categorizeList;

  useEffect(() => {
    dispatch(listCategorize());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Sản Phẩm Đã Được Cập Nhật", ToastObjects);
    } else {
      if (!product || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setCategorize(nameCategorize);
        setStandard([product.standard]);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setImage(product.image);
      }
    }
  }, [dispatch, product, productId, success, nameCategorize]);

  const submibHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        categorize,
        standard:standard.toString(),
        price,
        description,
        image,
        countInStock,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submibHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Đi Đến Danh Sách Sản Phẩm
            </Link>
            <h2 className="content-title">Cập Nhật Sản Phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập Nhật Sản Phẩm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên Sản Phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* <div className="mb-4">
                          <label htmlFor="product_title" className="form-label">
                            Categorize
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_title"
                            required
                            value={categorize}
                            onChange={(e) => setCategorize(e.target.value)}
                          />
                        </div> */}
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Loại
                        </label>
                        <select
                          id="product_title"
                          className="form-control"
                          onChange={(e) => setCategorize(e.target.value)}
                          required
                        >
                          <option value={nameCategorize} selected>
                            {nameCategorize}
                          </option>
                          {categorizes.map((ctr) =>
                            nameCategorize !== ctr.name ? (
                              <option value={ctr.name}>{ctr.name}</option>
                            ) : null
                          )}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tiêu Chuẩn
                        </label>
                        <select
                          id="product_title"
                          className="form-control"
                          onChange={(e) => setStandard(e.target.value)}
                        >
                          <option value={standard} selected>
                            {standard}
                          </option>
                          {std.map((s) =>
                            s !== standard[0] ? (
                              <option value={s}>{s}</option>
                            ) : null
                          )}
                          {/* <option value="" disabled selected>
                            Chose Standard
                          </option>
                          <option value="vietgap">Viet Gap</option>
                          <option value="globalgap">Global Gap</option> */}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số Lượng Trong Kho
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô Tả</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Hình Ảnh</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
