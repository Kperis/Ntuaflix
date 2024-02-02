CURRENT_DIR=$(pwd)
cd /opt/lampp/bin
sudo ./mysql -u root -p <<EOF
DROP DATABASE IF EXISTS ntuaflix;
SOURCE $CURRENT_DIR/utils/ntuaflix_create_schema.sql;
DROP DATABASE IF EXISTS ntuaflix_test;
SOURCE $CURRENT_DIR/utils/ntuaflix_test_create_schema.sql;
EOF
