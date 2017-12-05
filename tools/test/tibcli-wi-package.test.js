/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
const expect = require('chai').expect;
const spawnSync = require('child_process').spawnSync;
const mod = require('../package.json');
const config = require('../config/config.json');

/**
 * Constants
 */
const node = 'node';
const program = 'tibcli-wi-package';

describe('tibcli-wi-package.js', function () {
    this.slow(10000);
    it('should contain the correct functions', () => {
        var result = spawnSync('node', [program, '--help'], { encoding: 'utf-8' });
        expect(result.stdout).to.include(config.commands.package.description);
    });
    it('should fail for unrecognized options', () => {
        var result = spawnSync('node', [program, '--bla'], { encoding: 'utf-8' });
        expect(result.stderr).to.include('unknown option');
        expect(result.stdout).to.include('');
    });
});