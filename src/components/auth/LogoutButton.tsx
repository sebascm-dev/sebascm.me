'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors duration-300"
        >
            Cerrar Sesión
        </button>
    );
}
