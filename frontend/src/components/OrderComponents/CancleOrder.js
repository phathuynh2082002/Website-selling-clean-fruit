import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancleOrder } from "../../Redux/Actions/OrderActions";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CancleOrder = (props) => {
  const dispatch = useDispatch();

  const { order } = props;
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);

  const cancleHandler = () => {
    const isEligibleForCancellation =
      new Date() - new Date(order.createdAt) < 24 * 60 * 60 * 1000;

    if (isEligibleForCancellation) {
      dispatch(cancleOrder(order._id,));
      toast.success("Hủy Đơn Hàng Thành Công", ToastObjects);
      setIsOrderCanceled(true);
    } else {
      toast.error("Đơn hàng đã quá thời gian được hủy bỏ!", ToastObjects);
    }
  };

  useEffect(() => {
    if (isOrderCanceled) {
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [isOrderCanceled]);

  return (
    <>
      {/* <Toast/> */}
      {order.isPaid && !order.isDelivered && (
        <button onClick={cancleHandler}>Hủy đơn hàng</button>
      )}
    </>
  );
};

export default CancleOrder;
