#!/bin/bash
echo "TIBCO Cloud Integration Toolbox"
./tibagent --version
echo "========================="
echo "Configuring tibagent"
echo "========================="
echo ""
echo ""
# Log in and configure the agent
./tibagent login -u "$USER" -p "$PASSWORD" -o "$ORG" -r "$REGION"
./tibagent configure agent $AGENT_NAME
# Configure the agent profile with the access key secret
./tibagent configure connect -a $KEY -s $SECRET $AGENT_NAME
# Start streaming app logs
./tibagent start agent --logStream $AGENT_NAME
