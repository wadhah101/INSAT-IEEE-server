if [ -f prisma/.env ]
then
    export $(cat .env | sed 's/#.*//g' | xargs)
fi

pg_dump -c -d $DATABASE_URL --no-owner | psql -d $CLOUD_DATABASE_URL -1 



#  --clean --dbname="schedule-dev" --schema='public' --table=public.Filiere 
