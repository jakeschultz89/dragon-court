module.exports = {
  apps : [{
    name: "Dragon Court",
    script: 'nodemon app.js',
    watch: true,
    instances: "max",
    autorestart: true,
    error_file: 'error.log'
  }]
};
