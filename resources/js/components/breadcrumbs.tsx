import { Link, To } from 'react-router-dom';

type Breadcrumb = {
    text: string;
    to?: To;
};

type BreadcrumbsProps = {
    breadcrumbs: Breadcrumb[];
};

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
    return (
        <ol className="mb-10 flex items-center whitespace-nowrap">
            {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center truncate" aria-current="page">
                    {breadcrumb.to ? (
                        <Link to={breadcrumb.to} className={`text-sm ${index === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                            {breadcrumb.text}
                        </Link>
                    ) : (
                        <span className={`text-sm ${index === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-gray-500'}`}>{breadcrumb.text}</span>
                    )}
                    {index !== breadcrumbs.length - 1 && (
                        <svg
                            className="mx-1 size-4 shrink-0 overflow-visible text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    )}
                </li>
            ))}
        </ol>
    );
}
