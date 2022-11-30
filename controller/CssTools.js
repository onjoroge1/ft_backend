const cssValidator = require('w3c-css-validator');
var cssValidate = require('css-validator');
var assert = require('assert');
var miniCSS = require("mini-css");
var cssbeautify = require('cssbeautify')

exports.CssValidate = async (req, res, next) => {


    const { bodyData } = req.body;


    try {
        const result = await cssValidator.validateText(bodyData);
        res.send(result)


    } catch (err) {
        next(err)
    }
}
exports.CssMinifi = async (req, res, next) => {


    const { bodyData } = req.body;


    try {
        var minimized = miniCSS(bodyData);
        res.status(200).json(minimized);

        // const result = await cssValidator.validateText(bodyData);
        // res.send(result)


    } catch (err) {
        next(err)
    }
}
exports.CssBeautify = async (req, res, next) => {


    const { bodyData } = req.body;


    try {


        var beautified = cssbeautify(bodyData, {
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
        });
        res.status(200).json(beautified);

        // const result = await cssValidator.validateText(bodyData);
        // res.send(result)


    } catch (err) {
        next(err)
    }
}