# 🔐 Configuración de Autenticación

## Pasos para configurar la autenticación en Supabase

### 1️⃣ Habilitar Email Auth en Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **Authentication** → **Providers**
3. Asegúrate de que **Email** esté habilitado
4. Desactiva **"Confirm email"** para testing (o déjalo activado para producción)

### 2️⃣ Crear tu usuario administrador

Abre el **SQL Editor** en Supabase y ejecuta:

```sql
-- Insertar usuario administrador
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

**IMPORTANTE:** Este script crea el usuario con la contraseña encriptada de forma segura.

### 3️⃣ Alternativa: Crear usuario desde el Dashboard

1. Ve a **Authentication** → **Users**
2. Haz clic en **"Add user"**
3. Método: **Create new user**
4. Email: `spanolocabo@gmail.com`
5. Password: `Seb51216-`
6. **Auto Confirm User**: ✅ (marcado)
7. Haz clic en **Create user**

---

## 🔑 Credenciales de Acceso

**Email:** spanolocabo@gmail.com  
**Contraseña:** Seb51216-

---

## 📋 Rutas del Sistema

### Rutas Públicas:
- `/` - Home
- `/about` - Sobre mí
- `/blog` - Blog
- `/proyectos` - Proyectos
- `/padelstats` - Estadísticas de pádel
- `/carrera` - Dashboard público de la carrera 🆕
- `/login` - Página de inicio de sesión

### Rutas Privadas (requieren autenticación):
- `/adminAsig` - Administración de asignaturas (solo admin)

---

## 🛡️ Seguridad

### Middleware de Protección
El archivo `src/middleware.ts` protege automáticamente la ruta `/adminAsig`:

```typescript
// Si intenta acceder a /adminAsig sin sesión, redirige a /login
if (req.nextUrl.pathname.startsWith('/adminAsig') && !session) {
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
}
```

### Verificación en el Servidor
En la página `/adminAsig`, se verifica la sesión en el servidor:

```typescript
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
    redirect('/login');
}
```

---

## 🎯 Flujo de Autenticación

1. Usuario intenta acceder a `/adminAsig`
2. Middleware detecta que no hay sesión
3. Redirige a `/login`
4. Usuario ingresa credenciales
5. Supabase valida credenciales
6. Si son correctas, crea sesión
7. Redirige a `/adminAsig`
8. Usuario puede administrar asignaturas
9. Al cerrar sesión, se destruye la sesión y redirige a `/`

---

## 🔄 Cerrar Sesión

En la página `/adminAsig`, hay un botón "Cerrar Sesión" en la esquina superior derecha que:
1. Cierra la sesión en Supabase
2. Redirige al home (`/`)
3. Limpia todas las cookies de sesión

---

## 🐛 Troubleshooting

### Error: "Invalid login credentials"
- Verifica que el usuario esté creado en Supabase
- Asegúrate de que el email esté confirmado
- Comprueba que la contraseña sea correcta

### Error: "User not found"
- El usuario no existe en `auth.users`
- Crea el usuario usando SQL o el Dashboard

### No redirige después del login
- Verifica que las cookies estén habilitadas
- Comprueba la configuración de CORS en Supabase
- Revisa la consola del navegador para errores

### Middleware no funciona
- Asegúrate de que `next.config.mjs` no tenga configuraciones conflictivas
- El middleware solo se aplica a rutas que coincidan con el `matcher`

---

## 🚀 Variables de Entorno

Asegúrate de tener en tu `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

---

## 📦 Dependencias Necesarias

Ya están instaladas en tu proyecto:

```json
{
  "@supabase/auth-helpers-nextjs": "^0.10.0"
}
```

---

## ✅ Verificación

Para verificar que todo funciona:

1. Inicia el servidor: `npm run dev`
2. Navega a `http://localhost:3000/adminAsig`
3. Deberías ser redirigido a `/login`
4. Ingresa las credenciales
5. Deberías ser redirigido a `/adminAsig`
6. Deberías ver el botón "Cerrar Sesión"

---

## 🎨 Diseño del Login

El formulario de login mantiene el diseño minimalista y modernista:
- Fondo oscuro translúcido con backdrop-blur
- Border sutiles con color `#2E2D2D`
- Inputs con focus en naranja (color principal)
- Mensajes de error en rojo claro
- Botón con hover animado

---

## 📝 Notas Importantes

1. **Producción:** En producción, considera:
   - Habilitar confirmación de email
   - Implementar recuperación de contraseña
   - Agregar rate limiting
   - Implementar 2FA (autenticación de dos factores)

2. **Seguridad adicional:**
   - Las contraseñas se almacenan hasheadas con bcrypt
   - Las sesiones expiran automáticamente
   - Los tokens se validan en cada petición

3. **Escalabilidad:**
   - Puedes agregar más usuarios administradores
   - Puedes implementar roles y permisos
   - Puedes agregar autenticación con Google/GitHub

---

**¡Listo! Ahora tienes un sistema de autenticación seguro y funcional.** 🎉
