import Breadcrumbs from '@/components/breadcrumbs';
import Loading from '@/components/loading';
import MainLayout from '@/layouts/mainLayout';
import { App } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShowOrder() {
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<App.Models.Order>();

    const params = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/orders/${params.id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params]);

    if (loading) {
        return <Loading />;
    }

    return (
        <MainLayout>
            <div className="mx-auto max-w-2xl p-4 lg:max-w-7xl">
                <Breadcrumbs
                    breadcrumbs={[{ text: 'Home', to: { pathname: '/' } }, { text: 'Orders', to: { pathname: '/orders' } }, { text: 'Show Order' }]}
                />

                {order == null ? (
                    <h1 className="text-center font-bold">Order not found</h1>
                ) : (
                    <div className="flex flex-col rounded-xl border border-stone-200 bg-white shadow-2xs">
                        <div className="flex items-center justify-between gap-x-3 border-b border-stone-200 px-5 py-2">
                            <h2 className="inline-block font-semibold text-stone-800">Order {order.id}</h2>
                        </div>

                        <div className="flex flex-col p-5">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                <div>
                                    <p className="text-sm text-stone-800">Order placed: {order.created_at}</p>
                                    <p className="text-sm text-stone-800">Total price: {order.total_price}</p>
                                </div>
                                <div className="inline-flex items-center gap-x-2">
                                    <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {order.products.map((product) => (
                                <div className="mt-5 border-t border-stone-200 pt-5 first:mt-0 first:border-t-0 first:pt-0">
                                    <div className="flex items-start gap-5">
                                        <img className="size-28 shrink-0 rounded-md sm:h-auto sm:w-auto xl:size-28" src={product.image} />

                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <h4 className="mb-1 text-xs text-stone-500">{product.name}</h4>
                                                <p className="text-sm text-stone-800">{product.category.name}</p>
                                            </div>

                                            <div>
                                                <h4 className="mb-1 text-xs text-stone-500">Quantity</h4>
                                                <p className="text-sm text-stone-800">{product.data.quantity}</p>
                                            </div>

                                            <div>
                                                <h4 className="mb-1 text-xs text-stone-500">Price</h4>
                                                <p className="text-sm text-stone-800">{product.data.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default ShowOrder;
