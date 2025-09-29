-- Migración: Agregar columna estado para marcar asignaturas como "Cursando"
-- Fecha: 2024-09-29

-- Agregar columna estado
ALTER TABLE asignaturas 
ADD COLUMN IF NOT EXISTS estado VARCHAR(50);

-- Agregar índice para búsquedas más rápidas por estado
CREATE INDEX IF NOT EXISTS idx_asignaturas_estado ON asignaturas(estado);

-- Comentario explicativo
COMMENT ON COLUMN asignaturas.estado IS 'Estado actual de la asignatura (ej: Cursando, Pendiente, etc)';
