/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
const expect = require('chai').expect;
const spawnSync = require('child_process').spawnSync;
const config = require('../config/config.json');
const fs = require('fs-extra');
const path = require('path');

/**
 * Constants
 */
const node = 'node';
const test_dir = './testapp';

describe('end user scenario', function () {
    this.slow(10000);

    before(function() {
        // Make sure there is an empty test folder
        fs.removeSync(test_dir);
        fs.ensureDirSync(test_dir);
        fs.ensureDirSync(path.join(test_dir,'sdk'));
    });

    it('should download and unzip the SDK', () => {
        var result = spawnSync('node', ['tibcli-wi-sdk', 'get', '--location', path.join(test_dir,'sdk')], { encoding: 'utf-8' });
        expect(fs.existsSync(test_dir + '/sdk/wi-runtime.tar.gz')).to.be.true;
        expect(fs.existsSync(test_dir + '/sdk/wi-studio.tar.gz')).to.be.true;
        expect(fs.existsSync(test_dir + '/sdk/runtime/flogo-lib/TIBCO LICENSE.txt')).to.be.true;
        expect(fs.existsSync(test_dir + '/sdk/studio/license.txt')).to.be.true;
    });

    it('should initialize a new extension', () => {
        var result = spawnSync('node', ['tibcli-wi-init', '--location', path.join(test_dir,'extension'), '--category', 'mock'], { encoding: 'utf-8' });
        expect(fs.existsSync(test_dir + '/extension/mock')).to.be.true;
    });

    it('should add a new activity', () => {
        var result = spawnSync('node', ['tibcli-wi-add', 'activity', '--location', path.join(test_dir,'extension'), '--category', 'mock', '--name', 'CallMockApp', '--author', 'retgits', '--ver', '1.0.0'], { encoding: 'utf-8' });
        expect(fs.existsSync(test_dir + '/extension/mock/activity/CallMockApp')).to.be.true;
        expect(fs.existsSync(test_dir + '/extension/mock/activity/CallMockApp/activity.json')).to.be.true;
        expect(fs.existsSync(test_dir + '/extension/mock/activity/CallMockApp/activity.go')).to.be.true;
        expect(fs.existsSync(test_dir + '/extension/mock/activity/CallMockApp/activity_test.go')).to.be.true;
    });

    it('should add a new connector', () => {
        var result = spawnSync('node', ['tibcli-wi-add', 'connector', '--location', path.join(test_dir,'extension'), '--category', 'mock', '--name', 'CallMockApp', '--author', 'retgits', '--ver', '1.0.0'], { encoding: 'utf-8' });
        expect(fs.existsSync(test_dir + '/extension/mock/connector/CallMockApp')).to.be.true;
        expect(fs.existsSync(test_dir + '/extension/mock/connector/CallMockApp/connector.json')).to.be.true;
        expect(fs.existsSync(test_dir + '/extension/mock/connector/CallMockApp/connector.ts')).to.be.true;
        expect(fs.existsSync(test_dir + '/extension/mock/connector/CallMockApp/connector.module.ts')).to.be.true;
    });

    it('should build a zip file', () => {
        var result = spawnSync('node', ['tibcli-wi-package', 'connector', '--location', path.join(test_dir,'extension', 'mock'), '--target', test_dir], { encoding: 'utf-8' });
        expect(fs.existsSync(test_dir + '/mock.zip')).to.be.true;
    });

    after(function() {
        fs.removeSync(test_dir);
    });
});