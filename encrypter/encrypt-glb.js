// encrypter/encrypt-glb.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawKey = process.env.SECRET_KEY;

if (!rawKey) {
  console.error('❌ ERROR: SECRET_KEY no está definido en el archivo .env');
  process.exit(1);
}

let SECRET_KEY;
try {
  SECRET_KEY = Buffer.from(rawKey, 'base64');
} catch (error) {
  console.error('❌ ERROR: La clave secreta no es una cadena Base64 válida');
  process.exit(1);
}

if (SECRET_KEY.length !== 32) {
  console.error(`❌ ERROR: La clave secreta debe tener 32 bytes después de decodificar (actual: ${SECRET_KEY.length} bytes)`);
  process.exit(1);
}

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

const modelsDir = path.join(__dirname, 'models');
const outputDir = path.join(__dirname, 'encrypted_output');
const logPath = path.join(__dirname, 'results.txt');

fs.mkdirSync(outputDir, { recursive: true });

// Filtra los archivos que terminan en .glb o .usdz
const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.glb') || f.endsWith('.usdz'));
if (files.length === 0) {
  console.error('❌ No se encontraron archivos .glb o .usdz en la carpeta /models');
  process.exit(1);
}

files.forEach(file => {
  const inputPath = path.join(modelsDir, file);
  const buffer = fs.readFileSync(inputPath);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

  // Genera un nombre aleatorio para el archivo encriptado
  const randomName = crypto.randomBytes(12).toString('base64url') + '.bin';
  const outputPath = path.join(outputDir, randomName);
  fs.writeFileSync(outputPath, encrypted);

  const logEntry = [
    `${file.split('.').pop().toUpperCase()} Model: ${file}`,  // Muestra la extensión del archivo (GLB o USDZ)
    `Encrypted Model: ${randomName}`,
    `Output: ${outputPath}`,
    `Date: ${new Date().toISOString()}`,
    ''
  ].join('\n');
  
  fs.appendFileSync(logPath, logEntry + '\n');

  console.log(`🔐 ${file} → ${randomName}`);
});