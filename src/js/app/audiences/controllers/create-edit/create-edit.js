let modAudiences = angular.module('modAudiences');

modAudiences.controller('ctrlAudiencesCreateEdit', ['Audiences',
    function(Audiences) {
        let vm = this;

        let saveLock = false;

        let testData = {
            "id": "123-abc-456-def-789",
            "name": "First audience",
            "targeting": {
                "age_max": 64,
                "age_min": 30,
                "app_install_state": "INSTALLED",
                "behaviors": [
                    {
                        "id": "6004386044572",
                        "name": "Android Owners (All)"
                    }
                ],
                "college_years": [
                    1980,
                    1981,
                    1982
                ],
                "locales": [
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                "connections": [],
                "custom_audiences": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "education_majors": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "education_schools": [
                    {
                        "id": "105930651606",
                        "name": "Harvard University"
                    }
                ],
                "education_statuses": [
                    1,
                    2,
                    3
                ],
                "ethnic_affinity": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "excluded_connections": [],
                "excluded_custom_audiences": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "excluded_geo_locations": [],
                "family_statuses": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "friends_of_connections": [],
                "genders": [
                    1,
                    2
                ],
                "generation": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "geo_locations": {
                    "countries": [
                        "US"
                    ],
                    "regions": [
                        {
                            "key": "3847"
                        }
                    ],
                    "cities": [
                        {
                            "key": "2430536",
                            "radius": 12,
                            "distance_unit": "mile"
                        }
                    ],
                    "zips": [
                        {
                            "key": "US:94304"
                        },
                        {
                            "key": "US:00501"
                        }
                    ],
                    "custom_locations": [
                        {
                            "address_string": "1601 Willow Road, Menlo Park, CA",
                            "radius": 5
                        },
                        {
                            "latitude": 36,
                            "longitude": -121,
                            "radius": 5,
                            "distance_unit": "kilometer"
                        }
                    ],
                    "geo_markets": [
                        {
                            "key": "DMA:501",
                            "name": "New York"
                        },
                        {
                            "key": "DMA:543",
                            "name": "Springfield-Holyoke"
                        }
                    ],
                    "location_types": [
                        "recent",
                        "home"
                    ]
                },
                "home_ownership": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "home_type": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "household_composition": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "income": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "industries": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "interested_in": [
                    1,
                    2
                ],
                "interests": [
                    {
                        "id": "6003139266461",
                        "name": "Movies"
                    }
                ],
                "life_events": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "markets": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "moms": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "net_worth": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "office_type": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "page_types": [
                    "desktopfeed",
                    "rightcolumn",
                    "mobilefeed",
                    "instagramstream",
                    "mobileexternal",
                    "home"
                ],
                "politics": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "relationship_statuses": [
                    1,
                    2,
                    3
                ],
                "user_device": [],
                "user_os": [
                    "iOS",
                    "Android"
                ],
                "wireless_carrier": [
                    "Wifi"
                ],
                "work_employers": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "work_positions": [
                    {
                        "id": "123",
                        "name": "Test"
                    }
                ],
                "flexible_spec": [],
                "exclusions": {}
            }
        };

        vm.title = "";

        vm.save = save;

        _init();

        function _init() {
            vm.title = "Create audience";
        }

        function save() {
            let payload = [];

            for(let i=0; i<12; i++) {
                payload.push(angular.copy(testData));
            }
            payload[0].name = "Test 1";payload[0].id = "0";
            payload[1].name = "Test 2";payload[1].id = "1";
            payload[2].name = "Test 3";payload[2].id = "2";
            payload[3].name = "Another";payload[3].id = "3";
            payload[4].name = "Cabbage";payload[4].id = "4";
            payload[5].name = "Justin is super cool!";payload[5].id = "5";
            payload[6].name = "I lied.";payload[6].id = "6";
            payload[7].name = "...this is really lame";payload[7].id = "7";
            payload[8].name = "Yay!";payload[8].id = "8";
            payload[9].name = "Mad?";payload[9].id = "9";
            payload[10].name = "MAD?!?!";payload[10].id = "10";
            payload[11].name = "MAD?!?!?!?!?!?!?";payload[11].id = "11";
            if(!saveLock) {
                saveLock = true;
                Audiences.remove().then(deleted => {
                    Audiences.create(payload).then(updated => {
                        saveLock = false;
                    });
                });
            }
        }
    }
]);