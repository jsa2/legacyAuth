const axios = require('axios')
var {
    parseString
} = require('xml2js')



async function connectEWS (username, password) {

    var base64 = Buffer.from(`${username}:${password}`).toString('base64')

   // console.log(base64)

    var useragent = `EXO HACK`


    var data =`<?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:t="https://schemas.microsoft.com/exchange/services/2006/types"
                   xmlns:m="https://schemas.microsoft.com/exchange/services/2006/messages">
       <soap:Header>
          <t:RequestServerVersion Version="Exchange2016" />
          <t:MailboxCulture>en-US</t:MailboxCulture>
       </soap:Header>
       <soap:Body >
          <m:GetImItemList/>
       </soap:Body>
    </soap:Envelope>`

    var options = {
        method: "get",
        url: "https://outlook.office365.com/EWS/Exchange.asmx",
        headers: {
            "Authorization": "Basic " + base64,
            "content-type": "application/xmnl",
            useragent
        },
        //body
    }

    
  
    var errorPro 

    var data = await axios(options).catch(({response}) => {
        
    errorPro = JSON.stringify(response.data)

    })

    if (errorPro ) {
        var msg = require('chalk').black.bgRed('connectEWS - auth fail')
        console.log(msg)
        return Promise.reject(errorPro.match('Error'))
     } else {
         var msg = require('chalk').black.bgGreen('connectEWS - auth success')
        console.log(msg)
        console.log(data.statusText)
        return data.statusText
   
     }
    

}




module.exports={connectEWS}
