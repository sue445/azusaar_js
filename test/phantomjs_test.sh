#!/bin/sh
SCRIPT_DIR=`dirname $0`
cd $SCRIPT_DIR

if [ $# -eq 0 ]; then
    phantomjs ../testlib/run_qunit.js file://$PWD/alltests.html
else
    phantomjs ../testlib/run_qunit.js file://$PWD/$1.html
fi
