@echo off
set CURRENT_DIR=%cd%
cd /opt/lampp/bin
mysql -u root -p -e "DROP DATABASE IF EXISTS ntuaflix;"
mysql -u root -p ntuaflix < %CURRENT_DIR%\back-end\utils\ntuaflix_create_schema.sql
cd %CURRENT_DIR%
