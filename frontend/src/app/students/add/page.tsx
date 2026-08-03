'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import Navbar from '@/src/components/Navbar';
import StudentForm from '@/src/components/StudentForm';
import api from '@/src/lib/axios';
import { Student } from '@/src/types/student';

export default function AddStudentPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (data: Student) => {
        setSubmitting(true);
        setError('');
        try {
            await api.post('/students', data);
            router.push('/students');
        } catch (err: any) {
            setError('Failed to add student. Please check the form.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <main className="mx-auto max-w-3xl px-6 py-8">
                <h1 className="mb-6 text-2xl font-semibold text-slate-800">Add Student</h1>

                {error && (
                    <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
                )}

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <StudentForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Add Student" />
                </div>
            </main>
        </ProtectedRoute>
    );
}