@echo off

REM Get the current directory
for %%A in ("%~dp0") do set "current_dir=%%~fA"

REM Print the current directory
echo Current directory: %current_dir%

REM Construct the file paths
set "schema_file=%current_dir%utils\ntuaflix_create_schema.sql"
set "schema_test_file=%current_dir%utils\ntuaflix_test_create_schema.sql"

REM Change directory to C:\xampp\mysql\bin (assuming XAMPP is installed in the default location)
cd /d "C:\xampp\mysql\bin"

REM Run MySQL and load the files
mysql.exe -u root -p < "%schema_file%"
mysql.exe -u root -p < "%schema_test_file%"