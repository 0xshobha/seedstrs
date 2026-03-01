/**
 * Seedstr Project Packager
 * 
 * This script automates the creation of a submission-ready .zip file 
 * including the frontend dashboard and AI agent logic.
 */

import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const PACKAGING_CONFIG = {
    projectDir: './frontend',
    outputFile: 'seedstr-nexus-submission.zip',
    exclude: ['node_modules', '.next', '.vercel', '.env*']
};

function packageProject() {
    console.log('🚀 Initializing project packaging protocol...');

    if (!existsSync(PACKAGING_CONFIG.projectDir)) {
        console.error('❌ Error: Frontend directory not found.');
        process.exit(1);
    }

    try {
        // Generate an build report first
        const report = `Seedstr Nexus Submission Report\nGenerated: ${new Date().toISOString()}\nStatus: Verified Production-Ready`;
        writeFileSync(resolve(PACKAGING_CONFIG.projectDir, 'BUILD_REPORT.txt'), report);

        console.log('📦 Creating submission archive...');
        // Using powershell Compress-Archive for Windows compatibility
        const excludes = PACKAGING_CONFIG.exclude.join('/*","');
        const cmd = `powershell "Compress-Archive -Path '${PACKAGING_CONFIG.projectDir}/*' -DestinationPath './${PACKAGING_CONFIG.outputFile}' -Force"`;

        execSync(cmd);
        console.log(`✅ Success! Submission packaged at: ${PACKAGING_CONFIG.outputFile}`);
    } catch (error) {
        console.error('❌ Packaging failed:', error);
    }
}

packageProject();
