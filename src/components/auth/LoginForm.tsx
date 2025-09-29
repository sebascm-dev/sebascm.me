'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
            setLoading(false);
            return;
        }

        router.push('/adminAsig');
        router.refresh();
    };

    return (
        <div className="w-full border border-[#2E2D2D] rounded-md p-8 bg-[#1C1C1C]/50 backdrop-blur-[2px]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
                <p className="text-sm text-gray-100/75">Acceso a la administración de asignaturas</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white placeholder:text-gray-100/30 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white placeholder:text-gray-100/30 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#2E2D2D]">
                <p className="text-xs text-center text-gray-100/50">
                    Acceso restringido solo para administradores
                </p>
            </div>
        </div>
    );
}
