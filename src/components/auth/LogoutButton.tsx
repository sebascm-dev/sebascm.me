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
            className="group relative p-2 bg-red-500/10 hover:bg-red-500/20 border-2 border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-300 hover:scale-105"
            title="Cerrar Sesión"
        >
            {/* Icono de puerta de salida */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-red-400 group-hover:text-red-300 transition-colors"
            >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            
            {/* Indicador EXIT en hover */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                    Exit
                </div>
            </div>
        </button>
    );
}
