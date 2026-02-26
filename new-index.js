(function () {
    'use strict';
    var api = window.SubwayBuilderAPI;
    if (!api) {
        console.error('[danTrains] API not available');
        return;
    }
    const { React, icons, components } = api.utils;
    const { Button, Card, CardContent, Progress, Switch, Label, Input, Badge, Slider } = components;

    const tApi = api.trains;
    const h = h;
    
    const trains = {
        "R211 (NYC)": {
			"id": "R211 (NYC)",
			"name": "R211 (NYC)",
			"description": "The R211 is a subway EMU built by Kawasaki for the NYC Subway's B Division that entered service in 2023.",
			"stats": {
				"maxAcceleration": 1.1,
				"maxDeceleration": 1.3,
				"maxSpeed": 24.7,
				"maxSpeedLocalStation": 14.0,
				"capacityPerCar": 240,
				"carLength": 18.35,
				"minCars": 5,
				"maxCars": 10,
				"carsPerCarSet": 5,
				"carCost": 2780000,
				"trainWidth": 3.05,
				"minStationLength": 187,
				"maxStationLength": 200,
				"baseTrackCost": 50000,
				"baseStationCost": 75000000,
				"trainOperationalCostPerHour": 475.0,
				"carOperationalCostPerHour": 47.5,
				"scissorsCrossoverCost": 15000000,
				"stopTimeSeconds": 35,
				"parallelTrackSpacing": 2.52,
				"trackClearance": 1.21,
				"maxLateralAcceleration": 1.0,
				"minTurnRadius": 80,
				"minStationTurnRadius": 426,
				"maxSlopePercentage": 5.5,
			},
			"elevationMultipliers": {
				"DEEP_BORE": 4.73,
				"STANDARD_TUNNEL": 2.10,
				"CUT_AND_COVER": 1.05,
				"AT_GRADE": 0.30,
				"ELEVATED": 0.82
			},
			"compatibleTrackTypes": ["R211 (NYC)"],
			"appearance": { "color": "#007EC6"},
			"isFixed": false,
			"location": {
				"city": ["New York City"],
				"country": ["United States of America"],
				"continent": ["FALSE"],
			},
			"manufacturer": ["10"],
			"tag": ["Metro"],
			"allowAtGradeRoadCrossing": false,
            "CompatibleTracks": ["std_cdc-1_tra_aar", "std_cdc-2_tra_aar"]
		},
		"R179 (NYC)": {
			"id": "R179 (NYC)",
			"name": "R179 (NYC)",
			"description": "The R179 is a subway EMU built by Bombardier (now Alstom) for the NYC Subway's B Division that entered service in 2019.",
			"stats": {
				"maxAcceleration": 1.1,
				"maxDeceleration": 1.3,
				"maxSpeed": 24.7,
				"maxSpeedLocalStation": 14.0,
				"capacityPerCar": 240,
				"carLength": 18.4,
				"minCars": 4,
				"maxCars": 8,
				"carsPerCarSet": 4,
				"carCost": 2323899,
				"trainWidth": 3.02,
				"minStationLength": 151,
				"maxStationLength": 175,
				"baseTrackCost": 50000,
				"baseStationCost": 75000000,
				"trainOperationalCostPerHour": 475.0,
				"carOperationalCostPerHour": 47.5,
				"scissorsCrossoverCost": 15000000,
				"stopTimeSeconds": 35,
				"parallelTrackSpacing": 2.52,
				"trackClearance": 1.21,
				"maxLateralAcceleration": 1.0,
				"minTurnRadius": 80,
				"minStationTurnRadius": 1698,
				"maxSlopePercentage": 5.5,
			},
			"elevationMultipliers": {
				"DEEP_BORE": 4.73,
				"STANDARD_TUNNEL": 2.10,
				"CUT_AND_COVER": 1.05,
				"AT_GRADE": 0.30,
				"ELEVATED": 0.82
			},
			"compatibleTrackTypes": ["R179 (NYC)"],
			"appearance": { "color": "#A7752A"},
			"isFixed": false,
			"location": {
				"city": ["New York City"],
				"country": ["United States of America"],
				"continent": ["FALSE"],
			},
			"manufacturer": ["8"],
			"tag": ["Metro"],
			"allowAtGradeRoadCrossing": false,
            "CompatibleTracks": ["std_cdc-1_tra_aar", "std_cdc-2_tra_aar"]
		}
    }

    const tracks = {
        "std_cdc-2_tra_ms": {
            "id": "std_cdc-2_tra_ms",
            "name": "DC 600V (GoA2 | TRA | MS)",
            "goa": 2,
            "baseTrackCost": 50000,
            "baseStationCost": 75000000,
            "scissorsCrossoverCost": 15000000,
            "DEEP": 4.11,
            "STD": 1.83,
            "CUT": 0.91,
            "AG": 0.30,
            "EL": 0.77,
            "parallelTrackSpacing": 2.12,
            "trackClearance": 1.01
        },
        "std_cdc-1_tra_ms": {
            "id": "std_cdc-1_tra_ms",
            "name": "DC 600V (GoA2 | TRA | MS)",
            "goa": 1,
            "baseTrackCost": 50000,
            "baseStationCost": 63750000,
            "scissorsCrossoverCost": 15000000,
            "DEEP": 4.11,
            "STD": 1.83,
            "CUT": 0.91,
            "AG": 0.30,
            "EL": 0.77,
            "parallelTrackSpacing": 2.12,
            "trackClearance": 1.01
        }
    }

    var activatedTrains = []; var activatedTracks = []; var trackTypeList = {}; var trackTypeCount = 0;

    function registerTrain(train,track,min,max) {
        const hold = {
            id: track.id,
            name: train.name,
            description: train.description,
            stats: {
                maxAcceleration: train.maxAcceleration,
                maxDeceleration: train.maxDeceleration,
                maxSpeed: train.maxSpeed,
                maxSpeedLocalStation: train.maxSpeedLocalStation,
                capacityPerCar: train.capacityPerCar,
                carLength: train.carLength,
                minCars: train.minCars,
                maxCars: train.maxCars,
                carsPerCarSet: train.carsPerCarSet,
                carCost: train.carCost,
                trainWidth: train.trainWidth,
                minStationLength: min,
                maxStationLength: max,
                baseTrackCost: track.baseTrackCost,
                baseStationCost: track.baseStationCost,
                trainOperationalCostPerHour: train.trainOperationalCostPerHour,
                carOperationalCostPerHour: train.carOperationalCostPerHour,
                scissorsCrossoverCost: track.scissorsCrossoverCost,
                stopTimeSeconds: train.stopTimeSeconds,
				parallelTrackSpacing: track.parallelTrackSpacing,
				trackClearance: track.trackClearance,
				maxLateralAcceleration: train.maxLateralAcceleration,
				minTurnRadius: train.minTurnRadius,
				minStationTurnRadius: train.maxSlopePercentage,
				maxSlopePercentage: train.maxSlopePercentage,
            },
            compatibleTrackTypes: ["'"+track.id+"'"],
            appearance: {
                color: train.color
            },
            elevationMultipliers: {
                DEEP_BORE: track.DEEP,
                STANDARD_TUNNEL: track.STD,
                CUT_AND_COVER: track.CUT,
                AT_GRADE: track.AG,
                ELEVATED: track.EL
            },
            allowAtGradeRoadCrossing: train.allowAtGradeRoadCrossing,

        };
        tApi.registerTrainType(hold);
        activatedTrains.append(train);
        activatedTracks.append(track);
        trackTypeList.track.id = hold;
    }

    function saveTrainData(saveId) {
        const hold = {
            trackTypeList: trackTypeList,
            activatedTrains: activatedTrains,
            activatedTracks: activatedTracks,
            trackTypeCount: trackTypeCount
        }
        api.storage.set(saveId,hold);
    }

    function loadTrainData(saveId) {
        hold = api.storage.get(saveId);
        trackTypeList = hold.trackTypeList;
        activatedTrains = hold.activatedTrains;
        activatedTracks = hold.activatedTracks;
        trackTypeCount = hold.trackTypeCount;
    }

    function trainMenu() {

        const [track_selected, set_selected_track] = React.useState({
            id: null
        });

        function trackSelectionChange(new) {
            set_selected_track(prev => ({
                id: new
            }));
        }

        function trackDropdown(props) {
            return h('select', {
                value: selectedLocation.continent || '',
                onChange: (e) => set_selected_track(e.target.value || null),
                className: 'w-full p-2 border border-input bg-background rounded text-sm'
            }, [
                h('option', { key: 'all', value: '' }, 'Trains'),
                ...continents.map(continent => 
                    h('option', { key: continent, value: continent }, continent)
                )
            ]
            )
        }
        return h('div', { className: 'space-y-4' }, [
            h('div', { key: 'header', className: 'flex items-center justify-between' }, [
                h('div', { key: 'left', className: 'flex items-center gap-2' }, [
                    h('span', { key: 'pct', className: 'text-xl font-semibold text-primary' }, 'Trains: ')
                ]),
                h('div', { key: 'right', className: 'text-right' }, [
                    h('div', { key: 'total', className: 'text-lg font-semibold' }, 'test'),
                ]),
            ])
        ]);
    }

    api.ui.addFloatingPanel({
        id: 'trains',
        icon: 'TrainTrack',
        tooltip: 'Dan Trains',
        title: 'Dan Trains',
        size: { width: 600, height: 600 },
        render: trainMenu,
    });




})