const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 部署配置
const config = {
    host: 'your-server-ip',
    username: 'your-username',
    password: 'your-password',
    remotePath: '/var/www/pacman30thanniversary.cc',
    localPath: path.join(__dirname, 'public')
};

// 执行部署
async function deploy() {
    try {
        console.log('Starting deployment...');
        
        // 构建项目
        console.log('Building project...');
        await execPromise('npm run build');
        
        // 压缩文件
        console.log('Compressing files...');
        await execPromise(`cd ${config.localPath} && zip -r ../dist.zip .`);
        
        // 上传文件
        console.log('Uploading files...');
        await execPromise(`scp dist.zip ${config.username}@${config.host}:${config.remotePath}/`);
        
        // 解压文件
        console.log('Extracting files...');
        await execPromise(`ssh ${config.username}@${config.host} "cd ${config.remotePath} && unzip -o dist.zip && rm dist.zip"`);
        
        // 重启服务
        console.log('Restarting server...');
        await execPromise(`ssh ${config.username}@${config.host} "pm2 restart server"`);
        
        console.log('Deployment completed successfully!');
    } catch (error) {
        console.error('Deployment failed:', error);
        process.exit(1);
    }
}

// 执行命令的 Promise 包装
function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}

// 运行部署
deploy(); 