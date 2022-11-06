const { minify } = require('html-minifier-terser');

exports.HtmlMinfi = async (req, res, next) => {




    try {
        const result = await minify(req.body.bodyData, {
            "removeComments": true,
            "removeCommentsFromCDATA": true,
            "removeCDATASectionsFromCDATA": true,
            "collapseWhitespace": true,
            "collapseBooleanAttributes": true,
            "removeAttributeQuotes": true,
            "removeRedundantAttributes": true,
            "useShortDoctype": true,
            "removeEmptyAttributes": true,
            "removeEmptyElements": false,
            "removeOptionalTags": true,
            "removeScriptTypeAttributes": true,
            "removeStyleLinkTypeAttributes": true,
            "minifyJS": true,
            "minifyCSS": true
        });
        res.status(200).json(result)
        console.log(result);

    } catch (err) {
        next(err)
    }
}