import { App } from '@/types';
import Button from '../button';
import Label from '../label';
import Loading from '../loading';

interface FilterProps {
    loadingCategories: boolean;
    categories: App.Models.Category[];
    params: URLSearchParams;
    setParams: (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void;
    handleMaxPrice: (value: number) => void;
    handleMinPrice: (value: number) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (value: boolean) => void;
    clearFilters: () => void;
    handleSleetedCategories: (value: App.Models.Category) => void;
}

const Filter: React.FC<FilterProps> = ({
    loadingCategories,
    categories,
    params,
    handleMaxPrice,
    handleMinPrice,
    isFilterOpen,
    setIsFilterOpen,
    clearFilters,
    handleSleetedCategories,
}) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setIsFilterOpen(false)}
            />
            <div
                className={`fixed top-0 left-0 z-[101] h-full w-80 transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out ${
                    isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <div className="inline-flex items-center justify-center gap-2">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button onClick={clearFilters} className="block cursor-pointer text-[#6B7280] md:hidden">
                            Clear all filters
                        </button>
                    </div>
                    <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3 font-medium">Price Range</h3>
                        <div className="px-2">
                            <div className="relative h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="absolute h-2 rounded-full bg-black"
                                    style={{
                                        left: `${(Number(params.get('min_price') ?? 0) / 1000) * 100}%`,
                                        right: `${100 - (Number(params.get('max_price') ?? 1000) / 1000) * 100}%`,
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={params.get('min_price') ?? 0}
                                    onChange={(e) => handleMinPrice(Number(e.target.value))}
                                    className="pointer-events-none absolute h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={params.get('max_price') ?? 1000}
                                    onChange={(e) => handleMaxPrice(Number(e.target.value))}
                                    className="pointer-events-none absolute h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                <span>${params.get('min_price') ?? 0}</span>
                                <span>${params.get('max_price') ?? 1000}</span>
                            </div>
                        </div>
                    </div>

                    {loadingCategories ? (
                        <Loading />
                    ) : (
                        <div>
                            <h3 className="mb-3 font-medium">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center gap-2">
                                        <input
                                            checked={(params.get('categories') ?? '').split(',').includes(String(category.id))}
                                            type="checkbox"
                                            id={`cat-${category.id}`}
                                            className="rounded border-gray-300"
                                            onChange={() => handleSleetedCategories(category)}
                                        />
                                        <Label htmlFor={`cat-${category.id}`}>{category.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                    <Button onClick={() => setIsFilterOpen(false)} className="w-full" size={'lg'}>
                        Apply Filters
                    </Button>

                    <button onClick={clearFilters} className="mt-2 w-full cursor-pointer text-center text-[#6B7280]">
                        Clear all filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default Filter;
