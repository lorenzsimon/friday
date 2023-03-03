FROM postgres:13

COPY --chmod=0755 init.sh /docker-entrypoint-initdb.d
COPY --chmod=0755 init.sql /docker-entrypoint-initdb.d
