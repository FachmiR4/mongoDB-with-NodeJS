const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

//menghubungkan db local
const url = "mongodb://127.0.0.1:27017";
const dbName = 'belajar_mongo';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err, client) => {
    if (err){
        return console.log('koneksi gagal');
    }
    // pilih database
    const db = client.db(dbName);

    // // menambahkan 1 data ke  collection db
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'januar jayadi',
    //         email: 'Januar@gmail.com'
    //     },
    //     (err, result) => {
    //         if(err){
    //             return console.log('gagal menambahkan data');
    //         }
    //         console.log(result);
    //     }
    // );
    
    // // menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany([
    //     {
    //         nama: 'ramdhan jajang',
    //         email: 'ramdhan@gmail.com'
    //     },
    //     {
    //         nama: 'jangkar danu',
    //         email: 'jangkar@gmail.com',
    //     }],
    //     (err, result) => {
    //         if(err){
    //             return console.log('gagal menambahkan data');
    //         }
            
    //         console.log(result);
    //     }
    // );

    // // menampilkan semua data yang ada di collection 'mahasiswa' 
    // console.log(db.collection('mahasiswa').find({}).toArray((err, result) => console.log(result)));

    // // menampilkan data berdasarkan kriteria yang ada dicollection 'mahasiswa'
    // console.log(db.collection('mahasiswa').find({ nama: 'Fachmi Ramadhan'}).toArray((err, result) => console.log(result)));
    
    // // mengubah data berdasarkan id
    // const updatePromies = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectId('65e9bf398e74404324c35c97'),
    //     }, 
    //     {
    //         $set: {
    //             nama: 'ramadhan1 jajang'
    //         }
    //     }
    //     );

    //     updatePromies.then((result) => {
    //         console.log(result);
    //     }).catch((err)=> {console.log(err)});

    // // mengubah data lebih dari 1, berdasarkan kriteria
    // const updatePromies = db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'ramdhan',
    //     }, 
    //     {
    //         $set: {
    //             nama: 'ramadhan1 jajang'
    //         }
    //     }
    //     );

    //     updatePromies.then((result) => {
    //         console.log(result);
    //     }).catch((err)=> {console.log(err)});

    // // menghapus 1 data 
    // db.collection('mahasiswa').deleteOne(
    //     {  _id: ObjectId('65e9bf398e74404324c35c97')
    // }).then((result) => {console.log(result)})
    // .catch((err) => {console.log(err)});

    // // menghapus lebih dari 1 data
    db.collection('mahasiswa').deleteMany(
        {  nama: 'ramadhan',
    }).then((result) => {console.log(result)})
    .catch((err) => {console.log(err)});

});