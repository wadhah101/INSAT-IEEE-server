export $(cat .env | sed 's/#.*//g' | xargs)

pg_dump -c -d $DATABASE_URL --no-owner | psql -d $CLOUD_DATABASE_URL -1 



#  --clean --dbname="schedule-dev" --schema='public' --table=public.Filiere 
