const { exec } = require('child_process');
const fs = require('fs');
exec('npx tsc --noEmit', { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
  fs.writeFileSync('tsc-errors.txt', stdout + '\n' + stderr, 'utf8');
});
