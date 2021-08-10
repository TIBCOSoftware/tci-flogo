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
- Solution leverages below API’s from Apps section of APIs:
   Get Apps from Organization /v1/subscriptions/{subscriptionLocator}/apps
   Get App Status /v1/subscriptions/{subscriptionLocator}/apps/{appId}/status
   Get App Instance metrics /v1/subscriptions/{subscriptionLocator}/apps/{appId}/monitoring/metrics/resource
   Scale an app /v1/subscriptions/{subscriptionLocator}/apps/{appId}/scale
   



