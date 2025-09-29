'use client';

import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation'; // Hook para obtener la ruta actual

export default function Dock() {
  const [isMobile, setIsMobile] = useState(false);

  // Detectamos si estamos en móvil (por ejemplo, si el ancho de la ventana es menor a 768px)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname(); // Obtiene la ruta actual

  // Rutas para las páginas
  const pages = [
    { name: "Inicio", href: "/", icon: "/images/avatares/avatar_scm.webp" },
    { name: "About", href: "/about", icon: "/images/svg/about.svg" },
    { name: "Blog", href: "/blog", icon: "/images/svg/blog.svg" },
    { name: "Proyectos", href: "/proyectos", icon: "/images/svg/proyectos.svg" },
    { name: "PadelStats", href: "/padelstats", icon: "/images/svg/padelstats.svg" },
    { name: "Carrera", href: "/carrera", icon: "/images/svg/carrera.svg" },
  ];

  return (
    <motion.div
      // Solo asignamos estos eventos si no estamos en móvil
      onMouseMove={!isMobile ? (e) => mouseX.set(e.pageX) : undefined}
      onMouseLeave={!isMobile ? () => mouseX.set(Infinity) : undefined}
      className="fixed backdrop-blur-md bottom-10 left-0 right-0 z-50 mx-auto flex justify-center h-16 items-end gap-4 rounded-2xl bg-transparent border border-[#2E2D2D] px-4 pb-3 max-w-[600px] w-fit"
    >
      {pages.map((page, i) => (
        <AppIcon
          key={i}
          mouseX={mouseX}
          href={page.href}
          icon={page.icon}
          isActive={pathname === page.href} // Marca la página activa
          name={page.name} // Nombre para el tooltip
          isMobile={isMobile} // Indicador de dispositivo móvil
        />
      ))}
    </motion.div>
  );
}

function AppIcon({
  mouseX,
  href,
  icon,
  isActive,
  name,
  isMobile,
}: {
  mouseX: MotionValue;
  href: string;
  icon: string;
  isActive: boolean;
  name: string;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculamos la distancia en base a la posición del mouse solo si no es móvil
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Ancho animado: de 40 a 100 y de vuelta a 40
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const widthSpring = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // Si es móvil, usamos un ancho fijo (por ejemplo, 40px)
  const computedWidth = isMobile ? 40 : widthSpring;

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width: computedWidth }}
        className="aspect-square rounded-full bg-[#1C1C1C]/50 cursor-pointer flex justify-center items-center relative"
        // Solo activamos los eventos de hover si no es móvil
        onHoverStart={!isMobile ? () => setIsHovered(true) : undefined}
        onHoverEnd={!isMobile ? () => setIsHovered(false) : undefined}
      >
        <motion.img
          src={icon}
          style={{ width: computedWidth }}
          alt="Icono de la Página"
          className="border border-[#2E2D2D] p-1 rounded-full object-cover aspect-square"
        />
        {isActive && (
          <div>
            <span className="absolute -bottom-2 left-0 right-0 mx-auto size-1 bg-orange-500 rounded-full" />
            <span className="animate-ping absolute -bottom-2 left-0 right-0 mx-auto size-1 bg-orange-500 rounded-full" />
          </div>
        )}
        {/* Mostrar tooltip solo en desktop */}
        {!isMobile && isHovered && (
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
