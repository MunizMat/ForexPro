#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { ForexProStack } from '../lib/forexpro-stack';
import { config } from 'dotenv';

config();


const app = new App();
new ForexProStack(app, 'ForexProStack');
