-- Script para poblar la tabla de asignaturas con el plan de estudios de Ingeniería Informática
-- Universidad de Huelva

-- ============================================
-- PRIMER CURSO - PRIMER CUATRIMESTRE (Básico)
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, materia, modulo) VALUES
('Física', NULL, 'Básico', 6, 1, 1, 'Física', 'Formación Básica'),
('Matemáticas I', NULL, 'Básico', 6, 1, 1, 'Matemáticas', 'Formación Básica'),
('Fundamentos de Computadores', NULL, 'Básico', 6, 1, 1, 'Informática', 'Formación Básica'),
('Fundamentos de Programación', NULL, 'Básico', 6, 1, 1, 'Informática', 'Formación Básica'),
('Administración y Economía de la Empresa', NULL, 'Básico', 6, 1, 1, 'Empresa', 'Formación Básica');

-- ============================================
-- PRIMER CURSO - SEGUNDO CUATRIMESTRE (Básico)
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, materia, modulo) VALUES
('Fundamentos de Análisis de Algoritmos', NULL, 'Básico', 6, 1, 2, 'Matemáticas', 'Formación Básica'),
('Matemáticas II', NULL, 'Básico', 6, 1, 2, 'Matemáticas', 'Formación Básica'),
('Matemáticas III', NULL, 'Básico', 6, 1, 2, 'Estadística', 'Formación Básica'),
('Tecnología de Computadores', NULL, 'Básico', 6, 1, 2, 'Física', 'Formación Básica'),
('Estructura de Datos I', NULL, 'Básico', 6, 1, 2, 'Informática', 'Formación Básica');

-- ============================================
-- SEGUNDO CURSO - PRIMER CUATRIMESTRE
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, materia, modulo) VALUES
('Fundamentos de Redes de Computadores', NULL, 'Obligatorio', 6, 2, 1, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Estructura de Computadores', NULL, 'Obligatorio', 6, 2, 1, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Diseño y Estructura de los Sistemas Operativos', NULL, 'Obligatorio', 6, 2, 1, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Metodología de la Programación', NULL, 'Obligatorio', 6, 2, 1, 'Programación de Computadores', 'Formación Común a la Rama de Informática'),
('Bases de Datos', NULL, 'Obligatorio', 6, 2, 1, 'Ingeniería del Software, Sistemas de Información y Sistemas Inteligentes', 'Formación Común a la Rama de Informática');

-- ============================================
-- SEGUNDO CURSO - SEGUNDO CUATRIMESTRE
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, materia, modulo) VALUES
('Arquitectura de Computadores', NULL, 'Obligatorio', 6, 2, 2, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Administración y Programación de Sistemas Operativos', NULL, 'Obligatorio', 6, 2, 2, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Inteligencia Artificial', NULL, 'Obligatorio', 6, 2, 2, 'Ingeniería del Software, Sistemas de Información y Sistemas Inteligentes', 'Formación Común a la Rama de Informática'),
('Principios y Fundamentos de la Ingeniería del Software', NULL, 'Obligatorio', 6, 2, 2, 'Ingeniería del Software, Sistemas de Información y Sistemas Inteligentes', 'Formación Común a la Rama de Informática'),
('Estructuras de Datos II', NULL, 'Obligatorio', 6, 2, 2, 'Programación de Computadores', 'Formación Común a la Rama de Informática');

-- ============================================
-- TERCER CURSO - PRIMER CUATRIMESTRE (Común)
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, materia, modulo) VALUES
('Interconexión de Redes de Computadores', NULL, 'Obligatorio', 6, 3, 1, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Programación Concurrente y Distribuida', NULL, 'Obligatorio', 6, 3, 1, 'Sistemas Operativos, Sistemas Distribuidos y Redes y Arquitectura de Computadores', 'Formación Común a la Rama de Informática'),
('Diseño y Desarrollo de Sistemas de Información', NULL, 'Obligatorio', 6, 3, 1, 'Ingeniería del Software, Sistemas de Información y Sistemas Inteligentes', 'Formación Común a la Rama de Informática'),
('Algorítmica y Modelos de Computación', NULL, 'Obligatorio', 6, 3, 1, 'Programación de Computadores', 'Formación Común a la Rama de Informática'),
('Elaboración de Proyectos Informáticos', NULL, 'Obligatorio', 6, 3, 1, 'Proyectos Informáticos', 'Formación Común a la Rama de Informática');

-- ============================================
-- TERCER CURSO - SEGUNDO CUATRIMESTRE
-- INGENIERÍA DE COMPUTADORES
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Computadores Comerciales', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería de Computadores', 'Computadores Comerciales', 'Tecnología Específica de Ingeniería de Computadores'),
('Diseño de Sistemas Hardware-Software', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería de Computadores', 'Diseño de Sistemas Hardware-Software', 'Tecnología Específica de Ingeniería de Computadores'),
('Sistemas Computadores de Altas Prestaciones', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería de Computadores', 'Sistemas Computadores de Altas Prestaciones', 'Tecnología Específica de Ingeniería de Computadores'),
('Sistemas Programables', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería de Computadores', 'Sistemas Programables', 'Tecnología Específica de Ingeniería de Computadores'),
('Administración y Gestión de Redes de Computadores', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería de Computadores', 'Administración y Gestión de Redes de Computadores', 'Tecnología Específica de Ingeniería de Computadores');

-- ============================================
-- TERCER CURSO - SEGUNDO CUATRIMESTRE
-- COMPUTACIÓN
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Sistemas de Percepción', NULL, 'Obligatorio', 6, 3, 2, 'Computación', 'Sistemas de Percepción', 'Tecnología Específica de Computación'),
('Realidad Virtual', NULL, 'Obligatorio', 6, 3, 2, 'Computación', 'Realidad Virtual', 'Tecnología Específica de Computación'),
('Sistemas Inteligentes', NULL, 'Obligatorio', 6, 3, 2, 'Computación', 'Sistemas Inteligentes', 'Tecnología Específica de Computación'),
('Procesadores de Lenguajes', NULL, 'Obligatorio', 6, 3, 2, 'Computación', 'Procesadores de Lenguajes', 'Tecnología Específica de Computación'),
('Representación del Conocimiento', NULL, 'Obligatorio', 6, 3, 2, 'Computación', 'Representación del Conocimiento', 'Tecnología Específica de Computación');

-- ============================================
-- TERCER CURSO - SEGUNDO CUATRIMESTRE
-- INGENIERÍA DEL SOFTWARE
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Arquitectura del Software Dirigida por Modelos', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería del Software', 'Arquitectura del Software Dirigida por Modelos', 'Tecnología Específica de Ingeniería del Software'),
('Diseño de Interfaces de Usuario', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería del Software', 'Diseño de Interfaces de Usuario', 'Tecnología Específica de Ingeniería del Software'),
('Ingeniería de Requisitos', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería del Software', 'Ingeniería de Requisitos', 'Tecnología Específica de Ingeniería del Software'),
('Métodos Formales en Ingeniería de Software', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería del Software', 'Métodos Formales en Ingeniería de Software', 'Tecnología Específica de Ingeniería del Software'),
('Sistemas Distribuidos', NULL, 'Obligatorio', 6, 3, 2, 'Ingeniería del Software', 'Sistemas Distribuidos', 'Tecnología Específica de Ingeniería del Software');

-- ============================================
-- CUARTO CURSO - PRIMER CUATRIMESTRE
-- INGENIERÍA DEL SOFTWARE
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Integración de la Información y Aplicaciones', NULL, 'Obligatorio', 6, 4, 1, 'Ingeniería del Software', 'Integración de la Información y Aplicaciones', 'Tecnología Específica de Ingeniería del Software'),
('Calidad, Medición y Estimación de Productos y Procesos Software', NULL, 'Obligatorio', 6, 4, 1, 'Ingeniería del Software', 'Calidad, Medición y Estimación de Productos y Procesos Software', 'Tecnología Específica de Ingeniería del Software');

-- ============================================
-- CUARTO CURSO - PRIMER CUATRIMESTRE
-- INGENIERÍA DE COMPUTADORES
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Administración de Servidores', NULL, 'Obligatorio', 6, 4, 1, 'Ingeniería de Computadores', 'Administración de Servidores', 'Complementos a la Formación'),
('Sistemas en Tiempo Real', NULL, 'Obligatorio', 6, 4, 1, 'Ingeniería de Computadores', 'Sistemas en Tiempo Real', 'Complementos a la Formación');

-- ============================================
-- CUARTO CURSO - PRIMER CUATRIMESTRE
-- COMPUTACIÓN
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Modelos Avanzados de Computación', NULL, 'Obligatorio', 6, 4, 1, 'Computación', 'Modelos Avanzados de Computación', 'Tecnología Específica de Computación'),
('Aprendizaje Automático', NULL, 'Obligatorio', 6, 4, 1, 'Computación', 'Aprendizaje Automático', 'Tecnología Específica de Computación');

-- ============================================
-- CUARTO CURSO - SEGUNDO CUATRIMESTRE
-- INGENIERÍA DEL SOFTWARE
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Mantenimiento y Gestión del Cambio en Sistemas Software', NULL, 'Obligatorio', 6, 4, 2, 'Ingeniería del Software', 'Mantenimiento y Gestión del Cambio en Sistemas Software', 'Tecnología Específica de Ingeniería del Software');

-- ============================================
-- CUARTO CURSO - SEGUNDO CUATRIMESTRE
-- INGENIERÍA DE COMPUTADORES
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Seguridad de Sistemas Informáticos', NULL, 'Obligatorio', 6, 4, 2, 'Ingeniería de Computadores', 'Seguridad de Sistemas Informáticos', 'Tecnología Específica de Ingeniería de Computadores');

-- ============================================
-- CUARTO CURSO - SEGUNDO CUATRIMESTRE
-- COMPUTACIÓN
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Modelos Bioinspirados y Heurísticas de Búsquedas', NULL, 'Obligatorio', 6, 4, 2, 'Computación', 'Modelos Bioinspirados y Heurísticas de Búsquedas', 'Tecnología Específica de Computación');

-- ============================================
-- ASIGNATURAS OPTATIVAS - TODAS LAS ESPECIALIDADES
-- (Primer cuatrimestre)
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Desarrollo de Aplicaciones Web', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Motores de Búsqueda', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Minería de Datos', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Diseño de Compiladores', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Procesamiento del Habla, Visión e Interacción Multimodal', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Animación por Ordenador', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Redes Avanzadas', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Robótica', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Visión por Computador', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Técnicas Numéricas para la Computación', NULL, 'Optativo', 6, 4, 1, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación');

-- ============================================
-- ASIGNATURAS OPTATIVAS - TODAS LAS ESPECIALIDADES
-- (Segundo cuatrimestre)
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Modelado de Negocio', NULL, 'Optativo', 6, 4, 2, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Inteligencia Artificial Aplicada a Robots', NULL, 'Optativo', 6, 4, 2, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Administración de Bases de Datos', NULL, 'Optativo', 6, 4, 2, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Programación de Juegos', NULL, 'Optativo', 6, 4, 2, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Domótica', NULL, 'Optativo', 6, 4, 2, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación'),
('Control por Computador', NULL, 'Optativo', 6, 4, 2, 'Todas', 'Asignaturas Optativas', 'Complementos a la Formación');

-- ============================================
-- TRABAJO FIN DE GRADO
-- ============================================
INSERT INTO asignaturas (nombre, codigo, caracter, ects, curso, cuatrimestre, especialidad, materia, modulo) VALUES
('Trabajo Fin de Grado - Ingeniería del Software', NULL, 'Obligatorio', 12, 4, 2, 'Ingeniería del Software', 'Asignaturas optativas', 'Trabajo fin de grado'),
('Trabajo Fin de Grado - Ingeniería de Computadores', NULL, 'Obligatorio', 12, 4, 2, 'Ingeniería de Computadores', NULL, 'Trabajo fin de grado'),
('Trabajo Fin de Grado - Computación', NULL, 'Obligatorio', 12, 4, 2, 'Computación', NULL, 'Trabajo fin de grado');

-- Comentario final
-- Total de asignaturas: ~73 (10 básicas + múltiples obligatorias según especialidad + 16 optativas + 3 TFG)
-- Total créditos: 240 ECTS
