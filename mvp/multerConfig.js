const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/'
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Membuat folder jika belum ada
        }
        cb(null, 'uploads/');  // 'uploads/' is the folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // limit file size to 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('courseImg'); // 'courseImg' is the name of the input field in the form

module.exports = upload;