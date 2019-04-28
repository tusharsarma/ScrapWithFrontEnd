const rp = require('request-promise');
const fs = require('fs');
const path = require('path');
const os = require('os');


function scraping(options, filename) {
    const output = [];
    var oneFlightData = [];
    var tableHeader = [];
    var header;
    var table=[];
    var flightInformation;
  
    return rp(options)
      .then( $ => {
          console.log("scraping started");
        
        $('div.x21n .x7b tr th.x7w').each((i, tableRow) => {
          header = $(tableRow).text();
          tableHeader.push(header);
        });
        table.push(tableHeader);
        output.push(tableHeader.join());
  
        $('div.x21n .x7b tr').each((i, flightRow) => {
          oneFlightData = [];
          $(flightRow).find('.x7m').each((l, data) => {
            flightInformation = $(data).text();
            oneFlightData.push(flightInformation);
          });
          if (oneFlightData.length > 0) {
            table.push(oneFlightData);
            
            output.push(oneFlightData.join());
          }
        });
  
        fs.writeFileSync(filename, output.join(os.EOL));
        console.log(filename, "  CREATED");
        return table;
        
      }).catch(err =>
        console.log(err))
  }
  

  module.exports= scraping;