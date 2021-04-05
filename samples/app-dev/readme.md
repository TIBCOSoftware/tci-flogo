# TIBCO Cloud<sup>&trade;</sup> Integration - Develop / TIBCO Flogo® Enterprise Samples<sup>&reg;</sup>

[This](https://github.com/TIBCOSoftware/tci-flogo) repository contains docs, samples and tools to build Flogo applications as well as build extensions. In this repository, you will find below samples - 

* [HelloWorld](/samples/app-dev/hello-world)
* [Array Manipulations Samples](/samples/app-dev/Array-Operations)
* [Bookstore REST API](/samples/app-dev/rest-api)
* [Branching & Error Handling](/samples/app-dev/branching-errorhandling)
* [Subflows](/samples/app-dev/subflows)
* [Loops](/samples/app-dev/loops.sample)
* [JSON Path](/samples/app-dev/json.path.sample)
* [Array Filtering](/samples/app-dev/array.forEach.sample)
* [EMS](/samples/app-dev/ems.sample)

Below is a list of steps to import the Flogo application/sample. Every sample also has separate readme instructions after importing the app. 

## Steps to Import a Flogo application/sample. 

1. Download the JSON file. (Sample Flogo app)

2. Create a new app.
![Create an app](import-screenshots/2.png)

3. On the app details page, select Import app option. 
![Select import](import-screenshots/3.png)

4. Browse and upload the JSON file of the app to be imported (from step #1).
![Import your sample](import-screenshots/4.png)

5. Once the app is imported, some generic errors and warnings pertaining to the app are listed. This step validates whether all the activities and triggers used in the app are available in the Extensions tab.
![The Import app dialog](import-screenshots/5.png)

6. Users have an option to either selectively import specific flows or import all flows from the source app.

7. If a trigger in the previous dialog is not selected, the flows associated with that trigger are displayed. Users have an option to select one or more of these flows such that the flows get imported as blank flows that are not attached to any trigger. By default, all flows are selected. Uncheck the check box for the flows that you do not want to import. If your flow(s) have subflows, and you select only the main flow but do not select the subflow, the main flow gets imported without the subflow.

## Help

Please refer [TIBCO Cloud<sup>&trade;</sup> Integration documentation](https://integration.cloud.tibco.com/docs/) and TIBCO Flogo® Enterprise documentation on [docs.tibco.com](https://docs.tibco.com/) for additional information.
