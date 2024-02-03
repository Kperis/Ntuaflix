@echo off
set CURRENT_DIR=%cd%
cd C:\xampp\mysql\bin
@echo %CURRENT_DIR%    
mysql -u root -p -e "DROP DATABASE IF EXISTS ntuaflix; SOURCE %CURRENT_DIR%\utils\ntuaflix_create_schema.sql;
mysql -u root -p -e "DROP DATABASE IF EXISTS ntuaflix_test; SOURCE %CURRENT_DIR%\utils\ntuaflix_test_create_schema.sql;
