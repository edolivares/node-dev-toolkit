# node-dev-toolkit

Este repositorio reúne un conjunto de herramientas desarrolladas en Node.js, cada una con un propósito específico, orientadas principalmente al procesamiento y protección de archivos para su uso en aplicaciones web.

## Funcionalidad por módulo

- **encrypter/**: Contiene el script para encriptar archivos `.glb` y `.usdz` utilizando AES-256-CBC. Ideal para asegurar modelos 3D antes de integrarlos en frontend.

## Instalación

Desde la raíz del proyecto:

```
npm install
```

Para ejecutar el módulo de encriptación:

```
npm run encrypt
```

Asegúrate de tener un archivo `.env` en la raíz del proyecto con una clave secreta válida en Base64:

```
SECRET_KEY=TU_CLAVE_EN_BASE64
```

## Estructura del proyecto

```
/
├── encrypter/            # Módulo de encriptación de modelos 3D
│   ├── encrypt-glb.js
│   ├── models/
│   ├── encrypted_output/
│   └── results.txt
├── .env                  # Archivo con la clave secreta (no se incluye en el repo)
├── package.json          # Dependencias del proyecto
└── README.md             # Este archivo
```

## Licencia

MIT