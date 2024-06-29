"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'magicalapi/unknown (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * The API endpoint of the YouTube SEO service.
     *
     * @summary YouTube SEO
     */
    SDK.prototype.youtubeSeo = function (body) {
        return this.core.fetch('/youtube-seo/', 'post', body);
    };
    /**
     * The main API endpoint of the YouTube Top Keywords service which has three fields in the
     * request body.
     *
     * @summary YouTube Top Keywords
     */
    SDK.prototype.youtubeTopKeywords = function (body) {
        return this.core.fetch('/youtube-keywords/', 'post', body);
    };
    /**
     * This endpoint returns a list of countries that are supported in YouTube Top Keywords
     * Service.
     *
     * @summary Countries
     */
    SDK.prototype.countries = function () {
        return this.core.fetch('/youtube-keywords/countries', 'get');
    };
    /**
     * This endpoint returns a list of languages that are supported in YouTube Top Keywords
     * Service.
     *
     * @summary Languages
     */
    SDK.prototype.languages = function () {
        return this.core.fetch('/youtube-keywords/languages', 'get');
    };
    /**
     * The API endpoint of the YouTube Suggestions service.
     *
     * @summary YouTube Suggestions
     */
    SDK.prototype.youtubeSuggestions = function (body) {
        return this.core.fetch('/youtube-suggestions/', 'post', body);
    };
    /**
     * The API endpoint of the Profile Data service.
     *
     * @summary Profile Data
     */
    SDK.prototype.profileData = function (body, metadata) {
        return this.core.fetch('/profile-data/', 'post', body, metadata);
    };
    /**
     * The API endpoint of the Company Data service.
     *
     * @summary Company Data
     */
    SDK.prototype.companyData = function (body, metadata) {
        return this.core.fetch('/company-data/', 'post', body, metadata);
    };
    /**
     * The API endpoint of the Resume Parser service.
     *
     * @summary Resume Parser
     */
    SDK.prototype.resumeParser = function (body, metadata) {
        return this.core.fetch('/resume-parser/', 'post', body, metadata);
    };
    /**
     * The API endpoint of the Resume Review service.
     *
     * @summary Resume Review
     */
    SDK.prototype.resumeReview = function (body) {
        return this.core.fetch('/resume-review/', 'post', body);
    };
    /**
     * The API endpoint of the Resume Score service.
     *
     * @summary Resume Score
     */
    SDK.prototype.resumeScore = function (body) {
        return this.core.fetch('/resume-score/', 'post', body);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
