
// const speakerService = require('../services/SpeakerServiceInstance').speakerService;
// const feedbackService = require('../services/FeedbackServiceInstance').feedbackService;
// service instances go here
exports.Favicon = (req, res, next) =>{
    return res.sendStatus(204);
}
exports.Index = (req, res, next) =>{
    return res.render('index' , {});
}