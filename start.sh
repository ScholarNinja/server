#!/bin/bash

node server.js 2>&1 | tee -a logs/server.log
