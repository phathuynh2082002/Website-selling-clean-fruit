import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { orders, loading, error } = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {
        loading ? (
          <Loading />
        )
        : error ? (
          <Message variant='alert-danger'>{error}</Message>
        )
        : (
          <>
          {
            orders.length === 0 ? (
              <div className="col-12 alert alert-info text-center mt-3">
                Không có hóa đơn
                <Link
                  className="btn btn-success mx-2 px-3 py-2"
                  to="/"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Bắt Đầu Mua Sắm
                </Link>
              </div>
            )
            : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Mã Hóa Đơn</th>
                      <th>Trạng Thái</th>
                      <th>Ngày Lập</th>
                      <th>Tổng Chi Phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map((order) => (
                        <tr className={`${ order.isPaid ? 'alert-success' : 'alert-danger'
                          }`}
                          key={order._id}
                        >
                          <td>
                            <a href={`/order/${order._id}`} className="link">
                              {order._id}
                            </a>
                          </td>
                          <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                          <td>
                            {
                              order.isPaid
                                ? moment(order.paidAt).calendar()
                                : moment(order.createdAt).calendar()
                            }
                          </td>
                          <td>{order.totalPrice} 000 VNĐ</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }
          </>
        )
      }

    </div>
  );
};

export default Orders;
