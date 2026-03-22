const { execSync } = require('child_process');
try {
  execSync('npx vite build', { encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
  console.log('--- STDOUT ---');
  console.log(e.stdout);
  console.log('--- STDERR ---');
  console.log(e.stderr);
}
