module.exports = {
    apps : [{
        script: 'app.js',
        watch: '.'
    }],

    deploy : {
        production : {
            user : 'ar-amenagement-vm',
            host : '34.77.130.134',
            ref  : 'origin/master',
            repo : 'git@github.com:PSP-Amenagement-AR/Backend-Node.git',
            path : 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
