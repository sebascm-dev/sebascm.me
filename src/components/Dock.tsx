'use client';

import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'; // Importa el hook para obtener la URL actual

export default function Dock() {
    const mouseX = useMotionValue(Infinity); // Cambiado a const
    const pathname = usePathname(); // Obtiene la ruta actual

    // Rutas para las páginas a las que quieres que redirijan los AppIcon
    const pages = [
        { name: "Inicio", href: "/", icon: "/images/avatares/avatar_scm.webp" },
        { name: "About", href: "/about", icon: "/images/svg/about.svg" },
        { name: "Blog", href: "/blog", icon: "/images/svg/blog.svg" },
    ];

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="absolute bottom-10 left-0 right-0 z-50 mx-auto flex justify-center h-16 items-end gap-4 rounded-2xl bg-transparent border border-[#2E2D2D] px-4 pb-3 max-w-[600px] w-fit"
        >
            {pages.map((page, i) => (
                <AppIcon
                    key={i}
                    mouseX={mouseX}
                    href={page.href}
                    icon={page.icon}
                    isActive={pathname === page.href} // Marca la página activa
                    name={page.name} // Añadido el nombre para el tooltip
                />
            ))}
        </motion.div>
    );
}

function AppIcon({ mouseX, href, icon, isActive, name }: { mouseX: MotionValue, href: string, icon: string, isActive: boolean, name: string }) {
    const ref = useRef<HTMLDivElement>(null); // Cambiado a const
    const [isHovered, setIsHovered] = useState(false); // Estado para manejar el hover

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }; // Cambiado a const
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]); // Cambiado a const
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 }); // Cambiado a const

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square rounded-full bg-[#1C1C1C]/50 cursor-pointer flex justify-center items-center relative"
                onHoverStart={() => setIsHovered(true)} // Muestra el tooltip al hacer hover
                onHoverEnd={() => setIsHovered(false)} // Oculta el tooltip al salir del hover
            >
                <motion.img
                    src={icon}
                    style={{ width }}
                    alt="Icono de la Pagina"
                    className="border border-[#2E2D2D] p-1 rounded-full object-cover aspect-square"
                />
                {isActive && (
                    <div>
                        <span className="absolute -bottom-2 left-0 right-0 mx-auto size-1 bg-orange-500 rounded-full" />
                        <span className="animate-ping absolute -bottom-2 left-0 right-0 mx-auto size-1 bg-orange-500 rounded-full" />
                    </div>
                )}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-28 bg-[#D1D0D1] text-zinc-800 text-sm px-2 py-1 rounded-md shadow-lg"
                    >
                        {name}
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
}
