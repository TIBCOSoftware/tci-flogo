# Deploy Flogo App as Azure Functions

## Prerequisites:
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free)
- Install [Visual Studio Code](https://code.visualstudio.com/)
- Install [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for Visual Studio Code
- Install [Azure Functions Core Tools](https://docs.microsoft.com/en-in/azure/azure-functions/functions-run-local) version 3.x. or later Use the `func --version` command to check that it is correctly installed


## How to create your own functions app project:
1. Create a new directory and enter it. Create a new function app using the following command:
    ```
    func init --worker-runtime custom --docker
    ```

2. Now create a new function from a template using command:
    ```
    func new --name <your-app-name-here> --template "HTTP trigger"
    ```
3. Download or build the binary for your HTTP Trigger app and copy into the directory you created in step 1 and make sure it's executable. If not use the following command:
    ```
    chmod +x <binary-file-name-here>
    ```
4. Add the following script into your project folder with name `start.sh` and also make it executable:
    ```
    #!/usr/bin/env sh
    echo "Starting function..."
    PORT=${FUNCTIONS_CUSTOMHANDLER_PORT} ./TasksRestServer-linux_amd64
    ```

    ```
    chmod +x start.sh
    ```

5. Edit your `function.json` to update the default app prefix from `api` to your prefix. For example I'll change it to `hello-world`
    ```
    {
        "bindings": [
            {
                "authLevel": "anonymous",
                "type": "httpTrigger",
                "direction": "in",
                "name": "req",
                "methods": ["get", "post"],
                "route": "books/{bookID}"
            },
            {
                "type": "http",
                "direction": "out",
                "name": "res"
            }
        ]
    }
    ```
6. Edit your `host.json` to look like this:
    ```
    {
        "version": "2.0",
        "logging": {
            "applicationInsights": {
                "samplingSettings": {
                    "isEnabled": true,
                    "excludedTypes": "Request"
                }
            }
        },
        "extensionBundle": {
            "id": "Microsoft.Azure.Functions.ExtensionBundle",
            "version": "[2.*, 3.0.0)"
        },
        "customHandler": {
            "description": {
                "defaultExecutablePath": "start.sh",
                "workingDirectory": "",
                "arguments": []
            },
            "enableForwardingHttpRequest": true
        },
        "extensions": {
            "http": {
                "routePrefix": ""
            }
        }
    }
    ```
7. Finally edit your `Dockerfile` to look like this:
    ```
    # To enable ssh & remote debugging on app service change the base image to the one below
    FROM mcr.microsoft.com/azure-functions/dotnet:3.0-appservice 
    ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
        AzureFunctionsJobHost__Logging__Console__IsEnabled=true
    COPY . /home/site/wwwroot
    ```
8. Now you directory structure should look like this:
   ```
    .
    ├── Dockerfile
    ├── hello-world-app
    │   └── function.json
    ├── hello-world-rest-trigger-linux_amd64
    ├── host.json
    ├── local.settings.json
    └── start.sh
   ```
9.  You can now test your app locally by running the following command:
    ```
    func start
    ```
    If you are using the same app attached in this repo (hello-world-rest-trigger app) you can use the command below to check if your app works or use the URL in the output of above command:
    ```
    curl -i 'http://localhost:7071/books/UFxQhszT450?title=Dummy%20Title' -H 'X-Request-ID: d726db6e-7c7e-4509-a386-a2ce3337edfa'
    ```
    You should see the below output (if you are using the hello-world-rest-trigger app):
    ```
    HTTP/1.1 200 OK
    Date: Tue, 03 Aug 2021 15:54:36 GMT
    Content-Type: application/json; charset=UTF-8
    Server: Kestrel
    Content-Length: 63
    Access-Control-Allow-Origin: *
    X-Request-ID: d726db6e-7c7e-4509-a386-a2ce3337edfa
    X-Server-Instance-Id: 9ce5cc5a91a79e766e3fe503fab73558

    {"author":"John Doe","id":"UFxQhszT450","title":"Dummy Title"}
    ```

10. Follow the instructions here to [publish your app to Azure](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-other?tabs=go%2Clinux#publish-the-project-to-azure)



## References:
For more information on Azure Functions HTTP trigger,  customize the HTTP endpoints and using route parameters checkout [official docs here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger)