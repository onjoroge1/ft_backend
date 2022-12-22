const { PDFNet } = require('@pdftron/pdfnet-node');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const pdfToExcelGenerator = require('pdf-to-excel');
const pdf2html = require('pdf2html');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = process.env.PORT || 4000;

const allRoutes = require('./routes/route');

dotenv.config({ path: './config.env' });


const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', allRoutes);

app.get('/', (req, res) => res.send('Hello World'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const pdfToWordFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);

  if (ext !== '.pdf') {
    return callback('not supported');
  }
  callback(null, true);
};

const pdfToDocx = multer({
  storage: storage,
  fileFilter: pdfToWordFilter,
});

const officeToPDFFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);
  console.log('ext', ext);
  if (ext !== '.docx' && ext !== '.pptx' && ext !== '.jpg' && ext !== '.png') {
    return callback('not supported');
  }
  callback(null, true);
};

const officeToPDF = multer({
  storage: storage,
  fileFilter: officeToPDFFilter,
});

const pdfToExcelFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);

  if (ext !== '.pdf') {
    return callback('not supported');
  }
  callback(null, true);
};

const pdfToExcel = multer({
  storage: storage,
  fileFilter: pdfToExcelFilter,
});

const pdfToHtmlFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);

  if (ext !== '.pdf') {
    return callback('not supported');
  }
  callback(null, true);
};

const pdfToHtml = multer({
  storage: storage,
  fileFilter: pdfToHtmlFilter,
});

// --- PDF TO OFFICE (WORD) START --- //
app.post('/convertFromPDF', pdfToDocx.single('file'), (req, res) => {
  let filePath = `./${req.file.path}`;

  const inputPath = path.resolve(__dirname, `${filePath}`);
  const outputPath = path.resolve(__dirname, `${filePath}.docx`);

  const convert = async () => {
    await PDFNet.addResourceSearchPath('./');

    if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      console.log('Not available structure module.');
    }
    await PDFNet.Convert.fileToWord(inputPath, outputPath);
  };

  PDFNet.runWithCleanup(
    convert,
    'demo:1661285733817:7a0b0ed80300000000ac11f86f4ce6d72581ce80dcdfd70123c396b191'
  )
    .then(() => {
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(err);
        } else {
          res.statusCode = 200;
          res.end();
          // var file = outputPath;
          // var filename = path.basename(file);
          // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
          // res.download(file);
        }
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end('err');
    });
});

app.get('/getConvertedWord', (req, res) => {
  const { filename } = req.query;

  var file = path.resolve(__dirname, `./files/uploads/${filename}.docx`);
  var fileBaseName = path.basename(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + fileBaseName);
  res.download(file);
});
// --- PDF TO OFFICE (WORD) FINISH --- //

// --- OFFICE TO PDF START --- //
app.post('/convertFromOFFICE', officeToPDF.single('file'), (req, res) => {
  let filePath = `./${req.file.path}`;

  const inputPath = path.resolve(__dirname, `${filePath}`);
  const outputPath = path.resolve(__dirname, `${filePath}.pdf`);

  const convertToPDF = async () => {
    const pdfdoc = await PDFNet.PDFDoc.create();
    await pdfdoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfdoc, inputPath);
    pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  };

  PDFNet.runWithCleanup(
    convertToPDF,
    'demo:1661285733817:7a0b0ed80300000000ac11f86f4ce6d72581ce80dcdfd70123c396b191'
  )
    .then(() => {
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(err);
        } else {
          res.statusCode = 200;
          res.end();
        }
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end('err');
    });
});

app.get('/getConvertedPDF', (req, res) => {
  const { filename } = req.query;

  var file = path.resolve(__dirname, `./files/uploads/${filename}.pdf`);
  var fileBaseName = path.basename(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + fileBaseName);
  res.download(file);
});
// --- OFFICE TO PDF FINISH --- //

// --- PDF TO EXCEL START --- //
app.post(
  '/convertFromPDFtoEXCEL',
  pdfToExcel.single('file'),
  async (req, res) => {
    let filePath = `./${req.file.path}`;

    const inputPath = path.resolve(__dirname, `${filePath}`);
    const outputPath = path.resolve(__dirname, `${filePath}.xlsx`);

    try {
      await pdfToExcelGenerator.genXlsx(inputPath, outputPath);
      res.statusCode = 200;
      res.end();
    } catch (error) {
      res.statusCode = 400;
      res.end();
    }
  }
);

app.get('/getConvertedEXCEL', (req, res) => {
  const { filename } = req.query;

  var file = path.resolve(__dirname, `./files/uploads/${filename}.xlsx`);
  var fileBaseName = path.basename(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + fileBaseName);
  res.download(file);
});
// --- PDF TO EXCEL FINISH --- //

// --- PDF TO HTML START --- //
app.post(
  '/convertFromPDFtoHTML',
  pdfToHtml.single('file'),
  async (req, res) => {
    let filePath = `./${req.file.path}`;

    const inputPath = path.resolve(__dirname, `${filePath}`);

    await pdf2html.html(inputPath, (err, html) => {
      if (err) {
        console.error('Conversion error: ' + err);
      } else {
        fs.appendFile(inputPath + '.html', html, function (err) {
          if (err) throw err;
          res.statusCode = 200;
          res.end();
        });
      }
    });
  }
);

app.get('/getConvertedHTML', (req, res) => {
  const { filename } = req.query;

  var file = path.resolve(__dirname, `./files/uploads/${filename}.html`);
  var fileBaseName = path.basename(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + fileBaseName);
  res.download(file);
});
// --- PDF TO HTML FINISH --- //

const PATH = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('App is running...');
});
