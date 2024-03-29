const express = require('express');
const expressLayout = require('express-ejs-layouts');

const {body, validationResult, check, Result} = require('express-validator');
const methodOverride = require('method-override');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


require('./utils/db');
const Contact = require('./model/contact');


const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// set up view engine EJS
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash())

// halaman home
app.get('/', (req, res) => {
    const mahasiswa = [
      {
        nama: 'fachmi ramadhan',
        email: 'fachmi.F@gmail.com'
      },
      {
        nama: 'Dodi supradi',
        email: 'dodi.D@gmail.com'
      },
      {
        nama: 'jayadi parmanan',
        email: 'jayadi.J@gmail.com'
      }
    ]
    res.render('index', {
    nama: 'fachmi ramadhan', 
    title: 'ini halaman home',
    mahasiswa,
    layout: 'layout/main-layout'});
});

app.get('/about', (req, res) => {
    res.render('about', {
      layout: 'layout/main-layout',
      title: 'Halaman About'
    })
})
app.get('/contact', async function (req, res) {
    const contacts = await Contact.find()
    res.render('contact', {
      layout: 'layout/main-layout',
      title: 'Halaman Contact',
      contacts,
      msg: req.flash('msg')
    })
});

// halaman tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layout/main-layout',
  })
});

//proses tambah data contact
app.post('/contact', [
  body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({nama: value});
      if(duplikat){
        throw new Error('Nama contact sudah Digunakan');
      }
      return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  // check('noHp', 'No HP tidak valid!').isMobilePhone('id-ID'),
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layout/main-layout',
      errors: errors.array()
    })
  }else{
     Contact.insertMany(req.body, (err, result) => {
        //  kirimkan flash message
        req.flash('msg', 'Data contact berhasil ditambahkan!')
        //mengarahkan file ke file ke yang lain
        res.redirect('/contact');
     });
  }

});
// proses membuat ubah data 
app.put('/contact', [
  body('nama').custom( async (value, {req}) => {
      const duplikat = await Contact.findOne({nama: value});
      if(value !== req.body.oldNama && duplikat){
        throw new Error('Nama contact sudah Digunakan');
      }
      return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('noHP', 'No HP tidak valid!').isMobilePhone('id-ID'),
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('edit-contact', {
      title: 'Form Edit Data Contact',
      layout: 'layout/main-layout',
      errors: errors.array(),
      contact: req.body
    })
  }else{
    Contact.updateOne(
      {_id: req.body._id},
      {
        $set: {
          nama: req.body.nama,
          email: req.body.email,
          noHp: req.body.noHp,
        }
      }
     ).then(result => {
        // //  kirimkan flash message
        req.flash('msg', 'Data contact berhasil ditambahkan!')
        // //mengarahkan file ke file ke yang lain
        res.redirect('/contact');
      
     })
  }
})
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama}).then(result => {
    req.flash('msg', 'Data contact berhasil dihapus!')
    res.redirect('/contact');
    });
});

app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});
  res.render('edit-contact', {
    title: 'Form Data Data Contact',
    layout: 'layout/main-layout',
    contact
  })
})

// halaman detail contact
app.get('/contact/:nama', async function (req, res) {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({nama: req.params.nama});
    res.render('detail', {
      title: 'Halaman Detail Contact',
      layout: 'layout/main-layout',
      contact
    })
})

app.listen(port, () => {
    console.log(`Mongo contant app | listening at http://localhost:${port}`);
});