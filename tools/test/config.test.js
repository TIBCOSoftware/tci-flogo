/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

// NPM Modules
const assert = require('chai').assert;
const expect = require('chai').expect;
const fs = require('fs-extra');

// Files
const templates = require('../tibcli-wi-templates');
const mod = require('../package.json');

describe('File & Folder layout', function () {
    it('Config exists', function () {
        expect(fs.existsSync('./config/config.json')).to.be.true;
    });
    it('tibcli-wi-templates.js exists', function () {
        expect(fs.existsSync('tibcli-wi-templates.js')).to.be.true;
    });
    it('tibcli-wi-add.js exists', function () {
        expect(fs.existsSync('tibcli-wi-add.js')).to.be.true;
    });
    it('tibcli-wi-init.js exists', function () {
        expect(fs.existsSync('tibcli-wi-init.js')).to.be.true;
    });
    it('tibcli-wi-package.js exists', function () {
        expect(fs.existsSync('tibcli-wi-package.js')).to.be.true;
    });
    it('tibcli-wi-sdk.js exists', function () {
        expect(fs.existsSync('tibcli-wi-sdk.js')).to.be.true;
    });
    it('tibcli-wi.js exists', function () {
        expect(fs.existsSync('tibcli-wi.js')).to.be.true;
    });
});

describe('Templates', function () {
    it('connectorTemplate is an object', function () {
        assert.isObject(templates.connectorTemplate)
    });
    it('connectorTypeScriptTemplate is a string', function () {
        assert.isString(templates.connectorTypeScriptTemplate)
    });
    it('connectorTypeScriptModuleTemplate is a string', function () {
        assert.isString(templates.connectorTypeScriptModuleTemplate)
    });
    it('activityTemplate is an object', function () {
        assert.isObject(templates.activityTemplate)
    });
    it('activityGoTemplate is a string', function () {
        assert.isString(templates.activityGoTemplate)
    });
    it('activityTestGoTemplate is a string', function () {
        assert.isString(templates.activityTestGoTemplate)
    });
    it('activityTypeScriptModuleTemplate is a string', function () {
        assert.isString(templates.activityTypeScriptModuleTemplate)
    });
    it('activityTypeScriptTemplate is a string', function () {
        assert.isString(templates.activityTypeScriptTemplate)
    });
});