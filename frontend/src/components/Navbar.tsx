'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {
    const router = useRouter();
    const adminName = typeof window !== 'undefined' ? Cookies.get('adminName') : '';

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('adminName');
        router.push('/login');
    };

    return (
        <nav className="bg-blue-700 text-white shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/dashboard" className="text-lg font-semibold">
                    Student Management System
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-sm hover:underline">
                        Dashboard
                    </Link>
                    <Link href="/students" className="text-sm hover:underline">
                        Students
                    </Link>
                    <span className="text-sm text-blue-100">{adminName}</span>
                    <button
                        onClick={handleLogout}
                        className="rounded bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}