#!/bin/sh
SCRIPT_DIR=`dirname $0`
cd $SCRIPT_DIR

. inc/common.sh

runtest "util_test"
