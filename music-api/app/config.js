const path =require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, '../public/uploads'),
    db: {
        name: 'music',
        url: 'mongodb://localhost'
    },
    facebook: {
        appId: '690806231600585',
        secret: '4bd8a7a6e2a8a257fef32af73f3a0fcd'
    }
};