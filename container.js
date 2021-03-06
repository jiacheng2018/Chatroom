const dependable=require('dependable');
const path=require('path');

const container=dependable.container();
const simpleDep=[
    ['_','lodash'],
    ['passport','passport'],
    ['validator','express-validator'],
    ['formidable','formidable'],
    ['Club','./models/clubs'],
    ['AWSUpload','./helpers/AWSupload']
]
simpleDep.forEach(function(val){
    container.register(val[0],function(){
        return require(val[1]);
    })
});
container.load(path.join(__dirname,'controllers'));
container.load(path.join(__dirname,'helpers'))
container.register('container',function(){
    return container;
})
module.exports=container;