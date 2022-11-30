var parseString = require('xml2js').parseString;
const {convertXML, createAST} = require("simple-xml-to-json")
YAML = require('json2yaml');
const base64json = require('base64json');
var convert = require('json-to-plain-text');
const { Parser } = require('json2csv');
const csv = require("csvtojson");
const { tsv2json, json2tsv } = require('tsv-json');



exports.XmlToJson = async (req, res, next) => {

    const { bodyData } = req.body;


    try {
        var xml = `<xml>${bodyData}</xml>`;
        parseString(xml, function (err, result) {
            res.status(200).json(result)
        });
        // const myJson = convertXML(req.body.bodyData)
        // console.log(req.body.bodyData);
        // res.status(200).json(myJson)
    } catch (err) {
        next(err)
    }
}
exports.JsonToYaml = async (req, res, next) => {

    const { bodyData } = req.body;




    try {
        const ymlText = YAML.stringify(bodyData);
        res.send(ymlText)
        // console.log(ymlText);


    } catch (err) {
        next(err)
    }
}
exports.JsonToBase64 = async (req, res, next) => {

    const { bodyData } = req.body;

    try {
        const encoded = base64json.stringify(bodyData);
        res.send(encoded)
        console.log(encoded);


    } catch (err) {
        next(err)
    }
}
exports.Base64ToJson = async (req, res, next) => {

    const { bodyData } = req.body;

    try {
        const decoded = base64json.parse(bodyData);;
        res.send(decoded)
    } catch (err) {
        next(err)
    }
}
exports.Base64ToJson = async (req, res, next) => {

    const { bodyData } = req.body;

    try {
        const decoded = base64json.parse(bodyData);;
        res.send(decoded)
    } catch (err) {
        next(err)
    }
}
exports.JsonToText = async (req, res, next) => {

    const { bodyData } = req.body;
    

    try {


        const response = convert.toPlainText(req.body.bodyData);
        console.log(response);
        res.send(response)
    } catch (err) {
        next(err)
    }
}
exports.JsonToCsv = async (req, res, next) => {

    const { bodyData } = req.body;

    console.log(bodyData);

    const result = [];

    for (var i in bodyData) {
        console.log(i  , bodyData[i] );

        // result.push([i, json_data[i]]);
    }
    const opts = result;

    const myCars = [
        {
          "car": "Audi",
          "price": 40000,
          "color": "blue"
        }, {
          "car": "BMW",
          "price": 35000,
          "color": "black"
        }, {
          "car": "Porsche",
          "price": 60000,
          "color": "green"
        }
      ];

    try {
        const parser = new Parser();
        const csv = parser.parse(bodyData);
        res.send(csv);
    }
    catch (err) {
        console.error(err);
    }


}
exports.CsvToJson = async (req, res, next) => {

    const { bodyData } = req.body;
    try {

        csv().fromString(bodyData)
            .then(function (jsonArrayObj) {
                res.send(jsonArrayObj)
            })
    }
    catch (err) {
        console.error(err);
    }


}
exports.TsvToJson = async (req, res, next) => {

    const { bodyData } = req.body;
    console.log(bodyData); 
    try {

        res.send(tsv2json(bodyData));
    }
    catch (err) {
        console.error(err);
    }


}
exports.JsonToTsv = async (req, res, next) => {

    const { bodyData } = req.body;
    
    const arr = Object.entries(req.body)
   
    try {

        res.send(json2tsv(arr));
    }
    catch (err) {
        console.error(err);
    }


}



