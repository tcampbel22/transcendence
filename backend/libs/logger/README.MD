When using logger the root (of a service) most have folder logs/
Added a logger object in libs/logger that will print logs in ./logs/app.log for each servie
it is published in npm so to use it just npm install @eleekku/logger and import it in the files as usual
logger.info is for info logs and logger.error for error logs. it takes params like console log so basically you can give it anything.
