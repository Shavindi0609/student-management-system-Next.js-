'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import Navbar from '@/src/components/Navbar';
import StudentTable from '@/src/components/StudentTable';
import api from '@/src/lib/axios';
import { Student } from '@/src/types/student';

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await api.get('/students');
            setStudents(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            fetchStudents();
            return;
        }
        setLoading(true);
        try {
            const res = await api.get('/students/search', { params: { query } });
            setStudents(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this student?')) return;
        await api.delete(`/students/${id}`);
        setStudents((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <main className="mx-auto max-w-6xl px-6 py-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">Students</h1>
                    <Link
                        href="/students/add"
                        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        + Add Student
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full max-w-sm rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="rounded bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                    >
                        Search
                    </button>
                </form>

                {loading ? (
                    <p className="text-sm text-slate-500">Loading...</p>
                ) : (
                    <StudentTable students={students} onDelete={handleDelete} />
                )}
            </main>
        </ProtectedRoute>
    );
}