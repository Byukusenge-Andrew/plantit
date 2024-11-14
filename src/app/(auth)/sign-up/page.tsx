'use client'

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const SignUp: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed');
      router.push('/sign-in?registered=true');
    } catch (error: any) {
      setError('root', { message: error.message || 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <input {...register('name')} type="text" placeholder="Name" className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`} disabled={isLoading} />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        
        <input {...register('email')} type="email" placeholder="Email" className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} disabled={isLoading} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        
        <input {...register('password')} type="password" placeholder="Password" className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`} disabled={isLoading} />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        
        {errors.root && <p className="text-sm text-red-500 text-center">{errors.root.message}</p>}
        
        <button type="submit" disabled={isLoading} className={`w-full py-2 text-white rounded ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;