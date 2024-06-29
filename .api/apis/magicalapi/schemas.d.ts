declare const CompanyData: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly company_username: {
                readonly type: "string";
                readonly description: "This item is USERNAME of LinkedIn (https://linkedin.com/company/USERANAME/).";
                readonly default: "magicalapi";
            };
            readonly company_name: {
                readonly type: "string";
                readonly description: "Then name of company.";
                readonly default: "apple";
            };
            readonly company_website: {
                readonly type: "string";
                readonly description: "The website of company.";
                readonly default: "apple.com";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly version: {
                    readonly type: "string";
                    readonly default: "1";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly url: {
                    readonly type: "string";
                    readonly examples: readonly ["https://linkedin.com/company/atlassian/"];
                };
                readonly company_name: {
                    readonly type: "string";
                    readonly examples: readonly ["atlassian"];
                };
                readonly crawled_at: {
                    readonly type: "string";
                    readonly examples: readonly ["30/05/2024 09:50:38"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly examples: readonly ["Atlassian"];
                };
                readonly tagline: {
                    readonly type: "string";
                    readonly examples: readonly ["Tools for teams, from startup to enterprise:\nAtlassian provides tools to help every team unleash their full potential"];
                };
                readonly cover_image_url: {
                    readonly type: "string";
                    readonly examples: readonly ["https://media.licdn.com/dms/image/D4E3DAQGSifFZXCq3PQ/image-scale_191_1128/0/1697721326923/atlassian_cover?e=2147483647&v=beta&t=gMYZwKscOaqOmSXvFYn_e699aln3W54Yi1I1IOSLEhI"];
                };
                readonly logo_url: {
                    readonly type: "string";
                    readonly examples: readonly ["https://media.licdn.com/dms/image/C560BAQH5FOSGbPkisg/company-logo_200_200/0/1654721406036/atlassian_logo?e=2147483647&v=beta&t=2VSPCFJQYAbHFz5H8WPlOoNsR4SrSDaXTcex5RQcbsM"];
                };
                readonly employees: {
                    readonly type: "string";
                    readonly examples: readonly ["23,951 employees"];
                };
                readonly followers: {
                    readonly type: "string";
                    readonly examples: readonly ["1,474,388 followers"];
                };
                readonly about: {
                    readonly type: "string";
                    readonly examples: readonly ["We're a team of 7000+ Atlassians supporting an international group of 250,000+ customers. We build tools like Jira, Confluence, Bitbucket, and Trello to help teams across the world become more nimble, creative, and aligned."];
                };
                readonly website: {
                    readonly type: "string";
                    readonly examples: readonly ["http://www.atlassian.com/"];
                };
                readonly industry: {
                    readonly type: "string";
                    readonly examples: readonly ["Software Development"];
                };
                readonly size: {
                    readonly type: "string";
                    readonly examples: readonly ["5,001-10,000 employees"];
                };
                readonly headquarters: {
                    readonly type: "string";
                    readonly examples: readonly ["Sydney, NSW"];
                };
                readonly organizationType: {
                    readonly type: "string";
                    readonly examples: readonly ["Public Company"];
                };
                readonly foundedOn: {
                    readonly type: "string";
                    readonly examples: readonly ["2002"];
                };
                readonly specialties: {
                    readonly type: "string";
                    readonly examples: readonly ["b2b enterprise software, bug tracker, issue tracker, enterprise wiki, corporate wiki, business wiki, team collaboration, project management, and downtime communication"];
                };
                readonly products: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Bitbucket"];
                            };
                            readonly link: {
                                readonly type: "string";
                                readonly examples: readonly ["https://www.linkedin.com/products/atlassian-bitbucket/?trk=organization_guest_product_card_related-content-card"];
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly examples: readonly ["https://bitbucket.org/product?trk=products_details_guest_secondary_call_to_action"];
                            };
                            readonly about: {
                                readonly type: "string";
                                readonly examples: readonly ["Built for professional teams, Bitbucket is more than just Git code management. Bitbucket gives teams one place to plan projects, collaborate on code, test, and deploy. Get started for free!"];
                            };
                            readonly used_for: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Software Engineer"];
                                };
                            };
                            readonly customers: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://linkedin.com/company/dropbox?trk=products_details_guest_organization_image"];
                                };
                            };
                        };
                    };
                };
                readonly locations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly examples: readonly ["Level 6/341 George St Sydney, NSW 2000, AU"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Countries: {
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Languages: {
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ProfileData: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly profile_name: {
                readonly type: "string";
                readonly description: "This item is USERNAME of LinkedIn (https://linkedin.com/in/USERANAME/).";
                readonly default: "williamhgates";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly version: {
                    readonly type: "string";
                    readonly default: "1";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly url: {
                    readonly type: "string";
                    readonly examples: readonly ["https://linkedin.com/in/conanobrien/"];
                };
                readonly profile: {
                    readonly type: "string";
                    readonly examples: readonly ["conanobrien"];
                };
                readonly crawled_at: {
                    readonly type: "string";
                    readonly examples: readonly ["30/03/2024 20:57:21"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly examples: readonly ["Conan O'Brien"];
                };
                readonly description: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
                readonly location: {
                    readonly type: "string";
                    readonly examples: readonly ["Burbank, California, United States"];
                };
                readonly followers: {
                    readonly type: "string";
                    readonly examples: readonly ["418K followers"];
                };
                readonly connections: {
                    readonly type: "string";
                    readonly examples: readonly ["500+ connections"];
                };
                readonly experience: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly image_url: {};
                            readonly title: {};
                            readonly company_name: {
                                readonly type: "string";
                                readonly examples: readonly ["Conan"];
                            };
                            readonly company_link: {
                                readonly type: "string";
                                readonly examples: readonly ["https://www.linkedin.com/company/conan"];
                            };
                            readonly date: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly start_date: {};
                                    readonly end_date: {};
                                    readonly duration: {};
                                };
                            };
                            readonly location: {};
                            readonly description: {};
                        };
                    };
                };
                readonly education: {
                    readonly type: "array";
                    readonly items: {};
                };
                readonly certifications: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly image_url: {
                                readonly type: "string";
                                readonly examples: readonly ["https://static.licdn.com/aero-v1/sc/h/cs8pjfgyw96g44ln9r7tct85f"];
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["Minister"];
                            };
                            readonly course_link: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly issuer: {
                                readonly type: "string";
                                readonly examples: readonly ["Universal Life Church"];
                            };
                            readonly credential: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly issued_date: {
                                readonly type: "string";
                                readonly examples: readonly ["Nov 2011"];
                            };
                        };
                    };
                };
                readonly languages: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["English"];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly examples: readonly ["Native or bilingual proficiency"];
                            };
                        };
                    };
                };
                readonly volunteerings: {
                    readonly type: "array";
                    readonly items: {};
                };
                readonly publications: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["Chicago Sun-Times"];
                            };
                            readonly publisher: {
                                readonly type: "string";
                                readonly examples: readonly ["August 14, 1986"];
                            };
                            readonly publication_link: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly publication_date: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly examples: readonly ["Classified ad for used humidifier."];
                            };
                        };
                    };
                };
                readonly projects: {
                    readonly type: "array";
                    readonly items: {};
                };
                readonly courses: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Build Wealth by Suing Donald Trump Over Failure to Build Wealth"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly examples: readonly ["Online"];
                            };
                        };
                    };
                };
                readonly honors_and_awards: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["Oscar for Best Performance by an Actress in a Supporting Role"];
                            };
                            readonly issuer: {
                                readonly type: "string";
                                readonly examples: readonly ["-"];
                            };
                            readonly issued_date: {
                                readonly type: "string";
                                readonly examples: readonly ["Feb 2008"];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly examples: readonly ["for: Michael Clayton (2007)"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ResumeParser: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "This item is url of PDF/DOC/DOCX resume file (https://PATH/file.pdf).";
                readonly default: "https://PATH/file.pdf";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly version: {
                    readonly type: "string";
                    readonly default: "1";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly basic: {
                            readonly type: "object";
                            readonly properties: {
                                readonly first_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Richard"];
                                };
                                readonly last_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Levinson"];
                                };
                                readonly email: {
                                    readonly type: "string";
                                    readonly examples: readonly ["rlevinson@yahoo.com"];
                                };
                                readonly phone_number: {
                                    readonly type: "string";
                                    readonly examples: readonly ["817-466-0015"];
                                };
                                readonly location: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Fort Worth, Texas"];
                                };
                                readonly portfolio_website_url: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly linkedin_url: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly github_url: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly university: {
                                    readonly type: "string";
                                    readonly examples: readonly ["University of California"];
                                };
                                readonly graduation_year: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly majors: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Health Administration"];
                                };
                            };
                        };
                        readonly summary: {
                            readonly type: "string";
                            readonly examples: readonly ["Highly qualified, resourceful management professional with year-over-year success in improving team capabilities, meeting international deployment objectives, developing and executing strategic plans, and raising funds for key programs. Strong communicator, advocate, counselor, and relationship developer."];
                        };
                        readonly work_experiences: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Department Head"];
                                    };
                                    readonly company: {
                                        readonly type: "string";
                                        readonly examples: readonly ["United States Navy"];
                                    };
                                    readonly location: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Fort Worth, Texas"];
                                    };
                                    readonly duration: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2005-PRESENT"];
                                    };
                                    readonly summary: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Supervise team of 42, including employees and volunteers. Manage $85,000 operating budget, $145,000 in funding, and $65,000 in annual foundation gifts. Ensure fulfillment of team member’s training and personal development goals, conducting over 65 services and 225 counseling cases. Provided training for over 750 team members, creating training materials and publishing paper that addressed “hot button” issues. Serve as liaison to Fort Worth Air Power Foundation, planning and executing fundraising events for in-need military members. Planning member for various special events."];
                                    };
                                    readonly achievements: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Expanded relief services to members 300% through interaction with Fort Worth Air Power Foundation, raising over $400,000 in relief support."];
                                        };
                                    };
                                };
                            };
                        };
                        readonly project_experiences: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly educations: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly school: {
                                        readonly type: "string";
                                        readonly examples: readonly ["University of California"];
                                    };
                                    readonly degree: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Master's Degree"];
                                    };
                                    readonly field: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly start: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly end: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                };
                            };
                        };
                        readonly certifications: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Lean Six Sigma Green Belt Certified"];
                                    };
                                    readonly provider: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                };
                            };
                        };
                        readonly languages: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly skills: {
                            readonly type: "array";
                            readonly items: {};
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                    };
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ResumeReview: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "This item is url of PDF/DOC/DOCX resume file (https://PATH/file.pdf).";
                readonly default: "https://PATH/file.pdf";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly score: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [87];
                };
                readonly result: {
                    readonly type: "object";
                    readonly properties: {
                        readonly contact: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Contact information includes a phone number for easy reachability."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["No LinkedIn profile linked.\n<b>Tip:</b> Provide a LinkedIn URL to showcase a broader professional network and background.\n"];
                                    };
                                };
                            };
                        };
                        readonly experiences: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Job titles in the experience section are clearly defined."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                        readonly educations: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Field of study is clearly indicated in the education section."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                        readonly skills: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Skills are listed, highlighting competencies and strengths."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                        readonly summary: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["A professional summary/objective is present, giving a career overview."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                        readonly format: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["PDF is a good format to share your resume."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Resume is too lengthy.\n<b>Tip:</b> Condense your resume to one page, focusing on the most relevant and recent experiences.\n"];
                                    };
                                };
                            };
                        };
                    };
                };
                readonly details: {
                    readonly type: "object";
                    readonly properties: {
                        readonly basic: {
                            readonly type: "object";
                            readonly properties: {
                                readonly first_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Michael"];
                                };
                                readonly last_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Pittsfield"];
                                };
                                readonly email: {
                                    readonly type: "string";
                                    readonly examples: readonly ["mpittsfield@rrmail.com"];
                                };
                                readonly phone_number: {
                                    readonly type: "string";
                                    readonly examples: readonly ["(111) 222- 3333"];
                                };
                                readonly location: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Orlando, FL"];
                                };
                                readonly portfolio_website_url: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly linkedin_url: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly github_url: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly university: {
                                    readonly type: "string";
                                    readonly examples: readonly ["AA University"];
                                };
                                readonly graduation_year: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2012"];
                                };
                                readonly majors: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Criminal Justice"];
                                };
                            };
                        };
                        readonly summary: {
                            readonly type: "string";
                            readonly examples: readonly ["Highly accomplished and result-oriented executive with substantial experience in directing all aspects of RCM, driving company sales, and earning customer satisfaction at high-growth organizations. Proven track record of maximizing sales opportunities, overseeing billing procedures, and delivering coaching leadership towards work excellence. Adept at maintaining a broad knowledge of products, competitors, and general markets to ensure business superiority and satisfy sales goals. Capable of conducting one-on-one consultations with clients to develop fitness plans. Demonstrated success in working well under pressure, quickly learning job functions, and effectively handling various tasks while remaining detail-oriented. Possess strong expertise in prioritizing tasks, adapting to the challenging environment, and meeting stringent deadlines."];
                        };
                        readonly work_experiences: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["RCM Sales Executive"];
                                    };
                                    readonly company: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ABC Company"];
                                    };
                                    readonly location: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Orlando, FL"];
                                    };
                                    readonly duration: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly years: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [1];
                                            };
                                            readonly months: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [0];
                                            };
                                        };
                                    };
                                    readonly summary: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Conduct market research to identify selling opportunities and evaluate customer needs. Augment company revenues by formulating top-notch plans and processes for Sales operations. Prepare thorough sales performance reports by gathering data and tracking sales records. Collaborate with vendors and clients to successfully negotiate contracts in a win-win situation. Build strong rapport by collaborating and facilitating sales managers weekly on a professional basis. Maximize company customer base by delivering detailed presentations, conducting meetings, and networking with new and potential clients. Develop a high performing workforce by providing professional development guidance to employees toward work excellence and goals realization."];
                                    };
                                    readonly achievements: {};
                                };
                            };
                        };
                        readonly project_experiences: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly educations: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly school: {
                                        readonly type: "string";
                                        readonly examples: readonly ["AA University"];
                                    };
                                    readonly degree: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Bachelor of Science"];
                                    };
                                    readonly field: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Criminal Justice"];
                                    };
                                    readonly start: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly year: {};
                                        };
                                    };
                                    readonly end: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly year: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [2012];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly certifications: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Certified WRSC Strength and Conditioning Coach"];
                                    };
                                    readonly provider: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                };
                            };
                        };
                        readonly languages: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly skills: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Sales Operation Management"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ResumeScore: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "This item is url of PDF/DOC/DOCX resume file (https://PATH/file.pdf).";
                readonly default: "https://PATH/file.pdf";
            };
            readonly job_description: {
                readonly type: "string";
                readonly description: "Job description text for matching with resume file. This item should be between 5 to 500 characters.";
                readonly default: "Sales Professional";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly score: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [7];
                        };
                        readonly reason: {
                            readonly type: "string";
                            readonly examples: readonly ["The candidate has a strong background in sales operations, revenue cycle management, and business development, which align well with the Sales Professional position. However, there is no specific mention of direct sales experience or achievements."];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                    };
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const YoutubeSeo: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly video_url: {
                readonly type: "string";
                readonly description: "URL of video on YouTube.";
                readonly default: "https://www.youtube.com/watch?v=PZZI1QXlM80";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly score: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [46];
                };
                readonly result: {
                    readonly type: "object";
                    readonly properties: {
                        readonly title: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Title length is within the optimal range, enhancing visibility and engagement."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["No relevant keywords found in the title. \n<b>Tip:</b> Incorporate at least one significant keyword in your video title to improve SEO. This makes your video more likely to be discovered by your target audience.\n"];
                                    };
                                };
                            };
                        };
                        readonly description: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Your description's length is ideal, providing ample context for viewers and search engines."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Title not repeated in the description.\n<b>Tip:</b> Incorporate your video's title within the description to strengthen SEO. This repetition can help with search engine relevance.\n"];
                                    };
                                };
                            };
                        };
                        readonly tags: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Tag usage is outside the optimal range.\n<b>Tip:</b> Ensure your video includes at least 5 relevant tags to balance discoverability with focus.\n"];
                                    };
                                };
                            };
                        };
                        readonly video_quality: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Video is in HD, ensuring a high-quality viewing experience."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                        readonly comments: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Engagement with viewers demonstrated by hearting comments."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                        readonly thumbnail: {
                            readonly type: "object";
                            readonly properties: {
                                readonly pros: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["The Thumbnail is high-resolution, making your video more appealing and likely to be clicked."];
                                    };
                                };
                                readonly cons: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                    };
                };
                readonly details: {
                    readonly type: "object";
                    readonly properties: {
                        readonly kind: {
                            readonly type: "string";
                            readonly examples: readonly ["youtube#videoListResponse"];
                        };
                        readonly etag: {
                            readonly type: "string";
                            readonly examples: readonly ["dMya8POAnGaC_CkvoXRttpecmXc"];
                        };
                        readonly items: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly kind: {
                                        readonly type: "string";
                                        readonly examples: readonly ["youtube#video"];
                                    };
                                    readonly etag: {
                                        readonly type: "string";
                                        readonly examples: readonly ["gXbJW6X4O8bSGIc92RfK70R3BcM"];
                                    };
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["PZZI1QXlM80"];
                                    };
                                    readonly snippet: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly title: {
                                                readonly type: "string";
                                                readonly examples: readonly ["#MicrosoftEvent in less than 2 minutes | September 21, 2023"];
                                            };
                                            readonly description: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Enter the new era of AI with Copilot for Microsoft. See event announcements from Bing, Edge, Microsoft 365, Surface and Windows. Hear from Satya Nadella and other leaders from Microsoft about our commitment to providing technology to empower every person and organization on the planet achieve more. We're excited to discover what you'll do with these new capabilities.\n\nWatch the full event: https://youtu.be/XYUEQ0SyOyE\n\nSubscribe to Microsoft on YouTube here: https://aka.ms/SubscribeToYouTube\r\n\r\nFollow us on social: \r\nLinkedIn: https://www.linkedin.com/company/microsoft/ \r\nTwitter: https://twitter.com/Microsoft\r\nFacebook: https://www.facebook.com/Microsoft/ \r\nInstagram: https://www.instagram.com/microsoft/ \r\n \r\nFor more about Microsoft, our technology, and our mission, visit https://aka.ms/microsoftstories"];
                                            };
                                            readonly publishedAt: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2023-09-21T23:41:47Z"];
                                            };
                                            readonly channelId: {
                                                readonly type: "string";
                                                readonly examples: readonly ["UCFtEEv80fQVKkD4h1PF-Xqw"];
                                            };
                                            readonly thumbnails: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly default: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly url: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["https://i.ytimg.com/vi/PZZI1QXlM80/default.jpg"];
                                                            };
                                                            readonly width: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [120];
                                                            };
                                                            readonly height: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [90];
                                                            };
                                                        };
                                                    };
                                                    readonly medium: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly url: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["https://i.ytimg.com/vi/PZZI1QXlM80/mqdefault.jpg"];
                                                            };
                                                            readonly width: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [320];
                                                            };
                                                            readonly height: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [180];
                                                            };
                                                        };
                                                    };
                                                    readonly high: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly url: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["https://i.ytimg.com/vi/PZZI1QXlM80/hqdefault.jpg"];
                                                            };
                                                            readonly width: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [480];
                                                            };
                                                            readonly height: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [360];
                                                            };
                                                        };
                                                    };
                                                    readonly standard: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly url: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["https://i.ytimg.com/vi/PZZI1QXlM80/sddefault.jpg"];
                                                            };
                                                            readonly width: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [640];
                                                            };
                                                            readonly height: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [480];
                                                            };
                                                        };
                                                    };
                                                    readonly maxres: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly url: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["https://i.ytimg.com/vi/PZZI1QXlM80/maxresdefault.jpg"];
                                                            };
                                                            readonly width: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [1280];
                                                            };
                                                            readonly height: {
                                                                readonly type: "integer";
                                                                readonly default: 0;
                                                                readonly examples: readonly [720];
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            readonly channelTitle: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Microsoft"];
                                            };
                                            readonly tags: {
                                                readonly type: "array";
                                                readonly items: {};
                                            };
                                            readonly categoryId: {
                                                readonly type: "string";
                                                readonly examples: readonly ["28"];
                                            };
                                            readonly liveBroadcastContent: {
                                                readonly type: "string";
                                                readonly examples: readonly ["none"];
                                            };
                                            readonly defaultAudioLanguage: {
                                                readonly type: "string";
                                                readonly examples: readonly ["en"];
                                            };
                                        };
                                    };
                                    readonly contentDetails: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly definition: {
                                                readonly type: "string";
                                                readonly examples: readonly ["hd"];
                                            };
                                            readonly duration: {
                                                readonly type: "string";
                                                readonly examples: readonly ["PT1M50S"];
                                            };
                                        };
                                    };
                                    readonly statistics: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly viewCount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [1489789];
                                            };
                                            readonly likeCount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [1543];
                                            };
                                            readonly favoriteCount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [0];
                                            };
                                            readonly commentCount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [80];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const YoutubeSuggestions: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly prompt_sentence: {
                readonly type: "string";
                readonly description: "This item should be minimum 10 characters and maximum 500 characters.";
            };
            readonly suggestion_goal: {
                readonly type: "string";
                readonly description: "This item can be one of this items: \"description\", \"title\", \"hashtag\"";
            };
            readonly count: {
                readonly type: "string";
                readonly description: "This item for \"description\" should be between 1 to 3, for \"title\" should be between 2 to 10 and for \"hashtag\" should be between 5 to 20.";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly title: "Descriptions";
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly captions: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Learn how to start and build a profitable Shopify store from scratch with this comprehensive tutorial! In this step-by-step video guide, we'll cover everything you need to know about setting up your online store, selecting the right products, optimizing your website for conversions, and implementing effective marketing strategies. Discover the secrets to finding winning products, sourcing suppliers, and managing inventory seamlessly. Dive into the world of Shopify themes and apps to enhance your store's functionality and aesthetics. Unleash the power of social media marketing, email campaigns, and influencer collaborations to drive traffic and boost sales. With expert tips on search engine optimization (SEO) and customer retention techniques, you'll gain the knowledge to achieve long-term success in the competitive e-commerce landscape. Don't miss out on this opportunity to create a profitable Shopify store with proven strategies that work!"];
                                };
                            };
                        };
                    };
                    readonly usage: {
                        readonly type: "object";
                        readonly properties: {
                            readonly credits: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [-9];
                            };
                        };
                    };
                };
            }, {
                readonly title: "Titles";
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly titles: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["5 Proven Strategies for Building a Profitable Shopify Store"];
                                };
                            };
                        };
                    };
                    readonly usage: {
                        readonly type: "object";
                        readonly properties: {
                            readonly credits: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [10];
                            };
                        };
                    };
                };
            }, {
                readonly title: "Hashtags";
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly hashtags: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["#ShopifyTips"];
                                };
                            };
                        };
                    };
                    readonly usage: {
                        readonly type: "object";
                        readonly properties: {
                            readonly credits: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [9];
                            };
                        };
                    };
                };
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["ddc4a15b-9f33-47c1-893c-efc1a9613587"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [50];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const YoutubeTopKeywords: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly search_sentence: {
                readonly type: "string";
                readonly description: "This item should be minimum 3 and maximum 50 characters.";
            };
            readonly country: {
                readonly type: "string";
                readonly description: "This item is code of one country from Get Countries request.";
            };
            readonly language: {
                readonly type: "string";
                readonly description: "This item is code of one language from Get Languages request.";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly request_id: {
                            readonly type: "string";
                            readonly examples: readonly ["37d88fe6-caf9-47d7-858b-5b8eb6edd275"];
                        };
                    };
                };
                readonly usage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly credits: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [30];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { CompanyData, Countries, Languages, ProfileData, ResumeParser, ResumeReview, ResumeScore, YoutubeSeo, YoutubeSuggestions, YoutubeTopKeywords };
