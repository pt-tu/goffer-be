import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * The API endpoint of the YouTube SEO service.
     *
     * @summary YouTube SEO
     */
    youtubeSeo(body?: types.YoutubeSeoBodyParam): Promise<FetchResponse<200, types.YoutubeSeoResponse200> | FetchResponse<201, types.YoutubeSeoResponse201>>;
    /**
     * The main API endpoint of the YouTube Top Keywords service which has three fields in the
     * request body.
     *
     * @summary YouTube Top Keywords
     */
    youtubeTopKeywords(body?: types.YoutubeTopKeywordsBodyParam): Promise<FetchResponse<200, types.YoutubeTopKeywordsResponse200> | FetchResponse<201, types.YoutubeTopKeywordsResponse201>>;
    /**
     * This endpoint returns a list of countries that are supported in YouTube Top Keywords
     * Service.
     *
     * @summary Countries
     */
    countries(): Promise<FetchResponse<200, types.CountriesResponse200>>;
    /**
     * This endpoint returns a list of languages that are supported in YouTube Top Keywords
     * Service.
     *
     * @summary Languages
     */
    languages(): Promise<FetchResponse<200, types.LanguagesResponse200>>;
    /**
     * The API endpoint of the YouTube Suggestions service.
     *
     * @summary YouTube Suggestions
     */
    youtubeSuggestions(body?: types.YoutubeSuggestionsBodyParam): Promise<FetchResponse<200, types.YoutubeSuggestionsResponse200> | FetchResponse<201, types.YoutubeSuggestionsResponse201>>;
    /**
     * The API endpoint of the Profile Data service.
     *
     * @summary Profile Data
     */
    profileData(body?: types.ProfileDataBodyParam, metadata?: types.ProfileDataMetadataParam): Promise<FetchResponse<200, types.ProfileDataResponse200> | FetchResponse<201, types.ProfileDataResponse201>>;
    /**
     * The API endpoint of the Company Data service.
     *
     * @summary Company Data
     */
    companyData(body?: types.CompanyDataBodyParam, metadata?: types.CompanyDataMetadataParam): Promise<FetchResponse<200, types.CompanyDataResponse200> | FetchResponse<201, types.CompanyDataResponse201>>;
    /**
     * The API endpoint of the Resume Parser service.
     *
     * @summary Resume Parser
     */
    resumeParser(body?: types.ResumeParserBodyParam, metadata?: types.ResumeParserMetadataParam): Promise<FetchResponse<200, types.ResumeParserResponse200> | FetchResponse<201, types.ResumeParserResponse201>>;
    /**
     * The API endpoint of the Resume Review service.
     *
     * @summary Resume Review
     */
    resumeReview(body?: types.ResumeReviewBodyParam): Promise<FetchResponse<200, types.ResumeReviewResponse200> | FetchResponse<201, types.ResumeReviewResponse201>>;
    /**
     * The API endpoint of the Resume Score service.
     *
     * @summary Resume Score
     */
    resumeScore(body?: types.ResumeScoreBodyParam): Promise<FetchResponse<200, types.ResumeScoreResponse200> | FetchResponse<201, types.ResumeScoreResponse201>>;
}
declare const createSDK: SDK;
export = createSDK;
