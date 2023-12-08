import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listCategorzie, listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Categorize from "../homeComponents/Categorize";
import Carousel from "./Carousel";
import Standard from "./Standard";



const ShopSection = (props) => {

  const dispatch = useDispatch();

  const { keyword, pagenumber, categorize} = props;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber, categorize));
    dispatch(listCategorzie());
  },[dispatch, keyword, pagenumber, categorize]);

  return (
    <>
      <div className="container">
        <marquee class="mb-3">DF cam kết đem đến cho khách hàng những sản phẩm trái cây đạt tiêu chuẩn VietGap và GlobalGap 100%, mang đến cho gia đình khách hàng nguồn dinh dưỡng tự nhiên an toàn. VietGAP là viết tắt của Vietnamese Good Agricultural Practices, có nghĩa là Thực hành sản xuất nông nghiệp tốt ở Việt Nam. Tiêu chuẩn này do Bộ Nông nghiệp và Phát triển nông thôn ban hành đối với từng sản phẩm, nhóm sản phẩm thủy sản, trồng trọt và chăn nuôi. GlobalGAP ( Viết tắt của từ Global Good Agricultural Practice) – Thực hành nông nghiệp tốt toàn cầu, là một bộ tiêu chuẩn (tập hợp các biện pháp kỹ thuật) về thực hành nông nghiệp tốt được xây dựng để áp dụng tự nguyện cho sản xuất, thu hoạch và xử lý sau thu hoạch. </marquee>
        <Carousel/>
        <Categorize />
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  loading ? (<Loading />) 
                  : error ? (<Message variant='alert-danger'>{error}</Message>)
                  :
                  (
                    <>
                      {products.map((product) => (
                        <div
                          className="shop col-lg-3 col-md-6 col-sm-6"
                          key={product._id}
                        >
                          <div className="border-product">
                            {
                              product.standard ? (<Standard standard={product.standard}/>) : null
                            }
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                <img src={product.image} alt={product.name} />
                              </div>
                            </Link>
      
                            <div className="shoptext">
                              <p>
                                <Link to={`/products/${product._id}`}>
                                  {product.name}
                                </Link>
                              </p>
      
                              <Rating
                                value={product.rating}
                                text={`${product.numReviews} đánh giá`}
                              />
                              <h3>{product.price} 000 VNĐ</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )
                }
                {/* Pagination */}
                <Pagination 
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                  categorize={categorize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
