const { translate } = require("free-translate");

exports.languageTranslator = async (req, res) => {
  const { from, to, input } = req.body;
  //   console.log(`${from}\n${to}\n${value}`);
    console.log(from, to, input);
  try {
    const translatedText = await translate(input, {
      from: from,
      to: to,
    });

    console.log("translatedText",translatedText );
    res.status(200).json({ result: translatedText });
    
    // (async () => {
    //   const translatedText = await translate(
    //     { input },
    //     {
    //       from: { from },
    //       to: { to },
    //     }
    //   );

    //   res.status(200).json({ result: translatedText });
    //   console.log(translatedText); // こんにちは世界
    // })();
  } catch (error) {
    console.log("error")
    res.status(500).json({ message: "something went wrong", error: error });
  }
};
