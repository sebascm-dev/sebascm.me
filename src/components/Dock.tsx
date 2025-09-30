'use client';

import { MotionValue, motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation'; // Hook para obtener la ruta actual

export default function Dock() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  // Detectamos si estamos en móvil (por ejemplo, si el ancho de la ventana es menor a 768px)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname(); // Obtiene la ruta actual

  // Rutas principales del dock
  const pages = [
    { name: "Inicio", href: "/", icon: "/images/avatares/avatar_scm.webp" },
    { name: "About", href: "/about", icon: "/images/svg/about.svg" },
    { name: "Blog", href: "/blog", icon: "/images/svg/blog.svg" },
    { name: "Proyectos", href: "/proyectos", icon: "/images/svg/proyectos.svg" },
  ];

  // Páginas del submenú
  const submenuPages = [
    { name: "PadelStats", href: "/padelstats", icon: "/images/svg/padelstats.svg" },
    { name: "Carrera", href: "/carrera", icon: "/images/svg/carrera.svg" },
  ];

  return (
    <>
      {/* Submenú flotante */}
      <AnimatePresence>
        {showSubmenu && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onMouseMove={!isMobile ? (e) => mouseX.set(e.pageX) : undefined}
            onMouseLeave={!isMobile ? () => mouseX.set(Infinity) : undefined}
            className="fixed backdrop-blur-md bottom-28 left-0 right-0 z-50 mx-auto flex justify-center h-16 items-end gap-4 rounded-2xl bg-transparent border border-[#2E2D2D] px-4 pb-3 max-w-[300px] w-fit"
          >
            {submenuPages.map((page, i) => (
              <AppIcon
                key={i}
                mouseX={mouseX}
                href={page.href}
                icon={page.icon}
                isActive={pathname === page.href}
                name={page.name}
                isMobile={isMobile}
                onClick={() => setShowSubmenu(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock principal */}
      <motion.div
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
            isActive={pathname === page.href}
            name={page.name}
            isMobile={isMobile}
          />
        ))}
        
        {/* Botón de menú hamburguesa */}
        <MenuIcon
          mouseX={mouseX}
          isOpen={showSubmenu}
          onClick={() => setShowSubmenu(!showSubmenu)}
          isMobile={isMobile}
          isActive={pathname === '/padelstats' || pathname === '/carrera'}
        />
      </motion.div>
    </>
  );
}

function AppIcon({
  mouseX,
  href,
  icon,
  isActive,
  name,
  isMobile,
  onClick,
}: {
  mouseX: MotionValue;
  href: string;
  icon: string;
  isActive: boolean;
  name: string;
  isMobile: boolean;
  onClick?: () => void;
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
    <Link href={href} onClick={onClick}>
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
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-28 bg-[#D1D0D1] text-zinc-800 text-sm px-2 py-1 rounded-md shadow-lg"
            >
              {name}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

function MenuIcon({
  mouseX,
  isOpen,
  onClick,
  isMobile,
  isActive,
}: {
  mouseX: MotionValue;
  isOpen: boolean;
  onClick: () => void;
  isMobile: boolean;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const widthSpring = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const computedWidth = isMobile ? 40 : widthSpring;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      style={{ width: computedWidth }}
      className="aspect-square rounded-full bg-[#1C1C1C]/50 cursor-pointer flex justify-center items-center relative"
      onHoverStart={!isMobile ? () => setIsHovered(true) : undefined}
      onHoverEnd={!isMobile ? () => setIsHovered(false) : undefined}
    >
      <motion.div
        style={{ width: computedWidth }}
        className="border border-[#2E2D2D] p-1 rounded-full aspect-square flex items-center justify-center"
      >
        {/* Icono de 3 rayas */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-300 ${isOpen ? 'text-orange-500 rotate-90' : 'text-white'}`}
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </motion.div>

      {isActive && (
        <div>
          <span className="absolute -bottom-2 left-0 right-0 mx-auto size-1 bg-orange-500 rounded-full" />
          <span className="animate-ping absolute -bottom-2 left-0 right-0 mx-auto size-1 bg-orange-500 rounded-full" />
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {!isMobile && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-28 bg-[#D1D0D1] text-zinc-800 text-sm px-2 py-1 rounded-md shadow-lg whitespace-nowrap"
          >
            Más opciones
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
