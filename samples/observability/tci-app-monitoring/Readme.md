# Monitoring TCI apps using APIs.

The TIBCO Cloud Integration (TCI) API gives you the ability to automate and embed functionality into your own application, monitoring tools, 
customer service applications, or automated CI/CD processes. There are multiple instances for the API site available in different regions. 
Each region has its own API URL and more information can be found in the [product documentation](https://integration.cloud.tibco.com/docs/#Subsystems/tci-api/home.html?TocPath=TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257C_____0). 

# <span style="text-decoration:underline;">Use-cases</span> 

The current solution demonstrates the below 03 monitoring use-cases.

1. Email alerts based on Status of Apps. (Stopped & Error states)
2. Email alerts based on Faulted instances. 
3. Scaling up and down apps based on CPU threshold per instance. 

# <span style="text-decoration:underline;">Pre-requisites </span> 

* Valid subscription to TIBCO Cloud Integration*
* PostgreSQL DB instance (_optional_)
* Valid subscription to TIBCO Cloud Spotfire (_optional for visualization purpose_)

This solution is built using TIBCO Cloud™ Integration - Flogo® and leverages platform APIs to monitor TCI applications.

# <span style="text-decoration:underline;">Solution Description</span>

This solution provides an end-to-end solution - from subscribing to TCI APIs, generating events/alerts/notifications to taking appropriate actions and 
a very powerful visual analytics dashboard. (optional) 

# Use-case # 1
Alerts users if any of the application(s) in a specified organization goes into a Stopped or an Error state. 

# Use-case #2 
Alerts users when there are faulted instances within TCI apps. 

# Use-case #3 
Scales up the instances when the CPU threshold goes beyond 70% and scales down the instances when the CPU threshold goes below 40%. 
These threshold values are configurable via app properties. 

# Scaling UP conditions:
If CPU > 70% 
Maximum scale up to 03 instances only even if CPU > 70%

# Scaling Down conditions:
If CPU < 40%, scale down the instances. 
Minimum active app instances should be at least 01.

# Additional Notes: 

- Allows users to set SubscriptionLocator and OAuth token - enables them to monitor the apps deployed in any organization. 
- Alerts are email notifications and can be customized to any other alerts. 
- API leveraged to Get Apps from Organization --> /v1/subscriptions/{subscriptionLocator}/apps
- API leveraged to Get App Status --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/status
- API leveraged to Get App Instance metrics --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/monitoring/metrics/resource
- API leveraged to Scale an app --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/scale

# Solution Architecture

![image](https://user-images.githubusercontent.com/17696107/128907813-76904195-8f2f-456f-ba23-2d0434ae1724.png)

# Solution Setup
This solution contains the following components:

- TIBCO Cloud Integration - Flogo artifacts - ApplicationWatcher_Alerts & ApplicationWatcher_SubscriberApp applications. 
- TIBCO Cloud Spotfire artifacts - AppStatus-dashboard. 

# Steps to setup Flogo apps

1. Download MonitoringTCIApps.zip file, unzip it in /tmp/ directory. 
2. Flogo applications are under /src/flogo/ 
    * ApplicationWatcher_Alerts.json
    * ApplicationWatcher_SubscriberApp.json
    * ApplicationWatcher_AutoScale
3. SubscriberApp has dependency on PostgreSQL database for visualization purposes. Execute the create table script under /src/db/create.sql to create these tables before running the solution. This is an optional step needed only if you need Spotfire visualization. 
4. Login to your TIBCO Cloud Integration subscription 
5. Select Create/Import a new Flogo app and click on Create New App.
6. On the app details page, select Import app option.
7. Browse and upload the JSON (ApplicationWatcher_Alerts.json) file of the app to be imported (from step #2). 
8. Once the app is imported, some generic errors and warnings pertaining to the app are listed. This step validates whether all the activities and triggers used in the app are available in the Extensions tab.
9. Users have an option to either selectively import specific flows or import all flows from the source app. Rename the app once it is imported successfully.
10. If a trigger in the previous dialog is not selected, the flows associated with that trigger are displayed. Users have an option to select one or more of these flows such that the flows get imported as blank flows that are not attached to any trigger. By default, all flows are selected. Uncheck the check box for the flows that you do not want to import. If your flow(s) have subflows, and you select only the main flow but do not select the subflow, the main flow gets imported without the subflow.
11. Once the import process is completed, you will see different flows and triggers in the application. 
12. Validate the application to see if there are any pending validations/errors. Ensure no errors/validations, push the application (click on push) for deployment and scale up the app instance (from 0 to 1)
13. Repeat the steps from 4 to 10 for ApplicationWatcher_SubscriberApp and ApplicationWatcher_AutoScale apps. 

# Steps to setup Spotfire Dashboard

1. A pre-configured Spotfire dashboard (AppStatus-dashboard.dxp) is provided under ../src/spotfire/ directory of the zip file. 
2. Login to your TIBCO Cloud Spotfire subscription. 
3. Select Browse local file option and upload the .dxp file, provide username/password for Data-Connection to connect to the database. (provide username/pwd 03 times to login successfully). 
4. Upon successful login, the dashboard fetches the data for visualization.
5. Users can edit, update and enhance the current dashboard per specific requirement(s).

![image](https://user-images.githubusercontent.com/17696107/128910889-9f854834-4445-466c-9dea-14bcdfb97f23.png)

# Testing the Solution

1. Click the Endpoints tab of the ApplicationWatcher_Alerts application.
2. Click on the Test option to bring up Swagger UI.
3. Click on the Try it out button. Provide the required information for the API configured and click on the Execute button. Similarly test the other application flows using the same approach. 
4. Verify the application status in application Logs or under the Monitoring tab.
5. For use-case # 3, at the end of each job cycle, you will see a list of apps updated and scale action status as shown below

![image](https://user-images.githubusercontent.com/17696107/128909989-100d2ff6-ae7e-4ee5-8359-9055faf3574a.png)
