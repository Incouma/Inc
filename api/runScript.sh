export PATH=${PATH}:/usr/local/mysql/bin/
mysql -h 'localhost' -u 'root' '-pPassword123!!' 'SBO' < './Dump20170204-1.sql'
