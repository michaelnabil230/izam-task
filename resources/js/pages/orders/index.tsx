import Breadcrumbs from '@/components/breadcrumbs';
import EmptyCard from '@/components/emptyCard';
import Link from '@/components/link';
import Loading from '@/components/loading';
import Pagination from '@/components/pagination';
import MainLayout from '@/layouts/mainLayout';
import { App } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Orders() {
    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<App.Paginate<App.Models.Order>>();

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/orders`, { params: { page } });
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [page]);

    const paginate = (pageNumber: number) => {
        setPage(pageNumber);
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-2xl p-4 lg:max-w-7xl">
                <Breadcrumbs breadcrumbs={[{ text: 'Home', to: { pathname: '/' } }, { text: 'Orders' }]} />

                <h3 className="text-3xl font-bold">Your orders</h3>

                <div className="mt-6 gap-4">
                    {loading && <Loading />}

                    <div className="mt-6">{!loading && <OrdersList orders={orders!.data} />}</div>

                    {orders?.data.length === 0 && <EmptyCard title="No orders found." description="Create order fist." />}

                    {orders && orders.data.length > 0 && <Pagination last_page={orders.last_page} page={page} paginate={paginate} />}
                </div>
            </div>
        </MainLayout>
    );
}

export default Orders;

const OrdersList = ({ orders }: { orders: App.Models.Order[] }) => {
    return (
        <div className="mx-auto max-w-[85rem]">
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="inline-block min-w-full p-1.5 align-middle">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                            <span className="text-xs font-semibold text-gray-800 uppercase">#</span>
                                        </th>

                                        <th scope="col" className="min-w-64 px-6 py-3 text-start whitespace-nowrap">
                                            <span className="text-xs font-semibold text-gray-800 uppercase">Total price</span>
                                        </th>

                                        <th scope="col" className="min-w-64 px-6 py-3 text-start whitespace-nowrap">
                                            <span className="text-xs font-semibold text-gray-800 uppercase">Status</span>
                                        </th>

                                        <th scope="col" className="min-w-64 px-6 py-3 text-start whitespace-nowrap">
                                            <span className="text-xs font-semibold text-gray-800 uppercase">Show</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <OrderList order={order} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderList = ({ order }: { order: App.Models.Order }) => {
    return (
        <tr>
            <td className="size-px px-6 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-800">{order.id}</span>
            </td>
            <td className="size-px px-6 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-800">{order.total_price}</span>
            </td>
            <td className="size-px px-6 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-800">{order.status}</span>
            </td>

            <td className="size-px px-6 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-800">
                    <Link to={{ pathname: `/orders/${order.id}` }}>Show</Link>
                </span>
            </td>
        </tr>
    );
};
