# Streaming TIBCO Cloud™ Integration app logs and metrics to Elasticsearch (EFK)

This tutorial explains how you can run the TIBCO Cloud™ Integration - Hybrid Agent in a Docker container to stream logs from TIBCO Cloud Integration Integrate (BusinessWorks) and Develop (Flogo), and collect them to EFK (Elasticsearch + Fluentd + Kibana) stack using container logs.

Please refer to the below product documentation links for more details on the TIBCO Cloud Integration Hybrid Agent and its log streaming feature:

1. Using the TIBCO Cloud Integration - Hybrid Agent: https://integration.cloud.tibco.com/docs/tci/using/hybrid-agent/index.html
2. Streaming logs using the hybrid agent: https://integration.cloud.tibco.com/docs/tci/using/hybrid-agent/hybrid-proxy/log-streaming.html

NOTE - EFK and TIBCO Cloud Integration - Hybrid Agent setup scripts are included here. The scripts can be used to setup a single node Elasticsearch cluster, Fluentd and Kibana using Docker Compose. This type of setup is suitable for testing purposes. Please refer to official docs for the EFK stack for production deployments. You can also consider setting up the Hybrid Agent container in a Kubernenets cluster or using container services provided by various cloud vendors. Although the setup configuration for the EFK stack and TIBCO Cloud Integration - Hybrid Agent may be different based on the container environment, the hybrid agent configuration should still be the same.

**Step 1: Configure the Hybrid Agent and build the Docker container**

1. Download the Hybrid Agent (tibagent) from your TIBCO Cloud Integration account and copy it into tibagent-docker directory (the same folder as the Dockerfile)

   Refer to "Installing, Configuring, and Running the Hybrid Agent" section in TIBCO Cloud Integration docs for more details

2. Create a new access key or use an existing access key and set it up for all the apps whose logs need to be streamed. 

   Please make sure you copy the secret for the access key as it will be required for the agent configuration

   Refer to "Setting the App Access Key for Hybrid Agent Proxies" section in TIBCO Cloud Integration docs for more details

3. Build the docker image to package the agent and startup.sh script: 

docker build -t tci/tibagent .

**Step 2: Update the TIBCO Cloud Integration account configuration required for launching the hybrid agent**

4. Update env.list file to update values(without any quotes) for the below environment variables:

        USER - TIBCO Cloud Integration account username

        PASSWORD - TIBCO Cloud Integration account password

        ORG - TIBCO Cloud Integration Organization name e.g. P&T Global

        REGION - TIBCO Cloud Integration Region e.g. us-west-2

        KEY - Name of the access key attached to your apps.

        SECRET - Secret for the access key attached to your apps.

**Step 3: Set up EFK stack using Docker Compose**

5. Set up EFK stack to collect the hybrid agent container logs into Elasticsearch using the FluentD logging driver and visualize them using Kibana

   Go to efk-docker directory and run:

docker-compose up -d

   Check if you can access the UI at http://localhost:5601 to confirm that the EFK stack started successfully.

**Step 4: Lauch the hybrid agent in a Docker container to stream TIBCO Cloud Integration apps logs**

6. Run docker container.

docker run -d --rm --log-driver=fluentd --env-file env.list --name tci-logs tci/tibagent

It will execute the startup.sh script while starting up. This script runs launches the hybrid agent that automatically discovers all instances of the TIBCO Cloud Integration apps associated with the access key and starts streaming logs from all of them to STDOUT. These logs are collected as container logs and forwarded to Fluentd as the container was started with fluentd logging driver. Fluetnd then processes the logs and forwards them to Elasticsearch. You can update fluentd configuration to define how the logs should be processed before storing in Elasticsearch. Please check the fluent.conf file to review the fluentd configuration used in this sample at efk-docker -> fluentd -> conf

The logs will be stored under fluent-<currentdate> indices in Elasticsearch by default. To discover the logs and start creating the visualizations in Kibana you can configure fluentd-* as the index pattern.

**Step 5 (Optional): Configure apps to emit metrics to logs**

TIBCO Cloud Integration allows you to stream the app metrics to logs.

The Develop (Flogo) apps can be configured to emit metrics to logs using system properties: https://integration.cloud.tibco.com/docs/tci/using/using-apps/configuring-apps/configuring-app-properties.html

For the Integrate (BusinessWorks) apps you can use the event subscriber to emit process and actvity events. A sample event subscriber project is provided in the bw-app folder. In order to emit events using this sample, make sure “tibco.bw.sample.application.execution.event.subscriber” project is included in your BusinessWorks application in Studio - 1) in the Module dependencies of the application module (under Dependencies tab) and 2) in the application (under Includes tab)

You can refer to the Petstore app sample provided to review how the event subcriber project can be included in a BusinessWorks project. 
