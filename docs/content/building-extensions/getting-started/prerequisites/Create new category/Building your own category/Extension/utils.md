---
date: 2016-04-09T16:50:16+02:00
title: Useful UI utils Method
weight: 5
---


* Check if environment is Flogo Enterprise or TCI Cloud Intergration

```typescript

WiContributionUtils.getAppConfig(this.http)
    .subscribe(data => {
        if (data.deployment === APP_DEPLOYMENT.ON_PREMISE) {
           console.log("This is FE env")
        }else {
            console.log("This is TCI env")
        }
    });

```


* Sending request

Send request from our backend to avoid the site cors issue. You can also refer to design time SDK `WiProxyCORSUtils` of `app/contrib/wi-contrib.d.ts/`
It does support most cases of HTTP request, you can specify method and adding query parameter or headers. 

Example: 
```typescript

    WiProxyCORSUtils.createRequest(http, url).addMethod("GET")
                .addHeader("Authorization", "Bearer " + connCredential["access_token"])
                .send()
                .subscribe((response: Response) => {
                if (response.status === 200) {
                    // 200 body
                } else {
                    // not 200, maybe erro etc
                }
            }, errRsp => {
                if (errRsp.status == 401) {
                    // error handler
                } else  {
                    console.log("Unkown error for request: " + errRsp);
                }
            })

```




