const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/belajar_mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// // menambahkan 1 data
// const contact1 = new Contact({
//     nama: 'fachmi ramadhan',
//     noHp: '08129136712',
//     email: 'FACHMI@gmail.com'
// });

// //simpan ke collection 
// contact1.save().then((contact) => console.log(contact));
