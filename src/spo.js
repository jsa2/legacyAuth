const axios = require('axios')
var {
    parseString
} = require('xml2js')



async function connectSPO (username, password) {
    var useragent = `SPO CSOM`

    var data = `<?xml version="1.0" encoding="UTF-8"?>
    <S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
    xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing"
    xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust">
      <S:Header>
        <wsa:Action S:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</wsa:Action>
        <wsa:To S:mustUnderstand="1">https://login.microsoftonline.com/rst2.srf</wsa:To>
        <ps:AuthInfo xmlns:ps="http://schemas.microsoft.com/LiveID/SoapServices/v1" Id="PPAuthInfo">
          <ps:BinaryVersion>5</ps:BinaryVersion>
          <ps:HostingApp>Managed IDCRL</ps:HostingApp>
        </ps:AuthInfo>
        <wsse:Security>
          <wsse:UsernameToken wsu:Id="user">
            <wsse:Username>${username}</wsse:Username>
            <wsse:Password>${password}</wsse:Password>
          </wsse:UsernameToken>
          <wsu:Timestamp Id="Timestamp">
            <wsu:Created>2021-01-11T16:26:06.7553884Z</wsu:Created>
            <wsu:Expires>2021-01-12T16:26:06.7553884Z</wsu:Expires>
          </wsu:Timestamp>
        </wsse:Security>
      </S:Header>
      <S:Body>
        <wst:RequestSecurityToken xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust" Id="RST0">
          <wst:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</wst:RequestType>
          <wsp:AppliesTo>
            <wsa:EndpointReference>
              <wsa:Address>sharepoint.com</wsa:Address>
            </wsa:EndpointReference>
          </wsp:AppliesTo>
          <wsp:PolicyReference URI="MBI"></wsp:PolicyReference>
        </wst:RequestSecurityToken>
      </S:Body>
    </S:Envelope>`

    var opt = {
        url: "https://login.microsoftonline.com/RST2.srf",
        data,
        headers: {
            "user-agent": useragent,
            "content-type": 'application/soap+xml'
        }
    }

    var {data} = await axios(opt).catch(error => {
        console.log(error)
    })

var errorPro 
var resProp 
    parseString(data, (err, res) => {

        Object.keys(res['S:Envelope']['S:Body'][0]).map((key) => {
            console.log(key)
            if (key ==~ 'psf:error' || key == 'S:Fault' ) {
               errorPro =  res['S:Envelope']['S:Body'][0][key]
            } 
            if (key == "wst:RequestSecurityTokenResponse") {
                resProp = res["S:Envelope"]["S:Body"][0]["wst:RequestSecurityTokenResponse"][0]["wst:RequestedSecurityToken"][0]["wsse:BinarySecurityToken"]
            }
        })
     })
        //  console.log(err, res)

     if (errorPro ) {
              
    console.log('connectSPO - auth fail')
    var msg = require('chalk').black.bgRed('MSONLINE - auth fail')
      console.log(msg)
        return Promise.reject(errorPro)
     }
       
     var msg = require('chalk').black.bgGreen('SPO - auth success')
        console.log(msg)
    console.log(JSON.stringify(resProp).slice(0,25))
    return resProp

}




module.exports={connectSPO}
