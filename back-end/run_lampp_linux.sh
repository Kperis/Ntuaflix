#!/bin/bash
sudo /etc/init.d/apache2 stop
sudo service mysql stop
sudo /opt/lampp/lampp start
cd /opt/lampp
sudo ./manager-linux-x64.run
