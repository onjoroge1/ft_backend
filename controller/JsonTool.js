var parseString = require('xml2js').parseString;
YAML = require('json2yaml');
const base64json = require('base64json');
var convert = require('json-to-plain-text');
const { Parser } = require('json2csv');
const csv = require("csvtojson");
const { tsv2json, json2tsv } = require('tsv-json');



exports.XmlToJson = async (req, res, next) => {

    const { bodyData } = req.body;


    try {
        var xml = bodyData
        parseString(xml, function (err, result) {
            res.status(200).json(result)
        });

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
    console.log(typeof (bodyData));

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
    const json_data = bodyData;
    const result = [];

    for (var i in json_data) {

        result.push([i, json_data[i]]);
    }
    const opts = result;

    try {
        const parser = new Parser(opts);
        const csv = parser.parse(result);
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



