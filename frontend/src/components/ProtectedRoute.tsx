'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.replace('/login');
        } else {
            setChecked(true);
        }
    }, [router]);

    if (!checked) {
        return (
            <div className="flex h-screen items-center justify-center text-slate-500">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}