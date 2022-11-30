const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // apiKey: "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",
  // apiKey: "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",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// here is movie emoji api
exports.textToEmoji = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    console.log(inputText);
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Convert movie titles into emoji.: 🚗🤖 \n${inputText}:`,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "this is not a valid text", error: error });
  }
};

// here is grammer correction api == complete

exports.grammerCorrection = async (req, res, next) => {
  const { inputText } = req.body;
console.log(inputText)
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Correct this to standard English:${inputText}`,
      temperature: 0,
      max_tokens: 4000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "this is not a valid text", error: error });
  }
};

// here is question answer api
exports.questionAnswer = async (req, res, next) => {
  const { inputText } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\":\n\nQ: ${inputText}?\nA:`,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "this is not a valid text", error: error });
  }
};

// here is language convertion api

// here is text summerize content api
exports.summerizeContent = async (req, res, next) => {
  const { inputText } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Summarize this for a second-grade student:\n\n${inputText}.`,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "this is not a valid text", error: error });
  }
};

// here is keyword extracter api
exports.keywordExtracter = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Extract keywords from this text:\n\n${inputText}.`,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "this is not a valid text", error: error });
  }
};

exports.friendChat = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `You:${inputText}?\nFriend:`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "this is not avalid text", error: error });
  }
};

exports.studyNotes = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `create study notes of: \n\n${inputText} ?`,
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.interviewQuestions = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `create a list of interview question on :\n\n${inputText}`,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.chatWithAi = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${inputText}?\nAI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.turnByTurnDirections = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create a numbered list of turn-by-turn directions from this text: \n\n${inputText}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.essayOutline = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create an outline for an essay about ${inputText}:`,
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.notesToSummary = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Convert my short hand into a first-hand account of the meeting:${inputText}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.analogyMaker = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create an analogy for this phrase:\n\n ${inputText}:`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.classification = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `The following is a list of companies and the categories they fall into:\n\n ${inputText}\nCategory:`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.thirdPersonConverter = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Convert this from first-person to third person (gender male):\n\n${inputText}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.explainCode = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${inputText}\n"""\nHere\'s what the above Code is doing:\n1.`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['"""'],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.tweetSentimentClassifier = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Decide whether a Tweet\'s sentiment is positive, neutral, or negative.\n\nTweet: "${inputText}"\nSentiment:`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.recipeMakerByIngredients = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Write a recipe based on these ingredients and instructions:\n\n${inputText}\n\nInstructions:`,
      temperature: 0.3,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.microHorrorStoryMaker = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Topic: ${inputText}\nTwo-Sentence Horror Story:`,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.pythonToNaturalLanguage = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `# Python 3 \n${inputText}\n\n#`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.factualAnswering = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Q: ${inputText}?\nA:`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.javascriptHelperChatbot = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `You:${inputText}?\nJavaScript chatbot: `,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.scienceFictionbooksListMaker = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `List ${inputText} science fiction books:`,
      temperature: 0.5,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.52,
      presence_penalty: 0.5,
      stop: ["[21]."],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.textDescriptionToColor = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `The CSS code for a color like a ${inputText}:\n\nbackground-color: #`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: [";"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.javascriptToPython = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `#JavaScript to Python:\nJavaScript:${inputText}\npython`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.javascriptOneLinerFunctionConverter = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `Use list comprehension to convert this into one line of JavaScript:\n\n ${inputText} \n\nJavaScript one line version:`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: [";"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.tldrSummarization = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${inputText}\n\nTl;dr`,
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.adFromProductDescription = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Write a creative ad for the following product:\n\nProduct:${inputText}.`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.esrbTextRating = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Provide an ESRB rating for the following text:\n\n "${inputText}" \n\nESRB rating:`,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.marvTheSarcasticChatbot = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: ${inputText}\nMarv:`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.calculateTimeComplexity = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: ` ${inputText} \nThe time complexity of this function is`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.pythonBugfixer = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `##### Fix bugs in the below function\n \n### Buggy Python\n ${inputText} \n    \n### Fixed Python`,
      temperature: 0,
      max_tokens: 182,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.createSqlQueries = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create a SQL request to ${inputText}:`,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};
exports.mlAiLanguageModelTutor = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `You: ${inputText} \nML Tutor: `,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

// exports.textToCommand = async (req, res, next) => {
//   try {
//     const { inputText } = req.body;
//     const completion = await openai.createCompletion({
//       model: "text-davinci-002",
//       prompt: `Convert this text to a programmatic command:\n\nExample: Ask Constance ${inputText}\nOutput: \n\nContact the ski store and figure out if I can get my skis fixed before I leave on Thursday`,
//       temperature: 0,
//       max_tokens: 100,
//       top_p: 1.0,
//       frequency_penalty: 0.2,
//       presence_penalty: 0.0,
//       stop: ["\n"],
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "this is not a valid topic", error: error });
//   }
// };

exports.extractContactInformation = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Extract the name and mailing address from this email:\n\n ${inputText}  `,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.restaurantReviewCreator = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Write a restaurant review based on these notes:\n\n ${inputText} \n\nReview:`,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.writePythonDocString = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `# Python 3.7\n \n ${inputText} \n    \n# An elaborate, high quality docstring for the above function:\n\"\"\"`,
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["#", '"""'],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.airportCodeExtractor = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Extract the airport codes from this text:\n\nText: ${inputText} \n Airport codes:`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.spreadsheetCreator = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    console.log(inputText);
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${inputText} \n`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.vrFitnessIdeaGenerator = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Brainstorm some ${inputText} ideas combining VR and fitness:`,
      temperature: 0.6,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.translateProgrammingLanguages = async (req, res, next) => {
  try {
    const { inputText } = req.body;
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: inputText,
      temperature: 0,
      max_tokens: 54,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "this is not a valid topic", error: error });
  }
};

exports.currencyExchange = async (req, res) => {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "5zbAG47jVdSFl5uQqSq6UCNiypRZWFkp");
  let requestOptions = {
    methood: "GET",
    redirect: "follow",
    headers: Headers,
  };
  try {
    const req = await axios.get(
      "https://api.apilayer.com/exchangerates_data/convert?to=pkr&from=usd&amount=200",
      requestOptions
    );
    console.log(req);
  } catch (error) {
    res.status(500).json({ message: "sorry", error: error });
  }
};
