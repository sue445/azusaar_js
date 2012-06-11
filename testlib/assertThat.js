(function(window){
    var actual;
    var at = {
        matcher: {
            equalsTo : function(expected){
                at.doAssert(at.format(expected, actual),
                    actual === expected);
            },
            greaterThan : function(expected){
                at.doAssert(at.format("is greater than "+expected, actual),
                    actual > expected);
            },
            greaterThanOrEqualTo : function(expected){
                at.doAssert(at.format("is greater than or equal to "+expected, actual),
                    actual >= expected);
            },
            lessThan : function(expected){
                at.doAssert(at.format("is less than "+expected, actual),
                    actual < expected);
            },
            lessThanOrEqualTo : function(expected){
                at.doAssert(at.format("is less than or equal to "+expected, actual),
                    actual <= expected);
            },
            startsWith : function(expected){
                at.doAssert(at.format("starts with "+expected, actual),
                    actual.indexOf(expected) == 0);
            },
            endsWith : function(expected){
                at.doAssert(at.format("ends with "+expected, actual),
                    actual.indexOf(expected) == actual.length-expected.length);
            },
            contains : function(expected){
                at.doAssert(at.format("contains "+expected, actual),
                    actual.indexOf(expected) >= 0);
            },
            equalsToIgnoringCase : function(expected){
                at.doAssert(at.format("is equal to ignoring case "+expected, actual),
                    actual.toLowerCase() === expected.toLowerCase());
            },
            not : {
                equalsTo : function(expected){
                    at.doAssert(at.format("not " + expected, actual),
                        actual !== expected);
                },
                greaterThan : function(expected){
                    at.doAssert(at.format("is not greater than "+expected, actual),
                        !(actual > expected));
                },
                greaterThanOrEqualTo : function(expected){
                    at.doAssert(at.format("is not greater than or equal to "+expected, actual),
                        !(actual >= expected));
                },
                lessThan : function(expected){
                    at.doAssert(at.format("is not less than "+expected, actual),
                        !(actual < expected));
                },
                lessThanOrEqualTo : function(expected){
                    at.doAssert(at.format("is not less than or equal to "+expected, actual),
                        !(actual <= expected));
                },
                startsWith : function(expected){
                    at.doAssert(at.format("not starts with "+expected, actual),
                        !(actual.indexOf(expected) == 0));
                },
                endsWith : function(expected){
                    at.doAssert(at.format("not ends with "+expected, actual),
                        !(actual.indexOf(expected) == actual.length-expected.length));
                },
                contains : function(expected){
                    at.doAssert(at.format("not contains "+expected, actual),
                        !(actual.indexOf(expected) >= 0));
                },
                equalsToIgnoringCase : function(expected){
                    at.doAssert(at.format("is not equal to ignoring case "+expected, actual),
                        !(actual.toLowerCase() === expected.toLowerCase()));
                }
            }
        },

        format : function(expected, actual){
            return "expected " + expected + ", but actual is " + actual;
        },

        assertThat : function(actual_){
            actual = actual_;
            return {
                is : at.matcher,
                startsWith : at.matcher.startsWith,
                endsWith : at.matcher.endsWith,
                contains : at.matcher.contains,
                not : at.matcher.not
            };
        },

        doAssert : function(message, isSuccess){
            try{
                // for QUnit
                if(QUnit && ok){
                    ok(isSuccess, message);
                    return;
                }
            } catch(e){
            }
            try{
                // for JsTestDriver
                if(jstestdriver && fail){
                    if(!isSuccess){
                        fail(message);
                    }
                    return;
                }
            } catch(e){
            }

            throw new Error("not match all assertion.");
        }
    };

    window.at = at;
})(window);

assertThat = at.assertThat;
