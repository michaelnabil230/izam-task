import { useCart } from '@/context/cartContext';
import { App } from '@/types';
import EmptyCard from '../emptyCard';
import Link from '../link';
import ProductQuantityAdjuster from '../productQuantityAdjuster';

const OrderSummary = () => {
    const { cart, removeFromCart, getSubtotal, getShipping, getTax, getTotal } = useCart();

    return (
        <div className="-order-1 md:order-2">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="mb-6 text-xl font-bold">Order Summary</h3>

                {cart.length === 0 && <EmptyCard title="Your cart is empty" description="Add items to it now." />}

                <div className="divide-y divide-gray-200 [&>*]:space-y-2">
                    {cart.map((product) => (
                        <div key={product.id} className="flex w-full items-start gap-2 pt-2 first:pt-0">
                            <img src={product.image} alt={product.name} className="w-20" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-full justify-between">
                                    <p>{product.name}</p>
                                    <button onClick={() => removeFromCart(product.id)}>
                                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.25 3H13.5V2.25C13.5 1.65326 13.2629 1.08097 12.841 0.65901C12.419 0.237053 11.8467 0 11.25 0H6.75C6.15326 0 5.58097 0.237053 5.15901 0.65901C4.73705 1.08097 4.5 1.65326 4.5 2.25V3H0.75C0.551088 3 0.360322 3.07902 0.21967 3.21967C0.0790178 3.36032 0 3.55109 0 3.75C0 3.94891 0.0790178 4.13968 0.21967 4.28033C0.360322 4.42098 0.551088 4.5 0.75 4.5H1.5V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H15C15.3978 19.5 15.7794 19.342 16.0607 19.0607C16.342 18.7794 16.5 18.3978 16.5 18V4.5H17.25C17.4489 4.5 17.6397 4.42098 17.7803 4.28033C17.921 4.13968 18 3.94891 18 3.75C18 3.55109 17.921 3.36032 17.7803 3.21967C17.6397 3.07902 17.4489 3 17.25 3ZM7.5 14.25C7.5 14.4489 7.42098 14.6397 7.28033 14.7803C7.13968 14.921 6.94891 15 6.75 15C6.55109 15 6.36032 14.921 6.21967 14.7803C6.07902 14.6397 6 14.4489 6 14.25V8.25C6 8.05109 6.07902 7.86032 6.21967 7.71967C6.36032 7.57902 6.55109 7.5 6.75 7.5C6.94891 7.5 7.13968 7.57902 7.28033 7.71967C7.42098 7.86032 7.5 8.05109 7.5 8.25V14.25ZM12 14.25C12 14.4489 11.921 14.6397 11.7803 14.7803C11.6397 14.921 11.4489 15 11.25 15C11.0511 15 10.8603 14.921 10.7197 14.7803C10.579 14.6397 10.5 14.4489 10.5 14.25V8.25C10.5 8.05109 10.579 7.86032 10.7197 7.71967C10.8603 7.57902 11.0511 7.5 11.25 7.5C11.4489 7.5 11.6397 7.57902 11.7803 7.71967C11.921 7.86032 12 8.05109 12 8.25V14.25ZM12 3H6V2.25C6 2.05109 6.07902 1.86032 6.21967 1.71967C6.36032 1.57902 6.55109 1.5 6.75 1.5H11.25C11.4489 1.5 11.6397 1.57902 11.7803 1.71967C11.921 1.86032 12 2.05109 12 2.25V3Z"
                                                fill="#FF3333"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <ProductQuantityAdjuster product={product as App.Models.Product} />
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="space-y-2 border-t border-gray-200 py-2">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">Subtotal</div>
                            <div className="text-sm text-black">${getSubtotal().toFixed(2)}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">Shipping</div>
                            <div className="text-sm text-black">${getShipping().toFixed(2)}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">Tax</div>
                            <div className="text-sm text-black">${getTax().toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 py-2"></div>

                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold">Total</div>
                        <div className="text-lg font-bold">${getTotal().toFixed(2)}</div>
                    </div>
                </div>

                <Link to={{ pathname: '/cart' }} className="mt-2.5 w-full">
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    );
};

export default OrderSummary;
