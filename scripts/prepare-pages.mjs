import fs from 'fs';
import path from 'path';

const OPEN_NEXT_DIR = path.join(process.cwd(), '.open-next');
const DIST_DIR = path.join(process.cwd(), '.open-next-pages');

if (!fs.existsSync(OPEN_NEXT_DIR)) {
  console.error("❌ Error: .open-next directory not found. Run opennext build first.");
  process.exit(1);
}

// 1. Recreate clean .open-next-pages directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// 2. Copy static assets to root of dist
const assetsDir = path.join(OPEN_NEXT_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, DIST_DIR, { recursive: true });
  console.log("✅ Copied static assets to", DIST_DIR);
}

// 3. Create _worker.js directory
const workerDir = path.join(DIST_DIR, '_worker.js');
fs.mkdirSync(workerDir, { recursive: true });

// 4. Move worker.js to _worker.js/index.js
const workerFile = path.join(OPEN_NEXT_DIR, 'worker.js');
if (fs.existsSync(workerFile)) {
  fs.copyFileSync(workerFile, path.join(workerDir, 'index.js'));
  console.log("✅ Moved worker.js to _worker.js/index.js");
} else {
  console.error("❌ Error: worker.js not found in .open-next");
  process.exit(1);
}

// 5. Copy all other necessary folders into _worker.js
const EXCLUDED_FILES = ['worker.js', 'assets'];
const allFiles = fs.readdirSync(OPEN_NEXT_DIR);

for (const file of allFiles) {
  if (!EXCLUDED_FILES.includes(file)) {
    const src = path.join(OPEN_NEXT_DIR, file);
    const dest = path.join(workerDir, file);
    fs.cpSync(src, dest, { recursive: true });
  }
}

console.log("✅ Cloudflare Pages output prepared successfully in .open-next-pages/");
