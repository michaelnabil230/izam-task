import { App } from '@/types';
import ProductQuantityAdjuster from '../productQuantityAdjuster';

interface ProductModalProps {
    showingProduct: App.Models.Product | null;
    setShowingProduct: (product: App.Models.Product | null) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ showingProduct, setShowingProduct }) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${showingProduct ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setShowingProduct(null)}
            />

            <div
                className={`fixed top-0 right-0 z-[101] h-full w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                    showingProduct ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {showingProduct && (
                    <>
                        <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm">
                            <h2 className="text-xl font-bold">{showingProduct.name}</h2>
                            <button onClick={() => setShowingProduct(null)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="h-[calc(100%-64px)] overflow-y-auto">
                            <img src={showingProduct.image} alt={showingProduct.name} className="w-full" />
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-bold">{showingProduct.name}</h4>
                                    <div className="w-fit rounded bg-gray-100 p-1 text-center text-xs font-normal text-gray-600">
                                        {showingProduct.category.name}
                                    </div>
                                </div>
                                <p className="mt-10 text-lg font-bold">${showingProduct.price}</p>

                                <span>Product Details</span>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-md">Category:</h4>
                                        <span>{showingProduct.category.name}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h4 className="text-md">Stock:</h4>
                                        <span>{showingProduct.quantity} items</span>
                                    </div>
                                </div>

                                <ProductQuantityAdjuster product={showingProduct} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductModal;
