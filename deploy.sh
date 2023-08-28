echo "Building project..."

npm run build

echo "Deploying files to server..."
scp -r build/* clavio@137.184.236.197:/var/www/137.184.236.197/

echo "Deploying backend..."
scp -r flask-backend/* clavio@137.184.236.197:/var/www/137.184.236.197/backend