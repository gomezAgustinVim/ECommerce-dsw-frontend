# Documentación del FRONTEND

<!-- - color de fondo de pantalla colour: background-color: #ada8a8ff -->
<!-- - color de head 1: color: #535bf2 -->
<!-- - color de head 2: color: #535bf2 -->
<!-- - API para recopilar datos de una web: fake store API -->
<!---->

## Conexión

Para correr el frontend, se pueden usar:

```js
npm run dev
```

O también

```js
pnpm dev
```

Si queremos buildear estáticamente, podemos usar

```js
npm run build
```

```js
pnpm build
```

## Backend

Los endpoints del backend están en http://localhost:3000. Asegurarse de tener el
backend corriendo (ver documentación) para que se muestren los datos.

## Dependencias

Todas las dependencias que se usan se pueden instalar usando cualquiera de los
dos comandos.

```js
npm i
```

```js
pnpm i
```

Dependencias:

- **Axios**: API utilizada para hacer fetch y conectar el frontend con el
  backend
- **Tailwind**: Framework de CSS con clases pre cargadas para utilizarlas dentro
  del HTML
- **Vite**: Herramienta de compilación frontend extremadamente rápida
