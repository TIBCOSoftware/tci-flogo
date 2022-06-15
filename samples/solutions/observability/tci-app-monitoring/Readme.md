# Monitoring TCI apps using APIs.

The TIBCO Cloud Integration (TCI) API gives you the ability to automate and embed functionality into your own application, monitoring tools, 
customer service applications, or automated CI/CD processes. There are multiple instances for the API site available in different regions. 
Each region has its own API URL and more information can be found in the [product documentation](https://integration.cloud.tibco.com/docs/#Subsystems/tci-api/home.html?TocPath=TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257C_____0). 

# <span style="text-decoration:underline;">Use-cases</span> 

The current solution demonstrates the below mentioned use-cases.

1. Email alerts based on Status of Apps. (Stopped & Error states)
2. Email alerts based on Faulted instances. 
3. Scaling up and down apps based on CPU threshold per instance. 
4. Hybrid Agent Monitoring 
5. Idenitfy the list of unused or inactive applications for a certain (X) number of days. 
6. Identify the public visibility endpoint applications and configure them as private. (optional).

# <span style="text-decoration:underline;">Pre-requisites </span> 

* Valid subscription to TIBCO Cloud Integration*
* PostgreSQL DB instance (_optional_)
* Valid subscription to TIBCO Cloud Spotfire (_optional for visualization purpose_)

This solution is built using TIBCO Cloud™ Integration - Develop (Flogo) and leverages TCI Platform APIs to monitor TCI applications.

# <span style="text-decoration:underline;">Solution Description</span>

This solution provides an end-to-end solution - from subscribing to TCI APIs, generating events/alerts/notifications to taking appropriate actions and 
a very powerful visual analytics dashboard. (optional) 

# Use-case # 1 - Identify Stopped or Error state applications.
Alerts users if any of the application(s) in a specified organization goes into a Stopped or an Error state. 

# Use-case #2 - Identify Faulted Application instances.
Alerts users when there are faulted instances within TCI apps. 

# Use-case #3 - Auto-Scaling of applications based on CPU threshold. 
Scales up the instances when the CPU threshold goes beyond 70% (user configurable) and scales down the instances when the CPU threshold goes below 40% (user configurable). 
These threshold values are configurable via app properties. 

# Use-case #4 - Monitoring the health of Hybrid Agents 
Alerts users about the list of failed (or not running) hybrid agents from a specific org.  

# Use-case #5 - Identify unused or inactive applications over a period of time. 
Alerts users about the list of unused or inactive applications (based on the application instance metircs) for over a certain period of time. (default is 30 days but configurable via App Properties) Optionally, users can also scale down these unused or inactive applications via a configurable parameter. 

# Use-case #6 - Identify the applications with public endpoints visibility. 
Provides the list of applications with public endpoints visibility. Optionally, users can update the application visibility to TIBCO Cloud Mesh (previously known as private endpoints) for one or more applications via a configurable parameter.

**NOTE: These theshold values are configurable and you can change them as per user business requirement.**

**For Use-case #3**

**Scaling UP conditions:**
If CPU > 70% (default configuration), scale up to 03 instances. 

**Scaling Down conditions.**
If CPU < 40% (default configuration), scale down the instances. Minimum active app instance should be at least 01.

**Additional Notes**

- Allows users to set SubscriptionLocator and OAuth token - enables them to monitor the apps deployed in any organization. 
- Steps to get the OAuth token is [here.](https://integration.cloud.tibco.com/docs/Subsystems/tci-api/getstarted/basics/authentication.html)
- Steps to enable the API access is [here.](https://integration.cloud.tibco.com/docs/Subsystems/tci-api/getstarted/basics/enable-api-access.html)
- Alerts are email notifications and can be customized to any other alerts. 
- API leveraged to Get Applications from Organization --> /v1/subscriptions/{subscriptionLocator}/apps
- API leveraged to Get Application Status --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/status
- API leveraged to Get Application Instance metrics --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/monitoring/metrics/resource
- API leveraged to Scale an Application --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/scale
- API leveraged to Get registered Hybrid Agents from an Organization --> /v1/subscriptions/{subscriptionLocator}/hybridAgents
- API leveraged to Get Application Metrics --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}/monitoring/metrics
- API leveraged to Update Application attributes --> /v1/subscriptions/{subscriptionLocator}/apps/{appId}

# Demos 

# Usecase 1-3
https://user-images.githubusercontent.com/17696107/129003005-1c0033a6-99e0-4625-91ee-b4da09d0a92e.mp4

# Usecase 4-6
https://user-images.githubusercontent.com/17696107/138812272-c8dbf6dc-f370-45d7-b9e3-e7bdd672c255.mp4

# Solution Architecture

![image](https://user-images.githubusercontent.com/17696107/128907813-76904195-8f2f-456f-ba23-2d0434ae1724.png)

**NOTE**: *This illustrates the design of the first use-case in the solution, provided that all other use-cases follow a similar pattern and operate with TCI platform APIs.* 

# Solution Setup
This solution contains the following components:

- TIBCO Cloud Integration - Develop (Flogo) applications: ApplicationWatcher_Alerts & ApplicationWatcher_SubscriberApp. 
- TIBCO Cloud Spotfire artifacts - AppStatus-dashboard. 

# Steps to setup Flogo apps

1. Download [TCI-Monitoring-Solution.zip file](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/solutions/observability/tci-app-monitoring/TCI_Monitoring_Solution.zip), unzip it in /tmp/ directory. 
2. Flogo applications are under /src/flogo/ 
    * ApplicationWatcher_Alerts.json
    * ApplicationWatcher_SubscriberApp.json
    * ApplicationWatcher_AutoScale
    * ApplicationWatcher_HybridAgnets
    * ApplicationWatcher_InactiveAppLocator
    * ApplicationWatcher_LocateUpdateAppEndpointVisibility
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
13. Repeat the steps from 4 to 12 to import other Flogo applications for the other use-cases. (2 to 6)

## Updating Env Variables

For each of the application user needs to update the highlighted application variables in **Environment Section**.

* **ApplicationWatcher_Alerts** 

![appWatcher_1](https://user-images.githubusercontent.com/79621490/131295572-ad74590f-9aa2-4f10-9811-12e1fa25d13f.png)

* **ApplicationWatcher_SubscriberApp**  

![appSubscriber](https://user-images.githubusercontent.com/79621490/131296008-3b7c00f6-a3dd-4188-8447-cbc0adc8e9a5.png)

* **ApplicationWatcher_AutoScale**  

![auto-scale](https://user-images.githubusercontent.com/79621490/131296048-babbb33a-0890-4e69-baeb-ca8fcc0e6a21.png)

* **ApplicationWatcher_HybridAgents** 

<img width="1792" alt="hybarid_agents" src="https://user-images.githubusercontent.com/79621490/137324776-c44d7ce5-ab78-4567-8845-e9ad9bd3513a.png">


* **ApplicationWatcher_InactiveAppLocator** 

<img width="1792" alt="Inactive_apps" src="https://user-images.githubusercontent.com/79621490/137324984-98f2cc11-e68e-4468-901f-d563806b985a.png">


* **ApplicationWatcher_LocateUpdateAppEndpointVisibility**  

<img width="1792" alt="update_endpoints" src="https://user-images.githubusercontent.com/79621490/137325042-245efdc0-e553-42f5-9331-b9ce41b1898f.png">


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



