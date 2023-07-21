import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { outputJsonSync } from 'fs-extra/esm';
const __dirname = dirname(fileURLToPath(import.meta.url));

const licenseReportFile = [`${__dirname}/src/assets/licenses.json`];

const licenseReportExec = {
  // exec: `${__dirname}/node_modules/.bin/license-report`,
  exec: `license-report`,
  args: [`--config=${__dirname}/license-report.config.json`],
};

/*
{
    name: z.string(),
    licenseType: z.string(),
    author: z.string(),
    link: z.string().url().optional(),
    installedFrom: z.string().url().optional(),
}[]
 */
const externalLicenses = [];

const emitReport = (file, toExec, externalLicenses) => {
  const exec = spawn(toExec.exec, toExec.args);

  let licensesString = '';
  exec.stdout.on('data', (data) => {
    licensesString += data.toString();
  });

  exec.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    const licenses = JSON.parse(licensesString);
    const report = licenses.concat(externalLicenses);
    outputJsonSync(file, report, { spaces: 2 });
  });
};

for (const file of licenseReportFile) {
  emitReport(file, licenseReportExec, externalLicenses);
}
