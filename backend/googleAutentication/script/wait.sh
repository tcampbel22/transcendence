# wait-for-nodejs.sh
# Verifica que el servicio de base de datos esté disponible
until nc -z -v -w30 nodejs 4433; do
    echo "Waiting for nodejs..."
    sleep 5
done
echo "nodejs ready, starting GoogleSignIn..."
exec "$@"