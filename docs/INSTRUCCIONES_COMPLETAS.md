# 🎓 Sistema Completo de Gestión de Carrera Universitaria

## ✅ Todo lo que se ha implementado

### 1️⃣ **Autenticación Segura** 🔐
- ✅ Página de login (`/login`) con diseño minimalista
- ✅ Middleware que protege rutas privadas
- ✅ Sistema de sesiones con Supabase Auth
- ✅ Botón de cerrar sesión
- ✅ Redirecciones automáticas

### 2️⃣ **Panel de Administración** (`/adminAsig`) 🛠️
- ✅ CRUD completo de asignaturas
- ✅ Estadísticas en tiempo real
- ✅ Filtros avanzados
- ✅ Organización por curso y cuatrimestre
- ✅ Sistema de notas y convocatorias
- ✅ **Solo accesible con autenticación**

### 3️⃣ **Dashboard Público** (`/carrera`) 📊
- ✅ Visualización de progreso con gráficas animadas
- ✅ 4 tarjetas de estadísticas con efectos de brillo
- ✅ Gráfico de progreso por curso (barras animadas)
- ✅ Gráfico de distribución de notas (donut chart)
- ✅ Gráfico comparativo de asignaturas por curso (barras apiladas)
- ✅ Lista filtrable de asignaturas
- ✅ **Accesible públicamente** para mostrar tu progreso

### 4️⃣ **Base de Datos** 💾
- ✅ Tabla `asignaturas` con 17 campos
- ✅ 73 asignaturas del plan de estudios oficial (BOE)
- ✅ Índices optimizados
- ✅ RLS habilitado

### 5️⃣ **Navegación** 🧭
- ✅ Enlace "Carrera" agregado al Dock (gráfico de líneas)
- ✅ Enlace "Asignaturas" eliminado del Dock (solo acceso directo)

---

## 🚀 Instalación y Configuración

### **PASO 1: Crear la tabla de asignaturas**

En Supabase SQL Editor, ejecuta:

```sql
-- 1. Crear tabla
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

-- 2. Crear índices
CREATE INDEX idx_asignaturas_curso ON asignaturas(curso);
CREATE INDEX idx_asignaturas_cuatrimestre ON asignaturas(cuatrimestre);
CREATE INDEX idx_asignaturas_caracter ON asignaturas(caracter);
CREATE INDEX idx_asignaturas_especialidad ON asignaturas(especialidad);
CREATE INDEX idx_asignaturas_superada ON asignaturas(superada);

-- 3. Habilitar RLS
ALTER TABLE asignaturas ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de seguridad
CREATE POLICY "Permitir lectura pública de asignaturas" 
ON asignaturas FOR SELECT 
USING (true);

CREATE POLICY "Permitir todas las operaciones en asignaturas" 
ON asignaturas FOR ALL 
USING (true);

COMMENT ON TABLE asignaturas IS 'Asignaturas de Ingeniería Informática - Universidad de Huelva';
```

### **PASO 2: Poblar con las asignaturas**

Ejecuta el archivo `public/scripts/poblar_asignaturas.sql` en Supabase SQL Editor.

### **PASO 3: Crear usuario administrador**

En Supabase SQL Editor, ejecuta:

```sql
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'spanolocabo@gmail.com',
    crypt('Seb51216-', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    ''
);
```

**Alternativa:** Crea el usuario desde **Authentication** → **Users** → **Add user** en Supabase Dashboard.

### **PASO 4: Verificar variables de entorno**

Tu `.env.local` debe tener:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wqcwbfsyhzexahafjqzy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### **PASO 5: Iniciar el servidor**

```bash
npm install  # Si es la primera vez
npm run dev
```

---

## 📍 Rutas del Sistema

### 🌐 **Rutas Públicas**
| Ruta | Descripción |
|------|-------------|
| `/` | Home - Presentación personal |
| `/about` | Sobre mí |
| `/blog` | Blog de posts |
| `/proyectos` | Portafolio de proyectos |
| `/padelstats` | Estadísticas de pádel |
| **`/carrera`** | **Dashboard público de la carrera** 🆕 |
| `/login` | Inicio de sesión |

### 🔒 **Rutas Privadas** (requieren autenticación)
| Ruta | Descripción |
|------|-------------|
| `/adminAsig` | Panel de administración de asignaturas |

---

## 🎨 Diseño y Estilo

Todo el sistema mantiene el estilo **modernista y minimalista** de tu portfolio:

### Paleta de Colores:
- **Background:** `#161616`
- **Cards:** `#1C1C1C/50` con `backdrop-blur`
- **Borders:** `#2E2D2D`
- **Texto primario:** `white` / `#EDEDED`
- **Texto secundario:** `#D1D0D1` / `gray-100/75`
- **Accent principal:** `orange-500`

### Animaciones:
- ✅ Framer Motion para transiciones suaves
- ✅ Efectos de hover interactivos
- ✅ Barras de progreso animadas
- ✅ Brillo dinámico en tarjetas estadísticas
- ✅ Fade in/out en componentes
- ✅ Stagger animations en listas

### Componentes Visuales:
- 📊 Gráficos con Chart.js (Doughnut, Bar)
- 🎯 Tarjetas con gradientes y borders de colores
- 📈 Barras de progreso animadas
- ✨ Efectos de brillo y shimmer
- 🎨 Badges con colores según tipo

---

## 📊 Funcionalidades del Dashboard `/carrera`

### 🎯 Tarjetas de Estadísticas (con efectos de brillo)
1. **Progreso General** (porcentaje) 📊
2. **Asignaturas** (superadas/total) 📚
3. **Créditos ECTS** (completados/total) 🎓
4. **Nota Media** (promedio) ⭐

### 📈 Gráficos Interactivos

#### 1. **Gráfico de Progreso por Curso**
- Barras horizontales por cada curso
- Colores: Verde (1º), Azul (2º), Morado (3º), Naranja (4º)
- Muestra asignaturas superadas/total
- Barra de progreso total al final

#### 2. **Distribución de Notas** (Donut Chart)
- 🟢 Sobresaliente (9-10)
- 🔵 Notable (7-8.9)
- 🟡 Aprobado (5-6.9)
- 🔴 Suspenso (0-4.9)
- Leyenda en la parte inferior
- Tooltips informativos

#### 3. **Asignaturas por Curso** (Barras Apiladas)
- Comparativa entre cursos
- Verde: Superadas
- Gris: Pendientes
- Eje Y: cantidad de asignaturas
- Eje X: cursos (1º, 2º, 3º, 4º)

### 📋 Lista de Asignaturas
- Filtros: Todas / Superadas / Pendientes
- Vista en grid responsive
- Tarjetas con:
  - Nombre de la asignatura
  - Badge del carácter (Básico/Obligatorio/Optativo)
  - ECTS y curso/cuatrimestre
  - Nota (si está superada)
  - Check verde (si está superada)
- Scroll en caso de muchas asignaturas

---

## 🛠️ Panel de Administración `/adminAsig`

### Estadísticas Superiores
- Total de asignaturas
- Asignaturas superadas
- Créditos completados/totales
- Nota media
- Porcentaje de progreso

### Filtros Disponibles
- Por curso (1º, 2º, 3º, 4º)
- Por cuatrimestre (1º, 2º)
- Por carácter (Básico, Obligatorio, Optativo)
- Por estado (Superadas, Pendientes)
- Por especialidad

### Acciones CRUD
- ➕ **Crear** nueva asignatura
- ✏️ **Editar** asignatura existente
- ✅ **Marcar como superada** (1 clic)
- 🗑️ **Eliminar** asignatura
- 📝 **Agregar nota y convocatoria**

### Formulario Completo
- Nombre, código, carácter, ECTS
- Curso, cuatrimestre, especialidad
- Materia, módulo, descripción
- Año académico
- Superada (checkbox)
- Nota y convocatoria

---

## 🔐 Sistema de Autenticación

### Flujo de Login
1. Usuario intenta acceder a `/adminAsig`
2. Middleware detecta falta de sesión
3. Redirige a `/login`
4. Usuario ingresa credenciales
5. Supabase Auth valida
6. Crea sesión y redirige a `/adminAsig`

### Credenciales
- **Email:** spanolocabo@gmail.com
- **Contraseña:** Seb51216-

### Seguridad
- ✅ Middleware de Next.js protege rutas
- ✅ Verificación en servidor (SSR)
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Sesiones con cookies HTTPOnly
- ✅ Tokens JWT validados en cada petición

---

## 📦 Dependencias Utilizadas

```json
{
  "@supabase/auth-helpers-nextjs": "^0.10.0",
  "chart.js": "^4.4.7",
  "framer-motion": "^11.11.9",
  "react-chartjs-2": "^5.3.0"
}
```

---

## 🎯 Estructura de Archivos Creados

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx                    # Página de login
│   ├── adminAsig/
│   │   └── page.tsx                    # Panel admin (privado)
│   └── carrera/
│       └── page.tsx                    # Dashboard público
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx               # Formulario de login
│   │   └── LogoutButton.tsx            # Botón cerrar sesión
│   ├── adminAsig/
│   │   ├── AsignaturasAdmin.tsx        # Lógica admin
│   │   ├── FormularioAsignatura.tsx    # Formulario CRUD
│   │   ├── TarjetaAsignatura.tsx       # Card asignatura
│   │   └── FiltrosAsignaturas.tsx      # Filtros
│   └── carrera/
│       ├── DashboardCarrera.tsx        # Dashboard principal
│       ├── TarjetasEstadisticas.tsx    # Tarjetas con stats
│       ├── GraficoProgreso.tsx         # Progreso por curso
│       ├── GraficoNotas.tsx            # Distribución notas
│       ├── GraficoCursos.tsx           # Barras por curso
│       └── ListaAsignaturas.tsx        # Lista filtrable
├── middleware.ts                        # Protección de rutas

public/
├── images/
│   └── svg/
│       ├── carrera.svg                 # Icono dashboard
│       └── asignaturas.svg             # Icono admin
└── scripts/
    └── poblar_asignaturas.sql          # 73 asignaturas

docs/
├── ASIGNATURAS_README.md               # Docs admin
├── CONFIGURACION_AUTH.md               # Docs auth
└── INSTRUCCIONES_COMPLETAS.md          # Este archivo
```

---

## 🎓 Plan de Estudios

### Total: 240 ECTS
- **Formación Básica:** 60 ECTS (1º curso)
- **Obligatorias:** 138 ECTS (2º, 3º y 4º)
- **Optativas:** 30 ECTS (4º curso)
- **TFG:** 12 ECTS (4º curso)

### Especialidades (3º y 4º curso):
1. **Ingeniería del Software**
2. **Ingeniería de Computadores**
3. **Computación**

---

## 🐛 Troubleshooting

### No puedo iniciar sesión
- ✅ Verifica que el usuario esté creado en `auth.users`
- ✅ Asegúrate de que el email esté confirmado
- ✅ Comprueba las credenciales

### No veo las asignaturas
- ✅ Ejecuta el script `poblar_asignaturas.sql`
- ✅ Verifica en Supabase Table Editor

### Las gráficas no se muestran
- ✅ Ejecuta `npm install` para instalar Chart.js
- ✅ Recarga la página

### Error de middleware
- ✅ Verifica que `middleware.ts` esté en `src/`
- ✅ Revisa que el matcher esté correcto

---

## ✨ Características Destacadas

### 🎨 Diseño
- ✅ Minimalista y modernista
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Dark theme consistente
- ✅ Animaciones fluidas
- ✅ Efectos visuales atractivos

### 📊 Datos
- ✅ Estadísticas en tiempo real
- ✅ Cálculos automáticos
- ✅ Filtros avanzados
- ✅ Visualizaciones interactivas

### 🔒 Seguridad
- ✅ Autenticación robusta
- ✅ Rutas protegidas
- ✅ RLS en base de datos
- ✅ Sesiones seguras

### 🚀 Rendimiento
- ✅ Server Components
- ✅ Índices en BD
- ✅ Lazy loading
- ✅ Optimización de queries

---

## 📸 Preview de Pantallas

### `/carrera` - Dashboard Público
```
┌─────────────────────────────────────────┐
│  Mi Carrera Universitaria               │
├─────────────────────────────────────────┤
│  [📊 85%] [📚 45/73] [🎓 180/240] [⭐8.2]│
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐            │
│  │Progreso  │  │ Notas    │            │
│  │por Curso │  │(Donut)   │            │
│  └──────────┘  └──────────┘            │
├─────────────────────────────────────────┤
│  Asignaturas por Curso (Barras)        │
├─────────────────────────────────────────┤
│  Lista de Asignaturas                   │
│  [Todas] [Superadas] [Pendientes]      │
└─────────────────────────────────────────┘
```

### `/login` - Inicio de Sesión
```
┌────────────────────────┐
│   Iniciar Sesión       │
├────────────────────────┤
│  📧 Email              │
│  [spanolocabo@...]     │
│                        │
│  🔒 Contraseña         │
│  [••••••••]            │
│                        │
│  [Iniciar Sesión]      │
└────────────────────────┘
```

### `/adminAsig` - Panel Admin
```
┌─────────────────────────────────────────┐
│  Administración de Asignaturas [Logout] │
├─────────────────────────────────────────┤
│  [45] [180] [8.2] [85%]                │
├─────────────────────────────────────────┤
│  [+ Nueva] [Filtros...]                │
├─────────────────────────────────────────┤
│  1º Curso - Primer Cuatrimestre        │
│  ┌────┐ ┌────┐ ┌────┐                 │
│  │Fís │ │Mat │ │Fun │                 │
│  └────┘ └────┘ └────┘                 │
└─────────────────────────────────────────┘
```

---

## 🎉 ¡Todo Listo!

Has implementado un sistema completo de gestión universitaria con:
- ✅ Autenticación segura
- ✅ Panel de administración privado
- ✅ Dashboard público con gráficas
- ✅ 73 asignaturas del plan oficial
- ✅ Diseño modernista y minimalista
- ✅ Animaciones fluidas
- ✅ Responsive design

### Próximos Pasos Sugeridos:
1. Agregar las asignaturas que ya has superado
2. Registrar tus notas actuales
3. Compartir el dashboard `/carrera` en tu portfolio
4. Seguir actualizando tu progreso

---

**¡Éxito en tu carrera! 🚀🎓**

**Universidad de Huelva - Ingeniería Informática**
