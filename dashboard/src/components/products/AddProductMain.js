import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listCategorize } from "../../Redux/Actions/CategorizeActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 1500,
};

const AddProductMain = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [categorize, setCategorize] = useState("");
  const [standard, setStadard] = useState("");
  const [price, setPrice] = useState(50);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(1000);
  const [description, setDescription] = useState(".");

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;
  const categorizeList = useSelector((state) => state.categorizeList);
  const { categorizes } = categorizeList;

  useEffect(() => {
    dispatch(listCategorize());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      toast.success("Sản Phẩm Đã Được Thêm", ToastObjects);
      setTimeout(() => {
        window.location.reload();
      }, 1500);

      
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  }, [dispatch, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        categorize,
        standard,
        price,
        description,
        image,
        countInStock
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Đi Đến Danh Sách Sản Phẩm
            </Link>
            <h2 className="content-title"> Thêm Sản Phẩm </h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm Sản Phẩm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
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
                      <option value="" disabled selected>
                        Chọn Loại
                      </option>
                      {categorizes.map((ctr) => (
                        <option value={ctr.name}>{ctr.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tiêu Chuẩn
                    </label>
                    <select
                      id="product_title"
                      className="form-control"
                      onChange={(e) => setStadard(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Chọn Tiêu Chuẩn
                      </option>
                      <option value="vietgap">Viet Gap</option>
                      <option value="globalgap">Global Gap</option>
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
                      placeholder="Inter Image URL"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                  <div>
              <button type="submit" className="btn btn-primary">
                Thêm Sản Phẩm
              </button>
            </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
