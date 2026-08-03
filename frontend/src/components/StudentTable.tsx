'use client';

import Link from 'next/link';
import { Student } from '@/src/types/student';

interface Props {
    students: Student[];
    onDelete: (id: string) => void;
}

export default function StudentTable({ students, onDelete }: Props) {
    if (students.length === 0) {
        return (
            <div className="rounded-lg bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                No students found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Age</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-medium text-slate-800">{student.fullName}</td>
                        <td className="px-4 py-3 text-slate-600">{student.email}</td>
                        <td className="px-4 py-3 text-slate-600">{student.phoneNumber}</td>
                        <td className="px-4 py-3 text-slate-600">{student.course}</td>
                        <td className="px-4 py-3 text-slate-600">{student.age}</td>
                        <td className="px-4 py-3 text-right">
                            <Link
                                href={`/students/${student.id}/edit`}
                                className="mr-3 text-blue-600 hover:underline"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => student.id && onDelete(student.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}