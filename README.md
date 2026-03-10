# Pádel Score

Marcador de pádel para torneos y clubes. Aplicación web progresiva (PWA), autocontenida, sin dependencias externas.  
**Estado: Fase piloto.**

---

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Marcador principal — gestión completa de una pista |
| `control.html` | Control remoto desde móvil o segundo dispositivo |
| `videowall.html` | Pantalla panorámica 16:9 — visualización simultánea de 3 pistas |
| `manifest.json` | Configuración PWA |
| `sw.js` | Service worker — caché offline |
| `README.md` | Este archivo |

---

## Publicar en GitHub Pages

1. Crear repositorio en GitHub (público).
2. Subir todos los archivos a la raíz (`main` o `gh-pages`).
3. En **Settings → Pages**, seleccionar rama y carpeta raíz.
4. La app queda disponible en `https://<usuario>.github.io/<repositorio>/`.

Para que la PWA funcione correctamente, debe servirse desde HTTPS — GitHub Pages cumple este requisito.

---

## Uso — index.html

Marcador principal de una pista.

- **Pareja A / B**: tocar el nombre para editarlo directamente.
- **+1 Pareja A / B**: suma punto con lógica completa (15-30-40, deuce, ventaja, tiebreak).
- **Punto de oro**: activa/desactiva ventaja real. Con punto de oro activado, el empate 40-40 se resuelve con el siguiente punto.
- **Saque**: cambia el equipo que sirve manualmente.
- **Deshacer**: revierte la última acción (hasta 30 niveles).
- **Reiniciar**: inicia un partido nuevo en esa pista, conservando los nombres.
- **Pista**: selector de pista activa (1, 2 o 3). Cada pista tiene su propio estado en localStorage.
- El cronómetro refleja el tiempo real transcurrido desde el inicio del partido.
- El partido queda bloqueado al terminar (2 sets ganados). Solo se reactiva con Reiniciar.

---

## Uso — control.html

Interfaz remota para operar desde el móvil junto a la pista.

- Seleccionar la pista con el selector superior.
- Los botones grandes **+1** suman punto a cada pareja.
- **Deshacer**, **Saque** y **Reiniciar** funcionan igual que en `index.html`.
- El marcador superior refleja el estado en tiempo real, incluyendo puntos, juegos, sets, saque activo, tiebreak y ventajas.
- Se sincroniza automáticamente con `index.html` y `videowall.html` mediante BroadcastChannel (o localStorage events como fallback).

---

## Uso — videowall.html

Pantalla panorámica diseñada para proyector o monitor horizontal 16:9.

- Mostrar en pantalla completa (F11 o modo presentación del navegador).
- Actualiza automáticamente cada segundo.
- Muestra las 3 pistas simultáneamente.
- Si una pista no tiene datos activos en localStorage, muestra "Esperando partido" con datos de ejemplo visuales.

---

## Las 3 pistas del videowall

Cada pista usa una clave independiente en localStorage:

| Pista | Clave localStorage |
|---|---|
| Pista 1 | `match_pista_1` |
| Pista 2 | `match_pista_2` |
| Pista 3 | `match_pista_3` |

Para operar varias pistas a la vez: abrir `index.html` en distintos dispositivos o pestañas, seleccionando la pista correspondiente en cada uno. El videowall refleja el estado actualizado de las tres.

---

## Advertencia

Esta aplicación se encuentra en **fase piloto**. No cuenta con backend, autenticación ni sincronización en red. Todo el estado se gestiona mediante localStorage del navegador. Recomendado para uso en red local o dentro del mismo dispositivo/navegador.
