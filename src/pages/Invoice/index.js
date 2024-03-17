import React, { useEffect } from "react";
import { Navbar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../config/features/invoiceSlice";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

function Invoice() {
  const dispatch = useDispatch();
  const { order_id } = useParams();
  const invoice = useSelector((state) => state.invoice.invoiceItems);
  useEffect(() => {
    dispatch(getInvoice(order_id));
  }, [dispatch, order_id]);
  console.log("invoices", invoice);

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <main>
          <div className="bg-gray-900 h-screen flex justify-center py-6 sm:px-6 lg:px-8">
            <Card>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Invoice Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Personal details orders.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {invoice.payment_status}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Total Harga
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {invoice.total}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Alamat pengirim
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {invoice.delivery_address?.detail},
                      <hr />
                      {invoice.delivery_address?.provinsi},
                      {invoice.delivery_address?.kabupaten},
                      {invoice.delivery_address?.kecamatan},
                      {invoice.delivery_address?.kelurahan},
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Tujuan Pembayaran
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <strong>Lord Rangga</strong>
                      <br />
                      Bank Sunda Empires
                      <br />
                      1234-5678-89XX-XXXX
                    </dd>
                  </div>
                </dl>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default Invoice;
