import fs from 'fs';
import path from 'path';

const OPEN_NEXT_DIR = path.join(process.cwd(), '.open-next');
const DIST_DIR = path.join(process.cwd(), '.open-next-pages');

if (!fs.existsSync(OPEN_NEXT_DIR)) {
  console.error("❌ Error: .open-next directory not found. Run opennext build first.");
  process.exit(1);
}

if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

const assetsDir = path.join(OPEN_NEXT_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, DIST_DIR, { recursive: true });
}

const workerDir = path.join(DIST_DIR, '_worker.js');
fs.mkdirSync(workerDir, { recursive: true });

const workerFile = path.join(OPEN_NEXT_DIR, 'worker.js');
if (fs.existsSync(workerFile)) {
  fs.copyFileSync(workerFile, path.join(workerDir, 'index.js'));
}

const EXCLUDED_FILES = ['worker.js', 'assets'];
const allFiles = fs.readdirSync(OPEN_NEXT_DIR);

for (const file of allFiles) {
  if (!EXCLUDED_FILES.includes(file)) {
    const src = path.join(OPEN_NEXT_DIR, file);
    const dest = path.join(workerDir, file);
    fs.cpSync(src, dest, { recursive: true });
  }
}
console.log("✅ Prepared output in .open-next-pages/");
