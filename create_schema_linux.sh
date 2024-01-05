CURRENT_DIR=$(pwd)
cd /opt/lampp/bin
sudo ./mysql -u root -p <<EOF
DROP DATABASE IF EXISTS ntuaflix;
SOURCE $CURRENT_DIR/back-end/utils/ntuaflix_create_schema.sql;
EOF
