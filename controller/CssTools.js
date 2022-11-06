const cssValidator = require('w3c-css-validator');

exports.CssValidate = async (req, res, next) => {

    const { bodyData } = req.body;
    

    try {
        const result = await cssValidator.validateText(bodyData);
        res.send(result)
       

    } catch (err) {
        next(err)
    }
}