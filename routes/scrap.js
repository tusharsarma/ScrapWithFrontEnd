const path = require('path');
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');

const scraping= require('./scrapFunc');


var departure = {
    url: `http://www.bengaluruairport.com/bial/faces/pages/flightInformation/departures.jspx`,
    transform: body => cheerio.load(body)
  };
  
  var arrival = {
    url: `http://www.bengaluruairport.com/flightInformation/arrivals.jspx`,
    transform: body => cheerio.load(body)
  };

const fileArrival = path.join(path.dirname(process.mainModule.filename), 'arrival.csv');
  
const fileDeparture = path.join(path.dirname(process.mainModule.filename), 'departure.csv');

//   ROUTES

router.get('/',(req,res,next)=>
{
   res.render('index');
});


router.get('/arrival',function (req,res,next)
{
scraping(arrival, fileArrival).then(data=>{
  res.render('data',{
    data,
    file:'arrival.csv',
  })
});
});

router.get('/departure',function (req,res,next)
{
scraping(departure, fileDeparture).then(data=>{
  res.render('data',{
    data,
    file:'departure.csv'
  })
});
});


module.exports = router;