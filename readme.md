## Azure AD Legacy Auth CLI test client for Azure AD Security Assessments 

Determine if Conditional Access is configured properly. This tool is alternative solution to [MS Test Connectivity](https://testconnectivity.microsoft.com/tests/o365)


![img](https://user-images.githubusercontent.com/58001986/152131519-ed7d7a8a-1f3a-47df-a055-010dfebced01.gif)

## License

[READ HERE](https://github.com/jsa2/legacyAuth/blob/public/LICENSE)

---
 
  ⚠ Only use this tool if you know what you are doing

  ⚠ Always test the tool first in test environments, with non-sensitive data

---

### Endpoints 

Legacy SOAP endpoints|detail
-|-
✅ [connectMsOnline](src/msoid.js)| simulates connect-msolService CMDLET <br> **Application** Microsoft Online Syndication Partner Portal <br> **Application ID** d176f6e7-38e5-40c9-8a78-3998aab820e7
✅ [connectSPO](src/spo.js)| simulates legacy SPO access<br> **Application**	Office 365 SharePoint Online <br> **Application ID** 00000003-0000-0ff1-ce00-000000000000
✅ [connectEWS](src/exo.js)| simulates legacy EWS access <br> **Client app**	Exchange Web Services


### Running the tool
⚠️ While this tool does not store passwords (passwords are only retained in runtime) the recommendation is not to use privileged credentials. Always use read-only account, that is recommendation for any assessment use scenario

**Install**
- Use Azure Cloud Shell (BASH), or WSL (Cloud Shell is prefered)

```sh
curl -o- https://raw.githubusercontent.com/jsa2/legacyAuth/public/remote.sh | bash
```

**Running**
```sh
cd legacyAuth
node main.js --u=admin@M365B322999.onmicrosoft.com --p='DemoPasswordToEmptyTenant!.1'
```
  

### Reviewing logs 

Authentication attempts are shown in non-interactive Azure AD logs 

![image](https://user-images.githubusercontent.com/58001986/152113551-21da3334-e260-47df-a8e5-3536959b3444.png)

