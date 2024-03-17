import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../config/features/orderSlice";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderItems);
  const data = orderList.data;
  const [detailId, setDetailId] = useState(null);
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    setDetailId((prevId) => (prevId === id ? null : id));
  };
  // console.log("get order list", data);
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  const handleInvoice = (order_id) => {
    navigate(`/invoice/${order_id}`);
  };
  return (
    <div className="px-12">
      <Table className="text-center">
        <TableHead>
          <TableHeadCell>Order ID</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Invoice</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              const totalOrderPrice = item.order_items.reduce((acc, curr) => {
                return acc + curr.price * curr.qty;
              }, 0);
              const totalPayment = totalOrderPrice + item.delivery_fee;

              return (
                <React.Fragment key={item._id}>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell>{totalPayment}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button
                        size="xs"
                        color="gray"
                        onClick={() => handleInvoice(item._id)}
                      >
                        invoice
                      </Button>
                      <Button
                        size="xs"
                        color="info"
                        onClick={() => handleDetailClick(item._id)}
                      >
                        detail
                      </Button>
                    </TableCell>
                  </TableRow>
                  {detailId === item._id && (
                    <TableRow>
                      <TableCell className="pt-0" colSpan={4}>
                        <Table className="text-center bg-white">
                          <TableHead>
                            <TableHeadCell>Barang</TableHeadCell>
                            <TableHeadCell>Jumlah</TableHeadCell>
                            <TableHeadCell>Total Harga</TableHeadCell>
                          </TableHead>
                          <TableBody>
                            {item.order_items.map((orderItem) => {
                              const total = orderItem.qty * orderItem.price;

                              return (
                                <TableRow key={orderItem.id}>
                                  <TableCell>{orderItem.name}</TableCell>
                                  <TableCell>{orderItem.qty}</TableCell>
                                  <TableCell>{total}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Belum ada pesanan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderList;
