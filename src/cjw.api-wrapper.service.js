/**
 * MIT License

 Copyright (c) [2017] [Christopher Weight (chrisweight.com)]

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

(function () {

    'use strict';

    /**
     * Angular Provider used to set API URL for service.
     */
    function APIUrlProvider() {
        var _url;
        this.setUrl = function (value) {
            _url = value;
        };
        this.$get = function () {
            return {
                url: _url
            };
        };
    }


    /**
     * Main Service Wrapper.
     *
     * @param $log
     * @param $http
     * @param $cacheFactory
     * @param $q
     * @param apiUrl
     */
    function APIWrapperService($log, $http, $cacheFactory, $q, apiUrl) {

        // Faux enum
        var _methods = {
            GET: 'GET',
            POST: 'POST',
            DELETE: 'DELETE',
            PUT: 'PUT'
        };

        var _url = apiUrl.url,
            service = {};

        function formatDefaultHeaders(headers) {
            var _formatted = headers || {};

            // Ensure we set utf-8 here to deal with extended ASCII characters in i18n scenarios,
            // amongst other things. For most REST APIs, this is quite useful.
            // NOTE: Consider allowing Base64 here too?
            _formatted['Content-Transfer-Encoding'] = 'utf-8';

            return _formatted;
        }

        function purge(method, endpoint, params) {
            var httpCache = $cacheFactory.get('$http'),
                getParams = '';

            // NOTE: For GET requests, if we want to clear the cache, make sure we append any params here to
            //       create the full GET Url path, otherwise we never
            //       clear the cache properly
            if (method === _methods.GET && !!params) {
                getParams = '?';
                for (var key in params) {
                    getParams = getParams + key + '=' + params[key];
                }
            }

            var _finalUrl = _url + endpoint + getParams;

            $log.debug('purge() -> ' + _finalUrl);

            httpCache.remove(_finalUrl);
        }

        function query(method, endpoint, params, headers, clearCache) {
            $log.debug({
                'method': method,
                'endpoint': endpoint,
                'params': params,
                'headers': headers,
                'clearCache': clearCache
            });

            var deferred = $q.defer();

            if (_url === undefined || _url === null) {
                deferred.reject("APIWrapperService.query() -> NO API Url Set!");
            }

            if (clearCache === true) {
               purge(method, endpoint, params);
            }

            var config = {
                method: method,
                url: _url + endpoint,
                cache: true,
                headers: headers
            };

            if (method == _methods.GET) {
                config.params = params;
            } else {
                config.data = params;
            }

            $http(config)
                .then(
                    function (response) {
                        return deferred.resolve(response.data);
                    },
                    function (error) {
                        $log.error('CJWAPIWrapperService.query() -> ', config, endpoint, 'clearCache:', clearCache, 'error:', error);
                        return deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        // Public API
        //

        service.get = function (endpoint, params, headers, clearCache) {
            return query(_methods.GET, endpoint, params, formatDefaultHeaders(headers), clearCache || false);
        };

        service.post = function (endpoint, params, headers, clearCache) {
            return query(_methods.POST, endpoint, params, formatDefaultHeaders(headers), clearCache || false);
        };

        service.delete = function (endpoint, params, headers, clearCache) {
            var _headers = formatDefaultHeaders(headers);

            // NOTE: This is a hack: if we want to include a request body with a DELETE request, we need
            // to amend or add the Content-Type header to try and allow this (this will only work if the
            // server allows this type of DELETE)
            if (!!params) {
                _headers['Content-Type'] = 'application/json;charset=utf-8';
            }

            return query(_methods.DELETE, endpoint, params, _headers, clearCache || false);
        };

        service.put = function (endpoint, params, headers, clearCache) {
            return query(_methods.PUT, endpoint, params, formatDefaultHeaders(headers), clearCache || false);
        };

        service.url = function () {
            return _url;
        };

        return service;
    }

    angular
        .module('cjwApiWrapper', [])
        .provider('apiUrl', [APIUrlProvider])
        .factory('apiWrapper', ['$log', '$http', '$cacheFactory', '$q', 'apiUrl', APIWrapperService])
    ;

})();
