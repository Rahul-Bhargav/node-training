# pg_dump -U rahulsurabhi Excercise -f excercise.sql



dropdb -U rahulsurabhi testdb
createdb -U rahulsurabhi testdb
psql -U rahulsurabhi -d testdb -f ./public/test/excercise.sql
