'use client';

import { useForm } from 'react-hook-form';
import { Student } from '@/src/types/student';

interface Props {
    defaultValues?: Partial<Student>;
    onSubmit: (data: Student) => void;
    submitting?: boolean;
    submitLabel?: string;
}

export default function StudentForm({
                                        defaultValues,
                                        onSubmit,
                                        submitting,
                                        submitLabel = 'Save',
                                    }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Student>({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <input
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                    {...register('phoneNumber')}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Course</label>
                <input
                    {...register('course')}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Age</label>
                <input
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Gender</label>
                <select
                    {...register('gender')}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
                <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
            </div>

            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {submitting ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
}