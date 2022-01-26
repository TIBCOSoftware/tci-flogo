# Contract Translation Automation - Slack Integration
<p align="center">
<img width="560" alt="slack_integration_TIBCO" src="https://user-images.githubusercontent.com/79621490/151149485-e403c17d-06a3-4f1b-96fc-d26b01edde82.png">
</p>


## Prerequisites
* Valid subscription to TIBCO Cloud™  Integration
* Valid subscription to TIBCO Cloud™  Spotfire
* Valid subscription to Slack workspace
* Valid subscription to Heroku platform _(optional, required if you want to use AI/ML contract classifer API)_

## Introduction
The Smart Contract Automation is a 100% Cloud solution with a simple yet efficient conversational bot interface offering endless benefits, especially the less-tapped legal departments that are looking to streamline the contract management process.
Some of the benefits includes:
- A one-stop 100% Cloud-based solution for the lifecycle of a Contract Management process.
- Artificial Intelligence (AI) based approach to identify and assign the contract type.
- Simplified User-experience through a Slack bot responding to anyone, anywhere.
- Powerful Visual Analytics empowered by Data Science.

## Overview

To begin, this solution offers a conversational Slack Bot interactive experience to initiate the contract translation process and uses TIBCO Cloud™ Integration as a backbone to manage and monitor all the slack interactions and interactions with third-party translation API. The TIBCO Cloud™ Integration receives and responds to the slack events with appropriate responses/messages using slack ReST & interactive APIs. This allows Slack Bot to promote interactive behavior where you can select from different options available.

The user will upload the contract document to Slack along with selecting the appropriate target translation language in which the document will be translated. Once a document is uploaded, TIBCO Cloud™ Integration will detect the event and it will send the Contract to translation. With TIBCO Cloud™ LiveApps - it will manage the document translation lifecycle. TIBCO Cloud™ Spotfire generates the real-time visualizations of all these correlated events seen below,

<img width="1213" alt="TCI_flogo_flows" src="https://user-images.githubusercontent.com/79621490/151149128-7f375d01-8c97-4c37-829b-585aed4f31ea.png">


<img width="1200" alt="TC_Spotfire_DS" src="https://user-images.githubusercontent.com/79621490/151149180-a9a30d1a-2031-45cc-8df2-465e80526a0c.png">


# Solution Design
This solution demonstrates end-to-end real-time data integration between interactive Slack Bot, TIBCO Cloud™ Automate - managing contract lifecycle, AI/ML modules and visual analytics features using TIBCO's Connect and Predict capabilities.

## Architecture Overview

<img width="1316" alt="architecture_overview" src="https://user-images.githubusercontent.com/79621490/151150000-45450233-b169-42fc-bdc2-a70af5554a01.png">



As illustrated in the Architecture Diagram (above), this solution:
- Offers the Interactive Slack Bot interface to interact with the end user.
- Uses the Develop capability, powered by Flogo, of TIBCO Cloud™ Integration (TCI Flogo) to interact with users using slack apis (acts as backend for slack), extract the user choices, files & contents and pass them for further processing - Ex. retrieve the contract from slack interaction, send that to translation, store & retrieve it pre & post translation on secured location (Gdrive), etc.
- The Automate (previously known as Liveapps) capability of TIBCO Cloud™ Integration comes into picture as soon as the contract is sent for translation. The various stages of the contract translation process are managed and maintained here.
- TIBCO Cloud™ Spotfire which displays visual analytics based on the data fetched from Automate APIs which manages the contract translation lifecycle.
- The Case Manager Workflow - our custom tailored UX solution for the seamless interaction with contract translation process to review and approve the translated contract.


# Solution Demo

https://user-images.githubusercontent.com/79621490/151146889-49d04a63-1691-45b3-9048-a2762a8c4b26.mov




# Steps to setup the Solution
[Let's Get Started](docs/00.md)





