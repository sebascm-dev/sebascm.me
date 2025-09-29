# 📚 Sistema de Administración de Asignaturas

Sistema completo para administrar las asignaturas de tu carrera de **Ingeniería Informática** en la Universidad de Huelva.

---

## 🚀 Instalación y Configuración

### 1. Crear la tabla en Supabase

Accede a tu proyecto de Supabase → SQL Editor y ejecuta el siguiente script:

```sql
-- Crear tabla de asignaturas
CREATE TABLE asignaturas (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  codigo VARCHAR,
  caracter VARCHAR NOT NULL CHECK (caracter IN ('Básico', 'Obligatorio', 'Optativo')),
  ects NUMERIC NOT NULL DEFAULT 6,
  curso SMALLINT NOT NULL CHECK (curso BETWEEN 1 AND 4),
  cuatrimestre SMALLINT NOT NULL CHECK (cuatrimestre IN (1, 2)),
  especialidad VARCHAR,
  materia VARCHAR,
  modulo VARCHAR,
  descripcion TEXT,
  superada BOOLEAN DEFAULT FALSE,
  nota NUMERIC CHECK (nota >= 0 AND nota <= 10),
  convocatoria SMALLINT,
  anio_academico VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índices para mejorar las consultas
CREATE INDEX idx_asignaturas_curso ON asignaturas(curso);
CREATE INDEX idx_asignaturas_cuatrimestre ON asignaturas(cuatrimestre);
CREATE INDEX idx_asignaturas_caracter ON asignaturas(caracter);
CREATE INDEX idx_asignaturas_especialidad ON asignaturas(especialidad);
CREATE INDEX idx_asignaturas_superada ON asignaturas(superada);

-- Habilitar RLS
ALTER TABLE asignaturas ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir lectura pública
CREATE POLICY "Permitir lectura pública de asignaturas" 
ON asignaturas FOR SELECT 
USING (true);

-- Crear política para permitir todas las operaciones
CREATE POLICY "Permitir todas las operaciones en asignaturas" 
ON asignaturas FOR ALL 
USING (true);

-- Comentario en la tabla
COMMENT ON TABLE asignaturas IS 'Asignaturas de la carrera de Ingeniería Informática en la Universidad de Huelva';
```

### 2. Poblar la base de datos

Ejecuta el script `public/scripts/poblar_asignaturas.sql` en Supabase SQL Editor para insertar todas las asignaturas del plan de estudios (73 asignaturas en total).

---

## 📊 Estructura de la Tabla

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGSERIAL | ID único autogenerado |
| `nombre` | VARCHAR | Nombre de la asignatura (requerido) |
| `codigo` | VARCHAR | Código de la asignatura |
| `caracter` | VARCHAR | Tipo: Básico, Obligatorio, Optativo (requerido) |
| `ects` | NUMERIC | Créditos ECTS (por defecto 6) |
| `curso` | SMALLINT | Curso (1-4) (requerido) |
| `cuatrimestre` | SMALLINT | Cuatrimestre (1-2) (requerido) |
| `especialidad` | VARCHAR | Especialidad (Ingeniería del Software, Ingeniería de Computadores, Computación, Todas, Común) |
| `materia` | VARCHAR | Materia a la que pertenece |
| `modulo` | VARCHAR | Módulo del plan de estudios |
| `descripcion` | TEXT | Descripción de la asignatura |
| `superada` | BOOLEAN | Si la asignatura está superada (por defecto false) |
| `nota` | NUMERIC | Nota obtenida (0-10) |
| `convocatoria` | SMALLINT | Número de convocatoria |
| `anio_academico` | VARCHAR | Año académico (ej: 2024/2025) |
| `created_at` | TIMESTAMPTZ | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Fecha de actualización |

---

## 🎯 Funcionalidades del Sistema

### 1. **Estadísticas en Tiempo Real**

En la parte superior de la página verás:
- **Total de Asignaturas**: Contador total de asignaturas en la base de datos
- **Superadas**: Número de asignaturas que has superado
- **Créditos**: Créditos superados / Créditos totales
- **Nota Media**: Promedio de las notas de las asignaturas superadas
- **Progreso**: Porcentaje de créditos completados (%)

### 2. **Filtros Avanzados**

Filtra las asignaturas por:
- **Curso**: 1º, 2º, 3º, 4º o Todos
- **Cuatrimestre**: Primero, Segundo o Ambos
- **Carácter**: Básico, Obligatorio, Optativo o Todos
- **Estado**: Superadas, Pendientes o Todas
- **Especialidad**: Software, Computadores, Computación, Todas o Común

### 3. **CRUD Completo**

#### **Crear Asignatura**
1. Haz clic en el botón "+ Nueva Asignatura"
2. Rellena el formulario con los datos
3. Haz clic en "Guardar"

#### **Editar Asignatura**
1. Haz clic en el botón "Editar" de la tarjeta de la asignatura
2. Modifica los campos que desees
3. Haz clic en "Guardar"

#### **Marcar como Superada**
1. Haz clic en el icono de check ✓ en la esquina superior derecha de la tarjeta
2. La asignatura cambiará a color verde
3. Puedes agregar la nota y la convocatoria editándola

#### **Eliminar Asignatura**
1. Haz clic en el botón "Eliminar" de la tarjeta
2. Confirma la eliminación

### 4. **Organización Visual**

Las asignaturas se muestran agrupadas por:
- **Curso** (1º, 2º, 3º, 4º)
- **Cuatrimestre** (Primero, Segundo)

Cada tarjeta muestra:
- Nombre de la asignatura
- Código (si existe)
- Badges de:
  - Carácter (Básico/Obligatorio/Optativo) con color distintivo
  - ECTS
  - Especialidad (si aplica)
- Nota y convocatoria (si está superada)
- Descripción breve
- Estado visual (verde si superada)

---

## 🎨 Código de Colores

### Carácter de Asignatura:
- 🔵 **Básico**: Border azul
- 🟢 **Obligatorio**: Border verde
- 🟣 **Optativo**: Border morado

### Notas:
- 🟢 **9.0 - 10.0**: Verde (Sobresaliente)
- 🔵 **7.0 - 8.9**: Azul (Notable)
- 🟡 **5.0 - 6.9**: Amarillo (Aprobado)
- 🔴 **0.0 - 4.9**: Rojo (Suspenso)

### Estado:
- 🟢 **Superada**: Tarjeta con fondo verde claro y border verde
- ⚫ **Pendiente**: Tarjeta normal con border gris

---

## 📈 Plan de Estudios

El sistema incluye todas las asignaturas del **Graduado en Ingeniería Informática** de la Universidad de Huelva:

### Distribución de Créditos:
- **Formación Básica**: 60 ECTS (1º curso)
- **Obligatorias**: 138 ECTS (2º, 3º y 4º curso)
- **Optativas**: 30 ECTS (4º curso)
- **Trabajo Fin de Grado**: 12 ECTS (4º curso)
- **TOTAL**: 240 ECTS

### Especialidades (3º y 4º curso):
1. **Ingeniería del Software**
   - Enfoque en desarrollo, arquitectura y gestión de software
   
2. **Ingeniería de Computadores**
   - Enfoque en hardware, sistemas y redes
   
3. **Computación**
   - Enfoque en IA, algoritmos y computación avanzada

---

## 🔧 Estructura de Archivos

```
src/
├── app/
│   └── adminAsig/
│       └── page.tsx                    # Página principal
├── components/
│   └── adminAsig/
│       ├── AsignaturasAdmin.tsx        # Componente principal con lógica
│       ├── FormularioAsignatura.tsx    # Formulario para crear/editar
│       ├── TarjetaAsignatura.tsx       # Card de cada asignatura
│       └── FiltrosAsignaturas.tsx      # Filtros de búsqueda

public/
├── images/
│   └── svg/
│       └── asignaturas.svg             # Icono para el Dock
└── scripts/
    └── poblar_asignaturas.sql          # Script para poblar la BD
```

---

## 🚀 Acceso al Sistema

1. Navega a `/adminAsig` en tu navegador
2. O haz clic en el icono de "Asignaturas" (libro con check) en el Dock

---

## 💡 Casos de Uso

### Ejemplo 1: Registrar una asignatura superada
1. Busca la asignatura en la lista
2. Haz clic en el icono de check para marcarla como superada
3. Haz clic en "Editar"
4. Agrega la nota (ej: 8.50)
5. Agrega la convocatoria (ej: 1)
6. Agrega el año académico (ej: 2024/2025)
7. Guarda los cambios

### Ejemplo 2: Ver solo asignaturas pendientes de 3º curso
1. En los filtros, selecciona:
   - Curso: 3º Curso
   - Estado: Pendientes
2. Las asignaturas se filtrarán automáticamente

### Ejemplo 3: Calcular nota media
La nota media se calcula automáticamente en las estadísticas superiores, considerando solo las asignaturas:
- Marcadas como superadas
- Que tengan una nota registrada

---

## 📝 Notas Técnicas

### Tecnologías Utilizadas:
- **Next.js 14** (App Router)
- **Supabase** (Base de datos PostgreSQL)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animaciones)

### Características:
- ✅ Server Components para fetching inicial
- ✅ Client Components para interactividad
- ✅ Real-time updates al modificar datos
- ✅ Responsive design (móvil, tablet, desktop)
- ✅ Validaciones en formularios
- ✅ Confirmaciones antes de eliminar
- ✅ RLS (Row Level Security) habilitado

---

## 🎓 Plan de Estudios Oficial

Basado en el **BOE Núm. 245** del 11 de octubre de 2017, con correcciones del **BOE Núm. 269** del 6 de noviembre de 2017.

**Universidad de Huelva**  
**Rama de Ingeniería y Arquitectura**  
**Título**: Graduado/Graduada en Ingeniería Informática

---

## 🐛 Troubleshooting

### La tabla no se crea
- Verifica que estés ejecutando el SQL en el proyecto correcto de Supabase
- Asegúrate de tener permisos de administrador

### No aparecen las asignaturas
- Verifica que hayas ejecutado el script `poblar_asignaturas.sql`
- Comprueba en Supabase Table Editor que la tabla `asignaturas` tiene datos

### Las estadísticas no se actualizan
- Recarga la página (las estadísticas se calculan en tiempo real desde el servidor)

### Errores al guardar cambios
- Verifica que las políticas de RLS estén correctamente configuradas
- Comprueba la consola del navegador para ver errores específicos

---

## 🎉 ¡Listo!

Ya tienes un sistema completo para gestionar todas las asignaturas de tu carrera. ¡Mucho éxito en tus estudios! 🚀📚

---

**Desarrollado por:** Sebastián Contreras Marín  
**Fecha:** Septiembre 2025
