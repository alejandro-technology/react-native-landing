# Landing Page - RN Clean Architecture Template

Landing page moderna y profesional para promocionar el React Native Clean Architecture Template y su CLI tool.

## 🎨 Características

- **Diseño Moderno**: Inspirado en sitios como tamagui.dev con gradientes y efectos visuales
- **Totalmente Responsive**: Optimizada para desktop, tablet y móvil
- **Animaciones Suaves**: Efectos de scroll, hover y transiciones fluidas
- **Interactiva**: Tabs de código, copy to clipboard, parallax effects
- **Performance**: Optimizada con Intersection Observer y respeta `prefers-reduced-motion`
- **Sin Dependencias**: Solo HTML, CSS y JavaScript vanilla (sin frameworks)

## 📁 Estructura

```
landing/
├── index.html      # Estructura principal de la página
├── styles.css      # Estilos con variables CSS y animaciones
├── script.js       # Interactividad y efectos
└── README.md       # Este archivo
```

## 🚀 Uso

### Opción 1: Abrir directamente

Simplemente abre `index.html` en tu navegador favorito.

### Opción 2: Servidor local (recomendado)

Para evitar problemas con CORS y ver la página como se vería en producción:

```bash
# Usando Python (viene preinstalado en macOS)
python3 -m http.server 8000

# O usando Node.js
npx serve

# O usando PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 🎯 Secciones

1. **Hero Section**: Título principal con comando de instalación
2. **Features**: Grid con 8 características principales
3. **Architecture**: Diagrama de las 4 capas de Clean Architecture
4. **Code Examples**: Ejemplos de código con tabs interactivos
5. **Quick Start**: 3 pasos para empezar
6. **Tech Stack**: Todas las tecnologías incluidas
7. **CTA**: Call to action con botones principales
8. **Footer**: Enlaces y créditos

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  /* ... más variables */
}
```

### Contenido

Todos los textos están en español y pueden editarse directamente en `index.html`.

### Enlaces

Actualiza los enlaces de GitHub en:
- Navigation
- Hero buttons
- Footer

Busca `https://github.com/CrisangerA/` y reemplaza con tu username.

## ✨ Características Interactivas

### Copy to Clipboard
- Click en "Copy Install Command" copia el comando npx
- Click en el icono 📋 en los bloques de código copia el código

### Tabs de Código
- Click en los botones de tabs para ver diferentes ejemplos
- Service Layer, Custom Hook, Component

### Animaciones
- Scroll reveal en secciones
- Parallax en hero background
- Hover effects en tarjetas
- Stagger animations en tech stack

### Mobile Navigation
- Se activa automáticamente en pantallas < 640px
- Botón hamburger para mostrar/ocultar menú

## 🎁 Easter Eggs

- **Konami Code**: Arriba, Arriba, Abajo, Abajo, Izquierda, Derecha, Izquierda, Derecha, B, A
- **Console Message**: Abre las DevTools para ver un mensaje personalizado

## 🌐 Deployment

### GitHub Pages

1. Sube la carpeta `landing` a tu repositorio
2. Ve a Settings > Pages
3. Selecciona la rama y carpeta `/landing`
4. Guarda y espera unos minutos

### Netlify/Vercel

1. Arrastra la carpeta `landing` a Netlify Drop
2. O conecta tu repositorio y configura la carpeta

### Cloudflare Pages

1. Conecta tu repositorio
2. Build command: (ninguno)
3. Output directory: `landing`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 968px
- **Desktop**: > 968px

## 🎭 Browser Support

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Opera (últimas 2 versiones)

## 📝 Notas

- Todos los íconos son emojis (no requiere fuentes adicionales)
- Fuente: Inter de Google Fonts (cargada desde CDN)
- Código resalta sintaxis con clases CSS personalizadas
- Sin dependencias de JavaScript (sin jQuery, React, etc.)

## 🔧 Mejoras Futuras

- [ ] Agregar sección de testimonios
- [ ] Integrar analytics (Google Analytics, Plausible, etc.)
- [ ] Agregar galería de screenshots del template
- [ ] Formulario de newsletter
- [ ] Dark/Light mode toggle
- [ ] Más ejemplos de código interactivos

## 📄 Licencia

MIT - Siéntete libre de usar, modificar y distribuir.

---

Hecho con ❤️ usando solo HTML, CSS y JavaScript vanilla.
