
#exit on error
set -o errexit

bundle install
npm run build
