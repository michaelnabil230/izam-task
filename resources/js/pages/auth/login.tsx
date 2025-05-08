import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import { useAuth } from '@/context/authContext';
import AuthLayout from '@/layouts/authLayout';
import React, { useState } from 'react';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            window.location.href = '/';
        } catch {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <AuthLayout title="Login" description="Sign in to your account">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>

                    {error && <div className="text-red-500">{error}</div>}

                    <Button className="w-full" size={'lg'}>
                        Login
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
