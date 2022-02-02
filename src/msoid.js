const axios = require('axios')
var {
    parseString
} = require('xml2js')



async function connectMsOnline (username, password) {
    var useragent = `Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.2; Win64; .NET4.0C; .NET4.0E; MSOIDCRL 7.250.4551.0; App-Legacy-AzureAD-Management-hacker, 7.250.4551.0, {2606CB41-DB56-416C-BA08-683672FD4780})`

    var data = `<?xml version="1.0" encoding="UTF-8"?>
    <s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:ps="http://schemas.microsoft.com/Passport/SoapServices/PPCRL"
    xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:saml="urn:oasis:names:tc:SAML:1.0:assertion" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy"
    xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:wssc="http://schemas.xmlsoap.org/ws/2005/02/sc"
    xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust">
      <s:Header>
        <wsa:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</wsa:Action>
        <wsa:To s:mustUnderstand="1">https://login.microsoftonline.com:443/RST2.srf</wsa:To>
        <wsa:MessageID>1610113510</wsa:MessageID>
        <ps:AuthInfo xmlns:ps="http://schemas.microsoft.com/Passport/SoapServices/PPCRL" Id="PPAuthInfo">
          <ps:HostingApp>{847B5330-24F2-4D4B-BDFA-F4B0A32CEB51}</ps:HostingApp>
          <ps:BinaryVersion>7</ps:BinaryVersion>
          <ps:UIVersion>1</ps:UIVersion>
          <ps:Cookies></ps:Cookies>
          <ps:RequestParams>AQAAAAIAAABsYwQAAAAxMDMz</ps:RequestParams>
        </ps:AuthInfo>
        <wsse:Security>
          <wsse:UsernameToken wsu:Id="user">
            <wsse:Username>${username}</wsse:Username>
            <wsse:Password>${password}</wsse:Password>
            <wsse:LoginOption>3</wsse:LoginOption>
          </wsse:UsernameToken>
          <wsu:Timestamp Id="Timestamp">
            <wsu:Created>2021-01-08T13:45:15Z</wsu:Created>
            <wsu:Expires>2021-01-08T13:50:15Z</wsu:Expires>
          </wsu:Timestamp>
        </wsse:Security>
      </s:Header>
      <s:Body>
        <ps:RequestMultipleSecurityTokens xmlns:ps="http://schemas.microsoft.com/Passport/SoapServices/PPCRL" Id="RSTS">
          <wst:RequestSecurityToken Id="RST0">
            <wst:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</wst:RequestType>
            <wsp:AppliesTo>
              <wsa:EndpointReference>
                <wsa:Address>http://Passport.NET/tb</wsa:Address>
              </wsa:EndpointReference>
            </wsp:AppliesTo>
          </wst:RequestSecurityToken>
          <wst:RequestSecurityToken Id="RST1">
            <wst:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</wst:RequestType>
            <wsp:AppliesTo>
              <wsa:EndpointReference>
                <wsa:Address>ps.microsoftonline.com</wsa:Address>
              </wsa:EndpointReference>
            </wsp:AppliesTo>
            <wsp:PolicyReference URI="MCMBI"></wsp:PolicyReference>
          </wst:RequestSecurityToken>
        </ps:RequestMultipleSecurityTokens>
      </s:Body>
    </s:Envelope>`

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
      if (key == "wst:RequestSecurityTokenResponseCollection") {
        resProp =res["S:Envelope"]["S:Body"][0]["wst:RequestSecurityTokenResponseCollection"][0]["wst:RequestSecurityTokenResponse"][1]["wst:RequestedProofToken"]
      }
  })
})
        //  console.log(err, res)

     if (errorPro ) {
      var msg = require('chalk').black.bgRed('MSONLINE - auth fail')
      console.log(msg)
        return Promise.reject(errorPro)
     }
       
   
     var msg = require('chalk').black.bgGreen('MSONLINE - auth success')
        console.log(msg)
        console.log(JSON.stringify(resProp).slice(0,30))
    return resProp

}


module.exports={connectMsOnline}