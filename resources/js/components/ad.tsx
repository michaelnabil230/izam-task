import { useAuth } from '@/context/authContext';
import React from 'react';
import { Link } from 'react-router-dom';

const Ad: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="w-full bg-black py-2 text-center text-sm text-white">
            Sign up and get 20% off to your first order.
            {!isAuthenticated ? (
                <Link to={{ pathname: '/register' }} className="font-bold underline">
                    Sign Up Now
                </Link>
            ) : (
                <Link to={{ pathname: '/' }} className="font-bold underline">
                    Go Now
                </Link>
            )}
        </div>
    );
};

export default Ad;
