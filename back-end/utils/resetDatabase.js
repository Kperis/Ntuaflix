
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

function resetDatabase() {
    const currentDirectory = process.cwd();
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    // Check if ENV = test
    const DB_NAME = process.env.DB_TEST;

    if (os.platform() === 'linux') {
        const tempPath = currentDirectory
        const backupFilePath = path.join(tempPath, 'ntuaflix_test_create_schema.sql');
        console.log(currentDirectory);
        console.log(tempPath);
        console.log(backupFilePath);

        try {
            execSync(`mysql -u ${DB_USER} ${DB_NAME} < ${backupFilePath}`, { cwd: '/opt/lampp/bin/' });
            console.log('Database restored successfully.');
        } catch (error) {
            console.error('Error restoring database:', error.message);
        }
    } else if (os.platform() === 'win32') {
        const sqlPath = currentDirectory
        const backupFilePath = path.join(sqlPath, 'ntuaflix_test_create_schema.sql');

        try {
            execSync(`mysql -u ${DB_USER} -p${DB_PASS} ${DB_NAME} < "${backupFilePath}"`, { cwd: 'C:\\xampp\\mysql\\bin' });
            console.log('Database restored successfully.');
        } catch (error) {
            console.error('Error restoring database:', error.message);
        }
    } else {
        console.error('Unsupported operating system.');
    }
}


module.exports = {resetDatabase};