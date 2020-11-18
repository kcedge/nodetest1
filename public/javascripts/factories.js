/**
 * UserDataService: service for storing form data and form data functions
 */
(function() {
    'use strict';

    angular.module('myApp').factory('UserDataService', UserDataService);

    UserDataService.$inject = [ '$log' ];

    function UserDataService($log) {

        var vm = this, data = {};
        // initializer
        (function init() {
            $log.debug("UserDataService.init()");
        })();

        // list of callable members of service
        var service = {
            getFormData : getFormData,
            setFormData : setFormData,
            removeBlankSelectionValues : removeBlankSelectionValues,
            orderBLMOfficeList : orderBLMOfficeList,
            validateEmail : validateEmail
        };

        return service;

        // ========================================================================

        // get form data
        function getFormData() {
            return data;
        }

        // set form data
        function setFormData(newData) {
            if (angular.isDefined(newData) && angular.isObject(newData)) {
                // changed to use merge because copy did not retain previous
                // datas sub-elements
                // angular.copy(newData, data);
                angular.merge(data, newData)
            } // else leave data unchange
        }

        // set Federal / Indian properties if passed "FEDERAL" or "INDIAN"
        function setFederalIndian(federalOrIndian) {
            if (federalOrIndian == "INDIAN") {
                // if property initialized
                if (data.hasOwnProperty("federalIndian")) {
                    // if already selected
                    if (data.federalIndian.indexOf('IND') > -1) {
                        // indian unselected
                        data.containsIndian = false;
                        // clear confidential question
                        data.keepConfidential = "";
                    } else {
                        // indian selected
                        data.containsIndian = true;
                        // set keep confidential question to y
                        data.keepConfidential = "Y";
                    }
                }
            } else if (federalOrIndian == "FEDERAL") {
                if (data.hasOwnProperty("federalIndian")) {
                    if (data.federalIndian.indexOf('FED') > -1) {
                        // federal unselected
                        data.containsFed = false;
                    } else {
                        // federal selected
                        data.containsFed = true;
                        // set first lease pen question to fed
                        // data.firstLeasePen = "FED";
                    }
                }
            }
        }

        function removeBlankSelectionValues(selectionValueArray) {
            if (selectionValueArray == null) {
                return;
            }
            var i = selectionValueArray.length
            while (i--) {
                if (selectionValueArray[i].value == null) {
                    selectionValueArray.splice(i, 1);
                }
            }
        }

        function orderBLMOfficeList(list) {
            list.sort(function(a, b) {
                if (a.value < b.value)
                    return -1;
                if (a.value > b.value)
                    return 1;
                return 0;
            });
            var testI = list.findIndex(function(a) {
                return a.value === "TEST OFFICE";
            })
            // splic off add on end
            if (testI >= 0) {
                var testOffice = list.splice(testI, 1);
                list.push(testOffice[0]);
            }

            return list;
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

    }
})();
// Create the factory that share the Fact
// myApp.factory('UserFactory', function () {


//     return data{
//         getUser: getUser,
//         setUser: setUser
//     },
//         getUser : function () {
//             return this.user;
//         }

//     var setUser = function (user) {
//         vm.user = user;
//         this.user = user;
//     }

// });