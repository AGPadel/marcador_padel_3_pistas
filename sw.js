# AG Pádel · Sistema de Marcador

Marcador de pádel profesional para torneos y clubes.  
PWA completa con marcador individual, mando remoto y videowall para proyector.

---

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Marcador principal — un dispositivo por pista |
| `control.html` | Mando remoto — reloj o segundo móvil |
| `videowall.html` | Proyección simultánea de 3 pistas |
| `manifest.json` | Configuración PWA |
| `sw.js` | Service Worker — caché offline |

---

## Publicar en GitHub Pages

1. Sube todos los archivos al repositorio
2. Ve a **Settings → Pages**
3. Selecciona `Branch: main` y carpeta `/root`
4. Guarda — disponible en `https://usuario.github.io/repositorio/`

---

## Uso del marcador (`index.html`)

1. Abre en el móvil que estará en la pista
2. Rellena los nombres de los jugadores y selecciona la pista (1, 2 o 3)
3. Pulsa **Iniciar partido**
4. Selecciona quién saca
5. Toca la mitad de la pantalla del equipo que gana el punto
6. El estado se sincroniza automáticamente con el videowall

---

## Uso del mando (`control.html`)

1. Abre en el reloj o segundo móvil
2. Selecciona la pista que quieres controlar (P1, P2, P3)
3. La primera vez introduce el canal del marcador (aparece en ⚙ Ajustes)
4. Pulsa **P. A** o **P. B** para anotar puntos
5. Usa **Deshacer** para corregir errores

---

## Uso del videowall (`videowall.html`)

1. Abre en el ordenador conectado al proyector
2. Pulsa **F11** para pantalla completa
3. Pulsa **⚙ Configurar** e introduce los canales de cada pista
4. Las 3 pistas se actualizan en tiempo real
5. Muestra datos de ejemplo hasta que haya partidos activos

---

## Cómo funcionan las 3 pistas

Cada marcador (`index.html`) guarda su estado en:
- `localStorage` → clave `ag_match_pista_1`, `ag_match_pista_2`, `ag_match_pista_3`
- `BroadcastChannel('agpadel')` → sincronización en tiempo real entre pestañas
- `ntfy.sh` → sincronización entre dispositivos distintos vía canal único

El videowall escucha los tres canales simultáneamente y se actualiza automáticamente.

---

## Fase piloto

Este sistema está en fase piloto. La sincronización en tiempo real depende de conexión a internet (ntfy.sh) o de que los dispositivos estén en la misma red. En modo local (mismo dispositivo), funciona sin internet.
