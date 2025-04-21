# Encriptador de modelos GLB y USDZ (encrypter/)

Este es un módulo ubicado en la carpeta `encrypter/`, diseñado para encriptar modelos 3D `.glb` y `.usdz` utilizando el algoritmo **AES-256-CBC**, protegiéndolos para su uso seguro en aplicaciones web (por ejemplo, en React).

## Requisitos

- Node.js (v16 o superior)
- Archivos `.glb` o `.usdz` dentro de la carpeta `encrypter/models/`
- Archivo `.env` ubicado en la raíz del proyecto (un nivel superior) con una clave secreta en base64 de exactamente **32 bytes** una vez decodificada:

```
SECRET_KEY=TU_CLAVE_EN_BASE64
```

> ⚠️ La clave debe ser compatible con `aes-256-cbc`, ya que se utilizará también en el frontend.

## Uso

Puedes ejecutar el script de dos formas:

### 1. Usando el comando de npm desde la raíz del proyecto:
```
npm run encrypt
```

### 2. Ejecutando directamente el archivo con Node.js:
```
node encrypter/encrypt-glb.js
```

Esto hará lo siguiente:
- Encriptará todos los archivos `.glb` y `.usdz` de `encrypter/models/`
- Guardará los archivos `.bin` en `encrypter/encrypted_output/`
- Registrará los resultados en `encrypter/results.txt`

## Validación de clave secreta

El script valida que la clave:
- Exista como variable de entorno `SECRET_KEY`
- Sea una cadena válida en Base64
- Tenga 32 bytes exactos al ser decodificada

Si no se cumple alguna condición, el script detendrá la ejecución con un mensaje de error.

## Estructura de la carpeta `encrypter`

```
encrypter/
├── encrypt-glb.js         # Script principal de encriptación
├── models/                # Carpeta con archivos de entrada .glb y .usdz
├── encrypted_output/      # Carpeta de salida con los archivos encriptados (.bin)
└── results.txt            # Registro de cada archivo procesado
```

## Licencia

MIT