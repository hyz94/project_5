const mongo = require('mongodb');
const client = mongo.MongoClient;
const ObjectID = mongo.ObjectId;
const dbName = 'project5';
var client1 ;
client.connect('mongodb://10.3.136.9:27017', (_error, _client) => {
    if(_error){
        console.log(_error);
        return false;
    } else {
        client1 = _client;
    }
});


module.exports = {
    select: (_collection, _condition) => {
        console.log('select' , _collection);
        console.log(_condition)
        return new Promise((resolve, reject) => {
            client1.db(dbName).collection(_collection).find(_condition || {}).toArray((error, result) => {
                resolve(result);
            })
        })
    },
    insert: (_collection, _data) => {
        console.log(_collection);
        console.log(_data)
        return new Promise((resolve, reject) => {
            client1.db(dbName).collection(_collection).insert(_data).then((result, error) => {
                resolve(result);
            })
        })
    },
    delete: (_collection, _condition) => {
        return new Promise((resolve, reject) => {
            client1.db(dbName).collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    }
}