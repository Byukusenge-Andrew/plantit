'use client'

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignIn: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get('registered');
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Authentication failed');
      localStorage.setItem('token', result.token);
      router.push('/dashboard');
    } catch (error: any) {
      setError('root', { message: error.message || 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Sign in to your account</h2>
      {justRegistered && <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-center">Registration successful! Please sign in.</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <input {...register('email')} type="email" placeholder="Email" className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} disabled={isLoading} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        
        <input {...register('password')} type="password" placeholder="Password" className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`} disabled={isLoading} />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        
        {errors.root && <p className="text-sm text-red-500 text-center">{errors.root.message}</p>}
        
        <button type="submit" disabled={isLoading} className={`w-full py-2 text-white rounded ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">Forgot your password?</Link>
      <p className="text-sm text-gray-600">Don't have an account? <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link></p>
    </div>
  );
};

export default SignIn;