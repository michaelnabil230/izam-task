import { useCart } from '@/context/cartContext';
import { App } from '@/types';
import ProductQuantityAdjuster from './productQuantityAdjuster';

interface ProductProps {
    product: App.Models.Product;
    onClick: () => void;
}

function Product({ product, onClick }: ProductProps) {
    const { findProduct } = useCart();

    return (
        <div key={product.id} className="rounded-lg border border-gray-200 p-4">
            <div className="relative">
                {(findProduct(product.id)?.quantity ?? 0) !== 0 && (
                    <div className="absolute end-2 bottom-2 inline-flex size-8 items-center justify-center rounded-full bg-blue-500 text-white">
                        {findProduct(product.id)?.quantity || 0}
                    </div>
                )}
                <img src={product.image} alt={product.name} className="w-full" />
            </div>

            <button onClick={onClick} className="mt-3 flex w-full cursor-pointer items-center justify-between">
                <h4 className="text-lg font-medium">{product.name}</h4>
                <div className="w-fit rounded bg-gray-100 p-1 text-center text-xs font-normal text-gray-600">{product.category.name}</div>
            </button>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-base font-bold text-black">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.quantity}</p>
            </div>

            <ProductQuantityAdjuster product={product as App.Models.Product} />
        </div>
    );
}

export default Product;
