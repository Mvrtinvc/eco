# eco

Compara los seguidores y seguidos exportados desde Instagram y muestra quién no
devuelve el seguimiento. PWA instalable en el celular.

- **URL publicada:** https://racuna-lgtm.github.io/eco/
- **Base de datos:** ninguna. No hay backend, no hay Supabase, no hay red.
  Los archivos se procesan en memoria en el navegador y se pierden al cerrar.
- **localStorage:** se usa solo para dos cosas que la usuaria activa a mano,
  bajo las llaves `eco:revisadas` (cuentas marcadas) y `eco:foto` (lista de
  nombres de usuario de sus seguidores, para comparar entre descargas). El
  texto de los mensajes nunca se guarda: se cuenta y se descarta.
  Ambas se borran desde la propia app.
- **Dependencias externas:** Google Fonts (Fraunces, Inter) y JSZip por CDN,
  solo para poder abrir el ZIP de Instagram sin descomprimirlo.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa: interfaz y lógica |
| `manifest.json` | Datos de instalación (nombre, iconos, colores) |
| `sw.js` | Service worker: caché offline e instalación |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Iconos |

## Al hacer cambios

Subir la `VERSION` dentro de `sw.js` (por ejemplo `eco-v1` → `eco-v2`) cada vez
que se modifique `index.html`. Si no, los celulares que ya la instalaron siguen
mostrando la versión guardada en caché.
