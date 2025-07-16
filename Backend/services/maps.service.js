const axios = require('axios');
const captainModel = require('../models/captain.model');


module.exports.getAddressCoordinate = async (address) => {

    const url = `https://nominatim.openstreetmap.org/search`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'ber-clone/1.0 vishnumr321k@gmail.com',
                'Accept-Language': 'en'
            },
            params: {
                q: address,
                format: 'json',
                addressdetails: 1,
                limit: 1
            }
        });


        if (response.data.length === 0) {
            throw new Error('No results found..');
        }

        const location = response.data[0];

        return {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lon)
        }
    } catch (error) {
        console.error('Nomination error:', error.message);
        throw error;
    }
}

module.exports.getDistanceTime = async (originAddress, destinationAddress) => {
    const apiKey = process.env.ORS_API_KEY;

    const origin = await module.exports.getAddressCoordinate(originAddress);
    const destination = await module.exports.getAddressCoordinate(destinationAddress);

    const body = {
        coordinates: [
            [origin.lng, origin.lat],
            [destination.lng, destination.lat]
        ]
    };


    try {
        const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            body, {
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json'
            }
        }
        );

        const summary = response.data.routes[0].summary;


        return {
            origin: origin,
            destination: destination,
            distance_km: (summary.distance / 1000).toFixed(2),
            duration_min: Math.ceil(summary.duration / 60),
        };
    } catch (error) {
        console.log('ORS error', error.message);
        throw new Error('Failed to calculate route...');
    }
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    const url = 'https://nominatim.openstreetmap.org/search';

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'ber-clone/1.0 vishnumr321k@gmail.com',
                'Accept-Language': 'en'
            },
            params: {
                q: input,
                format: 'json',
                countrycodes: 'in',
                addressdetails: 1,
                limit: 5
            }
        });

        console.log('response:', response);

        if (!response.data || response.data.length === 0) {
            throw new Error('No suggestions found');
        }

        const suggestions = response.data
            .filter(item => item.display_name.includes('Kerala'))
            .map(place => place.display_name);



        return suggestions;
    } catch (error) {
        console.log('Nominatim AutoComplete error:', error.message);
        throw new Error(error);
    }
}

module.exports.getCaptainInTheRadius = async (lat, lng, radius) => {
    console.log('Ethi mone ethi ....😎');
    const captain = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371]
            }
        }
    });

    console.log('captain in map.service:', captain);
    return captain;
};