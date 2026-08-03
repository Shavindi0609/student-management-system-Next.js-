'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import Navbar from '@/src/components/Navbar';
import api from '@/src/lib/axios';

export default function DashboardPage() {
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        api
            .get('/students/count')
            .then((res) => setTotal(res.data.total))
            .catch(() => setTotal(0));
    }, []);

    return (
        <ProtectedRoute>
            <Navbar />
            <main className="mx-auto max-w-6xl px-6 py-8">
                <h1 className="mb-6 text-2xl font-semibold text-slate-800">Dashboard</h1>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Total Students</p>
                        <p className="mt-2 text-3xl font-bold text-blue-700">
                            {total === null ? '...' : total}
                        </p>
                    </div>

                    <Link
                        href="/students"
                        className="flex flex-col justify-center rounded-lg bg-white p-6 shadow-sm hover:shadow-md"
                    >
                        <p className="text-sm text-slate-500">Quick Navigation</p>
                        <p className="mt-2 text-lg font-semibold text-blue-700">View All Students →</p>
                    </Link>

                    <Link
                        href="/students/add"
                        className="flex flex-col justify-center rounded-lg bg-white p-6 shadow-sm hover:shadow-md"
                    >
                        <p className="text-sm text-slate-500">Quick Navigation</p>
                        <p className="mt-2 text-lg font-semibold text-blue-700">+ Add New Student</p>
                    </Link>
                </div>
            </main>
        </ProtectedRoute>
    );
}