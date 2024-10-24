'use client'

import {
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Dock() {
    const mouseX = useMotionValue(Infinity); // Cambiado a const

    // Rutas para las páginas a las que quieres que redirijan los AppIcon
    const pages = [
        { name: "Home", href: "/", icon: "/images/avatares/avatar_scm.webp" },
        { name: "Home", href: "/about", icon: "/images/svg/user-code.svg" },
    ];

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="absolute bottom-10 left-0 right-0 z-50 mx-auto flex justify-center h-16 items-end gap-4 rounded-2xl bg-transparent border border-[#2E2D2D] px-4 pb-3 max-w-[600px] w-fit" // Ajuste del ancho máximo y uso de w-fit
        >
            {pages.map((page, i) => (
                <AppIcon mouseX={mouseX} key={i} href={page.href} icon={page.icon} />
            ))}
        </motion.div>
    );
}

function AppIcon({ mouseX, href, icon }: { mouseX: MotionValue, href: string, icon: string }) {
    const ref = useRef<HTMLDivElement>(null); // Cambiado a const

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
                className="aspect-square rounded-full bg-transparent cursor-pointer flex justify-center items-center"
            >
                <motion.img src={icon} style={{ width }} alt="Icono de la Pagina" className=" p-0.5 border border-[#2E2D2D] rounded-full object-cover aspect-square" />
            </motion.div>
        </Link>
    );
}
