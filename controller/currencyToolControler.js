const converjs = require("converjs/conver.js");

const conver = new converjs();

exports.currencyConverter = async (req, res) => {
  const { from, to, input } = req.body;

  console.log(req.body);

  try {
    const resres = await conver.Currency({
      price: parseInt(input),
      from: from,
      to: to,
    });

    console.log(resres);
    console.log()

    res.status(200).json({ result: resres });
  } catch (error) {
    res.status(500).json({ message: "this is not a valid text", error: error });
  }
};
