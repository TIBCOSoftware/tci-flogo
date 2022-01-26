# Smart Contract Automation - Slack Integration
![image]()

## Prerequisites
* Valid subscription to TIBCO Cloud Integration
* Valid subscription to TIBCO Cloud Spotfire
* Valid subscription to Slack workspace
* Valid subscription to Heroku platform

## Introduction
The Smart Contract Automation is a 100% Cloud solution with a simple yet efficient conversational bot interface offering endless benefits, especially the less-tapped legal departments that are looking to streamline the contract management process.
Some of the benefits includes:
● A one-stop 100% Cloud-based solution for the lifecycle of a Contract
Management process.
● Artificial Intelligence (AI) based approach to identify and assign the contract type.
● Simplified User-experience through a Slack bot responding to anyone, anywhere.
● Powerful Visual Analytics empowered by Data Science.

## Overview

To begin, this solution offers a conversational Slack Bot interactive experience to initiate the contract translation process and uses TIBCO CloudTM Integration as a backbone to manage and monitor all the slack interactions and interactions with third-party translation API. The TIBCO CloudTM Integration receives and responds to the slack events with appropriate responses/messages using slack ReST & interactive APIs. This allows Slack Bot to promote interactive behavior where you can select from different options available.

The user will upload the contract document to Slack along with selecting the appropriate target translation language in which the document will be translated. Once a document is uploaded, TIBCO CloudTM Integration will detect the event and it will send the Contract to translation. With TIBCO CloudTM LiveApps - it will manage the document translation lifecycle. TIBCO CloudTM Spotfire generates the real-time visualizations of all these correlated events seen below,
![image]()
![image]()
![image]()

# Solution Design
This solution demonstrates end-to-end real-time data integration between interactive Slack Bot, TIBCO cloud automate - managing contract lifecycle, AI/ML modules and visual analytics features using TIBCO's Connect and Predict capabilities.

## Architecture Overview
![image]()

As illustrated in the Architecture Diagram (above), this solution:
● Offers the Interactive Slack Bot interface to interact with the end user.
● Uses the Develop capability, powered by Flogo, of TIBCO CloudTM Integration (TCI Flogo) to interact with users using slack apis (acts as backend for slack), extract the user choices, files & contents and pass them for further processing - Ex. retrieve the contract from slack interaction, send that to translation, store &
retrieve it pre & post translation on secured location (Gdrive), etc.
● The Automate (previously known as Liveapps) capability of TIBCO CloudTM Integration comes into picture as soon as the contract is sent for translation. The various stages of the contract translation process are managed and maintained here.
● TIBCO CloudTM Spotfire which displays visual analytics based on the data fetched from Automate APIs which manages the contract translation lifecycle.
● The Case Manager Workflow - our custom tailored UX solution for the seamless interaction with contract translation process to review and approve the translated contract.

# Solution Demo
![image]()

# Steps to setup the Solution
Let's Get Started





