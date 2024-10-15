# allOf-oneOf-anyOf schema construct

# Description

In JSON Schema, the keywords allOf,anyOf,oneOf are used to specify that a data structure must validate against one or more specified schemas.
The oneOf keyword specifies that the data must validate against exactly one of the schemas listed. If it matches more than one, or none at all, the validation fails.
The anyOf keyword allows for validation against multiple schemas. If the data validates against at least one of the schemas listed in anyOf, it is considered valid.
The allOf keyword JSON Schema is used to specify that a JSON document must satisfy all of the specified subschemas. It’s particularly useful for combining multiple schemas into one.
This sample demonstrates some of the combinator keywords features present in the FLOGO ReceiveHTTPMessage trigger and InvokeRestService activity. Features which are covered in these sample apps are:

## ReceiveHTTPMessage trigger
1. Path, query and header parameters in the REST trigger.
2. allOf,oneOf and anyOf keyword are used in Open API Specs 3.0 files which are in turn imported in REST trigger
3. ConfigureHTTPResponse activity to map corresponding code and response with Return activity.

## InvokeRestService activity
1. Configuring InvokeRest activity with the API Spec of the producer REST service.
2. allOf, anyOf and oneOf schema keywords are used to validate aginst the schema as stated in description
3. App property for the URL field which can be overridden at runtime as per the request URL.

## Import the sample
1. Download the sample json files i.e., *AllOf_OneOf_AnyOf_Keywords_APISpec_Service.json* and *Invoke_AllOf_OneOf_AnyOf_Keywords_APISpec_Service.json* 
Rest triggers in the service app have been configured with Open API Specs 3.0 files. These API Specs are available in the *OpenAPISpecs* folder.

2. Create a new empty app.
![Create an app](../../import-screenshots/2.png)

3. On the app details page, select Import app.
![Select import](../../import-screenshots/3.png)

4. Browse on your machine or drag and drop the .json file for the app that you want to import.
![Import your sample](../../import-screenshots/4.png)

5. Click Upload. The Import app dialog displays some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing. It validates whether all the activities and triggers used in the app are available in the Extensions tab.
![The Import app dialog](../../import-screenshots/5.png)

6. You have the option to import all flows from the source app or selectively import flows.

7. Click Next. If you had not selected a trigger in the previous dialog, the flows associated with that trigger are displayed. You have the option to select one or more of these flows such that the flows get imported as blank flows that are not attached to any trigger. By default, all flows are selected. Clear the check box for the flows that you do not want to import. If your flow(s) have subflows, and you select only the main flow but do not select the subflow, the main flow gets imported without the subflow. Click Next.


## Understanding the configuration
In *Invoke_AllOf_OneOf_AnyOf_Keywords_APISpec_Service* app we have three flows *Invoke_AnyOfKeywordAPISpecConfiguredFlow*, *Invoke_AllofKeywordAPISpecConfiguredFlow* and *Invoke_OneOfKeywordAPISpecConfiguredFlow* for anyOf, allOf and oneOf keyword.
![anyOf_keyword_response_body](./import-screenshots/anyOf_response_body.png)
![allOf_keyword_response_body](./import-screenshots/allOf_response_body.png)
![oneOf_keyword_response_body](./import-screenshots/oneOf_response_body.png)

In *Invoke_AllofKeywordAPISpecConfiguredFlow* flow we have uploaded Invoke rest activity with OAS *AllOfKeywordOAS30GetPost.json* from *OpenAPISpecs* folder
Similarly for *Invoke_OneOfKeywordAPISpecConfiguredFlow* flow we have uploaded Invoke rest activity with OAS *Petstore-Post-Nested-OneOf-30-APIspec.json*
and for *Invoke_AnyOfKeywordAPISpecConfiguredFlow* flow we have uploaded Invoke rest activity with OAS *Pets-Nested-Anyof-withAllof-30-APISpec.json*
App property is attached with the Invoke Rest activity URL field which can be overridden at runtime as per the URL of the service to be invoked without changing the app.
![InvokeRest_API_spec_config_allOf](./import-screenshots/Import_InvokeRest_API_spec.png)
![InvokeRest_API_spec_config_oneOf](./import-screenshots/Import_InvokeRest_API_spec_oneOf.png)
![InvokeRest_API_spec_config_anyOf](./import-screenshots/Import_InvokeRest_API_spec_anyOf.png)

Click on *Invoke_AllofKeywordAPISpecConfiguredFlow* click on mapper activity,navigate to input tab and expand all configurations and verify allOf properies present in schema is available in activity inputs. 
![allOf configuration](../../import-screenshots/allOfProperties.png)

Click on *Invoke_OneOfKeywordAPISpecConfiguredFlow* click on mapper activity,navigate to input tab and expand all configurations.Click on oneOf schema and select the radio button corresponding to required schema.Save the configuration and verify that in mapper input tab properties of selected schema are present in activity inputs. Input tree closes automatically when a schema is selected, we need to open the tree again to see the newly added schema properties and mapping the values.
![oneOf configuration](../../import-screenshots/selectOneOfSchema.png)
![select oneOf configuration](../../import-screenshots/select_oneOf_configuration.png)

Click on *Invoke_AnyOfKeywordAPISpecConfiguredFlow* click on mapper activity,navigate to input tab and expand all configurations.Click on anyOf schema and select the checkboxes(multiple schemas can be selected) corresponding to required schema.Save the configuration and verify that in mapper input tab properties of selected schema are present in activity inputs. Input tree closes automatically when a schema is selected, we need to open the tree again to see the newly added schema properties and mapping the values.
![anyOf configuration](../../import-screenshots/selectAnyOfSchema.png)
![select anyOf configuration](../../import-screenshots/select_anyOf_configuration.png)

## Run the application

Once you have imported both the apps, push the 'AllOf_OneOf_AnyOf_Keywords_APISpec_Service' app first and scale the app to 1. Now we need to get the endpoint of the producer service, go to the 'Endpoint' tab of the app and click on 'Copy URL' to get the endpoint URL.
![Copy URL from Endpoint tab](./import-screenshots/copy_service_URL.png)

Now push the 'Invoke_AllOf_OneOf_AnyOf_Keywords_APISpec_Service' app and scale the app to 1. Go to 'Environment Controls' tab -> 'Application Variables' and edit the default value of the 'InvokeRestURL' application property to point to the endpoint URL of the producer Rest service app.
![Application property on Endpoint tab](./import-screenshots/updateServiceUrl_EnvControlstab.png)

To run the app binary, create appropriate binaries for both the apps and run the 'AllOf_OneOf_AnyOf_Keywords_APISpec_Service'. Export app property and its URL for all the three services in  'Invoke_AllOf_OneOf_AnyOf_Keywords_APISpec_Service' app before running the invoking app like this:

 $ export allOf_Service="http://localhost:9999/invokepostallof"
 $ export anyOf_Service="http://localhost:9999/invokeoneOfpets"
 $ export oneOf_Service="http://localhost:9999/invokeanyOfpets"

 $ FLOGO_APP_PROPS_ENV=auto ./Invoke_AllOf_OneOf_AnyOf_Keywords_APISpec_Service-linux_amd64 

And then hit the endpoint of the 'Invoke_AllOf_OneOf_AnyOf_Keywords_APISpec_Service' app.

## Output

1. Sample response for allOf 201 Success 
![Enter the allOf POST request schema](../../import-screenshots/allOf_request_payload.png)
![verify the allOf POST response schema](../../import-screenshots/allOf_response_payload.png)

2. Sample response for oneOf 201 Success 
![Enter the oneOf POST request schema](../../import-screenshots/oneOf_request_payload.png)
![Verify the oneOf POST response schema](../../import-screenshots/oneOf_response_payload.png)

3. Sample response for anyOf 201 Success 
![Enter the anyOf POST request schema](../../import-screenshots/anyOf_request_payload.png)
![Verify the anyOf POST response schema](../../import-screenshots/anyOf_response_payload.png)

4. Sample response for allOf 400 Bad request
![Enter the allOf invalid POST request schema](../../import-screenshots/allOf_invalid_request_payload.png)
![verify the allOf POST response schema:invalid data type](../../import-screenshots/allOf_response_invalidDataType_entered.png)

5. Sample response for oneOf 400 Bad request
![Enter the oneOf invalid POST request schema](../../import-screenshots/oneOf_invalid_request_payload.png)
![verify the oneOf POST response schema:Must validate one and only one schema](../../import-screenshots/oneOf_mustValidate_only_one_schema.png)


**Note:- Return and Reply to Trigger activity does not possess selecting oneOf-anyOf schema since it is driven by trigger reply of Receive HTTP Message .**
## Contributing
If you want to build your own activities for Flogo please read the docs here.

If you want to showcase your project, check out [tci-awesome](https://github.com/TIBCOSoftware/tci-awesome)

You can also send an email to `tci@tibco.com`

## Feedback
If you have feedback, don't hesitate to talk to us!

* Submit feature requests on our [TCI Ideas](https://ideas.tibco.com/?project=TCI) or [FE Ideas](https://ideas.tibco.com/?project=FE) portal
* Ask questions on the [TIBCO Community](https://community.tibco.com/answers/product/344006)
* Send us a note at `tci@tibco.com`

## Help
Please visit our [TIBCO Cloud<sup>&trade;</sup> Integration documentation](https://integration.cloud.tibco.com/docs/) and TIBCO Flogo® Enterprise documentation on [docs.tibco.com](https://docs.tibco.com/) for additional information.

## License
This TCI Flogo SDK and Samples project is licensed under a BSD-type license. See [license.txt](license.txt).
