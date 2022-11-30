const express = require("express");
const routers = express.Router();
const {
  textToEmoji,
  questionAnswer,
  grammerCorrection,

  summerizeContent,
  keywordExtracter,
  friendChat,
  studyNotes,
  interviewQuestions,
  chatWithAi,
  turnByTurnDirections,
  essayOutline,
  notesToSummary,
  analogyMaker,
  classification,
  thirdPersonConverter,
  explainCode,
  tweetSentimentClassifier,
  recipeMakerByIngredients,
  microHorrorStoryMaker,
  pythonToNaturalLanguage,
  factualAnswering,
  javascriptHelperChatbot,
  scienceFictionbooksListMaker,
  textDescriptionToColor,
  javascriptToPython,
  javascriptOneLinerFunctionConverter,
  tldrSummarization,
  adFromProductDescription,
  esrbTextRating,
  marvTheSarcasticChatbot,
  calculateTimeComplexity,
  pythonBugfixer,
  createSqlQueries,
  vrFitnessIdeaGenerator,
  mlAiLanguageModelTutor,
  textToCommand,
  extractContactInformation,
  restaurantReviewCreator,
  writePythonDocString,
  airportCodeExtractor,
  spreadsheetCreator,
  translateProgrammingLanguages,
  unitConversion,
  currencyExchange,
} = require("../controller/AiToolsController");

const { currencyConverter } = require("../controller/currencyToolControler");
const {
  languageTranslator,
} = require("../controller/languageTranslatorController");
const {CssValidate, CssMinifi, CssBeautify} = require("../controller/CssTools.js")
const { XmlToJson, JsonToYaml, JsonToBase64, Base64ToJson, JsonToText, JsonToCsv, CsvToJson, TsvToJson, JsonToTsv } = require("../controller/JsonTool");
const { HtmlMinfi } = require("../controller/HtmlTool");

routers.post("/movieEmoji", textToEmoji);
routers.post("/questionAnswer", questionAnswer);
routers.post("/grammerCorrection", grammerCorrection);

routers.post("/summarizeContent", summerizeContent);
routers.post("/keywordsExtract", keywordExtracter);

// test

routers.post("/friendChat", friendChat);
routers.post("/studyNotes", studyNotes);
routers.post("/interviewQuestions", interviewQuestions);
routers.post("/chatWithAi", chatWithAi);
routers.post("/turnByTurnDirections", turnByTurnDirections);
routers.post("/essayOutline", essayOutline);
routers.post("/notesToSummary", notesToSummary);
routers.post("/analogyMaker", analogyMaker);
routers.post("/classification", classification);
routers.post("/thirdPersonConverter", thirdPersonConverter);
routers.post("/explainCode", explainCode);
routers.post("/tweetSentimentClassifie", tweetSentimentClassifier);
routers.post("/recipeMakerByIngredients", recipeMakerByIngredients);
routers.post("/microHorrorStoryMaker", microHorrorStoryMaker);
routers.post("/pythonToNaturalLanguage", pythonToNaturalLanguage);
routers.post("/factualAnswering", factualAnswering);
routers.post("/javascriptHelperChatbot", javascriptHelperChatbot);
routers.post("/scienceFictionbooksListMaker", scienceFictionbooksListMaker);
routers.post("/textDescriptionToColor", textDescriptionToColor);
routers.post("/javascriptToPython", javascriptToPython);
routers.post(
  "/javascriptOneLinerFunctionConverter",
  javascriptOneLinerFunctionConverter
);
routers.post("/tldrSummarization", tldrSummarization);
routers.post("/adFromProductDescription", adFromProductDescription);
routers.post("/esrbTextRating", esrbTextRating);
routers.post("/marvTheSarcasticChatbot", marvTheSarcasticChatbot);
routers.post("/calculateTimeComplexity", calculateTimeComplexity);
routers.post("/pythonBugfixer/", pythonBugfixer);
routers.post("/createSqlQueries", createSqlQueries);
routers.post("/mlAiLanguageModelTutor", mlAiLanguageModelTutor);
// routers.post("/textToCommand", textToCommand);
routers.post("/extractContactInformation", extractContactInformation);
routers.post("/restaurantReviewCreator", restaurantReviewCreator);
routers.post("/writePythonDocString", writePythonDocString);
routers.post("/airportCodeExtractor", airportCodeExtractor);
routers.post("/spreadsheetCreator", spreadsheetCreator);
routers.post("/vrFitnessIdeaGenerator", vrFitnessIdeaGenerator);
routers.post("/translateProgrammingLanguages", translateProgrammingLanguages);
routers.post("/currencyExchange", currencyExchange);

routers.post("/currencyConversion", currencyConverter);
routers.post("/languageTranslation", languageTranslator);

routers.post("/xmltojson", XmlToJson);
routers.post("/jsontoyaml", JsonToYaml);
routers.post("/jsontobase64", JsonToBase64);
routers.post("/base64tojson", Base64ToJson);
routers.post("/jsontotext", JsonToText); 
routers.post("/jsontocsv", JsonToCsv);
routers.post("/csvtojson", CsvToJson);
routers.post("/tsvtojson", TsvToJson);
routers.post("/jsontotsv", JsonToTsv);

routers.post("/htmlminifi", HtmlMinfi);

routers.post("/cssvalidator", CssValidate);
routers.post("/minficss", CssMinifi);
routers.post("/beautycss", CssBeautify);



module.exports = routers;
