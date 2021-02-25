var express = require('express');
var router = express.Router();
const request = require('sync-request');

var cloudinary = require('cloudinary').v2; cloudinary.config({
  cloud_name: 'dnggs8knf',
  api_key: '177253424992219',
  api_secret: '38ZhO0tOFwdJwNsAH9lZjjHfDvM'
  });


  const subscriptionKey = 'f0e9fc99c4b148a6baedb1046302cfa7';
  const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

  
   
   
   


var uniqid = require('uniqid');
var fs = require('fs')

router.post('/upload', async function(req, res, next) { 
var pictureName = './tmp/'+uniqid()+'.jpg';
var resultCopy = await req.files.avatar.mv(pictureName);
console.log( 'RESULTCOPY =======><>>>', resultCopy)

if(!resultCopy){ 
  var resultCloudinary = await cloudinary.uploader.upload(pictureName);
  console.log( 'RESULT CLOUDINARY ===============>>>>>', resultCloudinary)

  const params = {
    returnFaceId: 'true',
    returnFaceLandmarks: 'false',
    returnFaceAttributes: 'age,gender,smile,facialHair,glasses,emotion,hair',
   };
   
   const options = {
    qs: params,
    body: '{"url": ' + '"' + resultCloudinary.url + '" }',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
   };

var resultVisionRaw = await request('POST', uriBase, options);
var resultVision = await resultVisionRaw.body;
  var resultVisions = await JSON.parse(resultVision);
   console.log( 'RESULT VISION ===========>>>>>', resultVisions[0])

   var gender;
   var age;
   var glasses;
   var beard;
   var happy;
   var hairColor;

if(resultVisions[0]){
gender = resultVisions[0].faceAttributes.gender == "male" ?
'homme' : 'femme';
age = resultVisions[0].faceAttributes.age+" ans";
glasses = resultVisions[0].faceAttributes.glasses ==
"NoGlasses" ? false : true;
beard = resultVisions[0].faceAttributes.facialHair.beard >
0.5 ? true : false;
happy = resultVisions[0].faceAttributes.emotion.happiness >
0.7? true : false;
}
if(resultVisions[0].faceAttributes.hair.hairColor[0].color == "brown") {
  hairColor = "cheveux châtain"; }
  else if(resultVisions[0].faceAttributes.hair.hairColor[0].color == "black") {
  hairColor = "cheveux brun"; }
  else if(resultVisions[0].faceAttributes.hair.hairColor[0].color == "blond") {
  hairColor = "cheveux blond"; }
  else if(resultVisions[0].faceAttributes.hair.hairColor[0].color == "red") {
  hairColor = "cheveux roux"; }
  else if(resultVisions[0].faceAttributes.hair.hairColor[0].color == "gray") {
  hairColor = "cheveux gris"; }

   res.json({result: true, url: resultCloudinary.url, gender, age, glasses, beard, happy, hairColor });
} else {
res.json({result: false, error: resultCopy});
} 
fs.unlinkSync(pictureName)
});

module.exports = router;
