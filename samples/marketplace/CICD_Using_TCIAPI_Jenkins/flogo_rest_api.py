#!/usr/bin/env python
# Author : Nikhil Shah
# Date : 06/08/21
# This python script executes below CI/CD workflow which is called by jenkins..
""" We have 2 orgs we use for CI/CD in the Cooper Airlines org: Dev/QA, Staging & Pre-Production
1. The app is deployed on Dev/QA org using the flogo.json and manifest.json artifacts on github
2. Start the app and Test the endpoints
3. Copy this app from Dev/QA org to Staging  org
4. Start the new copied app in Staging org
5. Override the app prop 
6. Retrieve the endpoints of the deployed app in Staging org
7. Invoke the endpoint to "test" it """

# For more info on the TIBCO Cloud™ Integration API, please refer docs - https://integration.cloud.tibco.com/docs/#Subsystems/tci-api/home.html?TocPath=TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257C_____0
# For more info on the API definitions, refer Swagger Page URL - https://api.cloud.tibco.com/tci/docs/
# How to run this code -
# python3 flogo_rest_api.py <api_url> <access_token> <sourceAppId> <subscriptionLocator> <targetSubscriptionLocator> <newAppName> <endpoint_path> <app_artifacts_github_path> <override_app_prop_json>


import json
import requests
import time
import argparse
import os

subscriptionLocator=0
targetSubscriptionLocator=''
api_url=''
Auth_Header=''

parser = argparse.ArgumentParser()
parser.add_argument('api_url')
parser.add_argument('access_token')
parser.add_argument('sourceAppId')
parser.add_argument('subscriptionLocator')
parser.add_argument('targetSubscriptionLocator')
parser.add_argument('newAppName')
parser.add_argument('endpoint_path')
parser.add_argument('app_artifacts_github_path')
parser.add_argument('override_app_prop_json')

args = parser.parse_args()

print ('api_url :',args.api_url)
print ('access_token :',args.access_token)
print ('sourceAppId :',args.sourceAppId)
print ('subscriptionLocator :',args.subscriptionLocator)
print ('targetSubscriptionLocator :',args.targetSubscriptionLocator)
print ('newAppName :',args.newAppName)
print ('endpoint_path :',args.endpoint_path)
print ('app_artifacts_github_path :',args.app_artifacts_github_path)
print ('override_app_prop_json:', args.override_app_prop_json)


api_url=args.api_url
access_token=args.access_token
sourceAppId=args.sourceAppId
subscriptionLocator=args.subscriptionLocator
targetSubscriptionLocator=args.targetSubscriptionLocator
newAppName=args.newAppName
endpoint_path=args.endpoint_path
app_artifacts_github_path=args.app_artifacts_github_path
override_app_prop_json=args.override_app_prop_json



Auth_Header={'Authorization' : 'Bearer '+access_token+'','Accept': 'application/json','User-Agent':'PostmanRuntime/7.28.3'}

#Get User Info
def get_userInfo():
    try:
        response = requests.get(api_url+'/userinfo', headers=Auth_Header)
        #print('\n**** User Info*****' , response.json())  
        #print ("*******",response.status_code)
    except:
        print ("ERROR: Please enter valid API URL. For eg. https://api.cloud.tibco.com/tci/v1 for TCI US region.")
        exit()

# Download flogo app json and manifest json from github url, required to be passed as body for deploying app
# Note  that this function assumes that the github url provided as app_artifacts_github_path argument is a public github url.
#If it is a provate url, then you will need to modify the function to login to your private github url first
# flogo_json_url, manifest_json_url is the graw ithub url till the path where your app json and manifest json are stored
#For eg: https://github.com/nikhilshah26/TCI-FLOGO-CICD/tree/main/Flogo_App
def download_app_artifacts_from_githib(flogo_json_url,manifest_json_url):
    directory = os.getcwd()
    flogojsonfilename = directory + "/" + 'flogo.json'
    #print ("flogojsonfilename="+flogojsonfilename)
    flogo_json = requests.get(flogo_json_url)

    if (flogo_json.status_code==200):
        f = open(flogojsonfilename,'w')
        f.write(flogo_json.text)
        f.close()
        print("**** Downloaded flogo.json ****")
        #print ("****FLOGO json****",flogo_json.text)
    else:
        print ("ERROR: Not able to download flogo.json from ",flogo_json_url)
        exit()

    manifestjsonfilename = directory + "/" + 'manifest.json'
    manifest_json = requests.get(manifest_json_url)

    if (manifest_json.status_code==200):
        f1 = open(manifestjsonfilename,'w')
        f1.write(manifest_json.text)
        f1.close()
        print("**** Downloaded manifest.json ****")
        #print ("****Manifest json****",manifest_json.text)
    else:
        print ("ERROR: Not able to download manifest.json from ",manifest_json_url)
        exit()


    

#Deploy/push app using the flogo json and manifest json artifacts downloaded using the download_app_artifacts_from_githib function
#subsLocator - Source Org Locatior. Pass the value as 0 if you want to push app in current org from where OAuth2 token is downloaded
#appName - app name - should be unique within org.
#forceOverwrite - true/false
#instanceCount - 0/1/2/etc
#retainAppProps - true/false
def pushapp_using_app_artifacts(subsLocator,appName,forceOverwrite,instanceCount,retainAppProps):
    files = [
            ('artifact', ('flogo.json', open('flogo.json', 'rb'), 'application/json')),
            ('manifest.json', ('manifest.json', open('manifest.json', 'rb'), 'application/json'))
        ]

    
    response = requests.post(api_url+'/subscriptions/'+subsLocator+'/apps?appName='+appName+'&forceOverwrite='+forceOverwrite+'&instanceCount='+instanceCount+'&retainAppProps='+retainAppProps+'', headers=Auth_Header,files=files)
    time.sleep(25)
    if (response.status_code != 202):
        print ("ERROR: *****Status Code****"+str(response.status_code))
        print (response.text)
        exit()
    else:
        #print ("*****Status Code****"+str(response.status_code))
        #print(response.json())
        
        resp_dict=json.loads(json.dumps(response.json()))
        appId=resp_dict['appId']
        print("\n**** Deployed app successfully with the artifacts provided. App ID - ",appId)
        return appId


    

#Copy App from Dev/QA Org to Staging Org. Pass 0 as subscriptionLocator, targetSubscriptionLocator if you want to copy to same org from where Oauth Token is generated.
def copy_app(sourceAppId,NewAppName,subscriptionLocator,targetSubscriptionLocator):
    
    if targetSubscriptionLocator != '':
        response = requests.post(api_url+'/subscriptions/'+subscriptionLocator+'/apps/'+sourceAppId+'/copy?appName='+NewAppName+'&targetSubscriptionLocator='+targetSubscriptionLocator, headers=Auth_Header)
    else:
        response = requests.post(api_url+'/subscriptions/0/apps/'+sourceAppId+'/copy?appName='+NewAppName, headers=Auth_Header)    
    print (response.status_code)
    if (response.status_code == 401):
        print ("ERROR: Invalid Secret access token. Please input valid Secret access token generated from https://account.cloud.tibco.com/manage/settings/oAuthTokens for TCI US region")
        exit()
    elif (response.status_code == 404 or response.status_code == 400):
        print (response.text)
        exit()

    print(response.json())
    resp_dict=json.loads(json.dumps(response.json()))
    appId=resp_dict['appId']
    print ("\n*****Copied App successfully from Dev/QA org to Staging Org - ",appId)
    return appId

#Get App Details
def get_app_details(appId,targetSubscriptionLocator):
    if targetSubscriptionLocator !='':
        response = requests.get(api_url+'/subscriptions/'+targetSubscriptionLocator+'/apps/'+ appId, headers=Auth_Header) 
    else:
        response = requests.get(api_url+'/subscriptions/0/apps/'+ appId, headers=Auth_Header) 

      
    print('\n**** App Details *****' , response.json())  

# Start the app
def start_app(targetSubscriptionLocator,app_id):
    req_url=api_url+'/subscriptions/'+targetSubscriptionLocator+'/apps/'+ app_id+'/start'
    #print ('req_url=',req_url)
    if targetSubscriptionLocator !='':
        response = requests.post(req_url, headers=Auth_Header) 
    else:
        response = requests.post(api_url+'/subscriptions/0/apps/'+ app_id+'/start', headers=Auth_Header) 
      
    print('\n**** App Started successfully. App ID -', app_id)  

# Test the app endpoints. Endpoints is applicable for app which has ReceiveHTTPMessage/REST Trigger
# If the app has multiple endpoints, then this function needs to be called multiple times and also you will need to specify the method if it is get,put,post,delete and also body in case of post/put methods.
def test_endpoints(targetSubscriptionLocator,app_id,path,method,body):

    response = requests.get(api_url+'/subscriptions/'+targetSubscriptionLocator+'/apps/'+ app_id+'/endpoints', headers=Auth_Header) 
    resp_dict=json.loads(json.dumps(response.json()))
    req_url=resp_dict[0]['url']
    time.sleep(20)

    if method == 'get':
        print ("**** get req url", req_url+path)
        resp = requests.get(req_url+path)
        print ("*****Endpoint Response Code***",resp.status_code)
        print ("*****Endpoint Response ***",resp.json())
    elif method == 'post':
        print ("**** post req url", req_url+path+body)
        resp = requests.post(req_url+path,data=body)
        print ("*****Endpoint Response Code***",resp.status_code)
        print ("*****Endpoint Response ***",resp.json())
    elif method == 'put':
        print ("**** put req url", req_url+path+body)
        resp = requests.put(req_url+path,data=body)
        print ("*****Endpoint Response Code***",resp.status_code)
        print ("*****Endpoint Response ***",resp.json()) 
    elif method == 'delete':
        print ("**** delete req url", req_url+path)
        resp = requests.delete(req_url+path)
        print ("*****Endpoint Response Code***",resp.status_code)
        print ("*****Endpoint Response ***",resp.json())
    else:
        print ("ERROR: **** Invalid method ****")

#This function overrides app props based on the json passed to the function.
#Note that you can pass multiple app props as array to the json.
#If the app prop value contains special characters like space, you will need to encode it unicode format. For eg: For space, you need to specify \u0020 
# Variable type can be app, engine, user
# override_app_prop_json - Need to pass in the below format -
#[{"description": "string","name": "string","type": "string","value": "string"}]
#Variables to be updated. Description and data type are ignored for engine and app variables.
def override_app_props(subscriptionLocator,app_id,variableType,override_app_prop_json):
    if (override_app_prop_json!="" or override_app_prop_json!={}):
        print ("***** Overriding App Prop******** ", override_app_prop_json)
        response = requests.put(api_url+'/subscriptions/'+subscriptionLocator+'/apps/'+ app_id+'/env/variables?variableType='+variableType, headers=Auth_Header,data=override_app_prop_json)
        #print (response.status_code)
        print (response.text)

    

#Delete app
def delete_app(subscriptionLocator,app_id):
    print ("***** Deleting app with appid: ", app_id)
    response = requests.delete(api_url+'/subscriptions/'+subscriptionLocator+'/apps/'+ app_id, headers=Auth_Header)
    #print (response.status_code)
    print (response.text)

#Main function
#In this main function, you can call functions based on your workflow.
#For eg: If you already have an app in the org, and you just need to copy it to another org, you can comment out download_app_artifacts_from_githib function and just call 
#copy_app function 
# If your app has multiple endpoints, then you might need to call test_endpoints multiple times with diff params to test all the endpoints.
# If you have to copy app from Dev/QA Org to Staging Org to Prod Org, then you will need to call copy_app, start_app, test_endpoints methods accordingly.
def main():
    #Get User Info
    get_userInfo()
    #If the app is already present in org, then you can use this function
    #app_id=copy_app(sourceAppId,newAppName,subscriptionLocator,targetSubscriptionLocator)
    #Download the flogo app json and manifest json artifcats from public github repo. It will be downloaded in current directory from where this python script is run.
    download_app_artifacts_from_githib(app_artifacts_github_path+'/flogo.json',app_artifacts_github_path+'/manifest.json')
    #Push the app to TCI
    app_id=pushapp_using_app_artifacts(subscriptionLocator,newAppName,"true","1","true")
    #Get app details
    #get_app_details(app_id,subscriptionLocator)
    #Adding sleep to make sure app goes into running state
    time.sleep(35)
    #Test the app endpoints
    #If your app has multiple endpoints, then you can call this function multiple times with diff params
    test_endpoints(subscriptionLocator,app_id,endpoint_path,'get','')
    
    #Copy app from Dev/QA Org to Staging Org
    app_id_new=copy_app(app_id,newAppName,subscriptionLocator,targetSubscriptionLocator)
    #Start the app
    start_app(targetSubscriptionLocator,app_id_new)
    # Wait for app to start
    time.sleep(40)
    # Test the endpoints
    test_endpoints(targetSubscriptionLocator,app_id_new,endpoint_path,'get','')
    # Override app props based on the json passed
    override_app_props(targetSubscriptionLocator,app_id_new,'app',override_app_prop_json)
    #Add sleep to make sure app is repushed and goes in running state
    time.sleep(35)
    # Test the app endpoints after overriding app props.
    test_endpoints(targetSubscriptionLocator,app_id_new,endpoint_path,'get','')
    # Delete app from Dev/QA Org
    delete_app(subscriptionLocator,app_id)
    # Delete app from Staging Org
    #delete_app(targetSubscriptionLocator,app_id_new)

if __name__ == "__main__":
    main()
