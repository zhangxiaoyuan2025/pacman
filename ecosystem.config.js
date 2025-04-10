module.exports = {
  apps: [{
    name: 'slope-game',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DOMAIN: 'www.pacman30thanniversary.cc'
    }
  }]
}; 