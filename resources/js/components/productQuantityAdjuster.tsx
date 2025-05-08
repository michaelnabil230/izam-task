import { useCart } from '@/context/cartContext';
import { App } from '@/types';

function ProductQuantityAdjuster({ product }: { product: App.Models.Product }) {
    const { addToCart, findProduct, minisToCart } = useCart();

    return (
        <div className="mt-4 flex h-fit w-fit overflow-hidden rounded border border-gray-300 bg-gray-100 text-black">
            <button onClick={() => addToCart(product as App.Models.Product)} className="cursor-pointer bg-gray-200 px-2 py-2 text-center">
                +
            </button>
            <p className="inline-flex w-15 items-center justify-center">{findProduct(product.id)?.quantity || 0}</p>
            <button onClick={() => minisToCart(product.id)} className="cursor-pointer bg-gray-200 px-2 py-2 text-center">
                -
            </button>
        </div>
    );
}

export default ProductQuantityAdjuster;
