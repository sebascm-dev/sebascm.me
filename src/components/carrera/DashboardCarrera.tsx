'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import GraficoProgreso from './GraficoProgreso';
import GraficoNotas from './GraficoNotas';
import TarjetasEstadisticas from './TarjetasEstadisticas';
import ListaAsignaturas from './ListaAsignaturas';
import AsignaturasCursando from './AsignaturasCursando';

interface Asignatura {
    id: number;
    nombre: string;
    caracter: string;
    ects: number;
    curso: number;
    cuatrimestre: number;
    especialidad?: string;
    superada: boolean;
    nota?: number;
    estado?: string;
}

interface DashboardCarreraProps {
    asignaturas: Asignatura[];
}

export default function DashboardCarrera({ asignaturas }: DashboardCarreraProps) {
    const estadisticas = useMemo(() => {
        const total = asignaturas.length;
        const superadas = asignaturas.filter(a => a.superada).length;
        // Total de créditos ECTS de la carrera (240 ECTS obligatorios para graduarse)
        const creditosTotales = 240;
        const creditosSuperados = asignaturas.filter(a => a.superada).reduce((sum, a) => sum + Number(a.ects), 0);
        
        const asignaturasConNota = asignaturas.filter(a => a.superada && a.nota);
        const notaMedia = asignaturasConNota.length > 0
            ? asignaturasConNota.reduce((sum, a) => sum + Number(a.nota || 0), 0) / asignaturasConNota.length
            : 0;
        
        const progresoGeneral = Math.min((creditosSuperados / creditosTotales) * 100, 100);

        // Por curso
        const progresoPorCurso = [1, 2, 3, 4].map(curso => {
            const asignaturasCurso = asignaturas.filter(a => a.curso === curso);
            const superadasCurso = asignaturasCurso.filter(a => a.superada).length;
            return {
                curso,
                total: asignaturasCurso.length,
                superadas: superadasCurso,
                porcentaje: asignaturasCurso.length > 0 ? (superadasCurso / asignaturasCurso.length) * 100 : 0
            };
        });

        // Distribución por estado
        const distribucionNotas = {
            aprobadas: asignaturas.filter(a => a.superada).length,
            cursando: asignaturas.filter(a => a.estado === 'Cursando' && !a.superada).length,
            suspensas: asignaturas.filter(a => a.estado === 'Suspensa' || (!a.superada && a.nota !== undefined && a.nota !== null && a.nota < 5)).length,
            sinCursar: asignaturas.filter(a => !a.superada && a.estado !== 'Cursando' && a.estado !== 'Suspensa' && (a.nota === undefined || a.nota === null || a.nota >= 5)).length,
        };

        return {
            total,
            superadas,
            creditosTotales,
            creditosSuperados,
            notaMedia,
            progresoGeneral,
            progresoPorCurso,
            distribucionNotas
        };
    }, [asignaturas]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Tarjetas de Estadísticas */}
            <motion.div variants={itemVariants}>
                <TarjetasEstadisticas estadisticas={estadisticas} />
            </motion.div>

            {/* Asignaturas cursando */}
            <motion.div variants={itemVariants} className="mt-6">
                <AsignaturasCursando asignaturas={asignaturas} />
            </motion.div>

            {/* Gráficos principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                <motion.div variants={itemVariants}>
                    <GraficoProgreso 
                        progresoPorCurso={estadisticas.progresoPorCurso}
                        progresoGeneral={estadisticas.progresoGeneral}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <GraficoNotas distribucionNotas={estadisticas.distribucionNotas} />
                </motion.div>
            </div>

            {/* Lista de asignaturas recientes */}
            <motion.div variants={itemVariants} className="mt-8">
                <ListaAsignaturas asignaturas={asignaturas} />
            </motion.div>
        </motion.div>
    );
}
