const axios = require('axios');
const { text } = require('express');
const { distinct } = require('../models/blacklistToken.model');


module.exports.getAddressCoordinate = async (address) => {
    console.log(typeof (address))


    const url = `https://nominatim.openstreetmap.org/search`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'ber-clone/1.0 (your-email@example.com)',
                'Accept-Language': 'en'
            },
            params: {
                q: address,
                format: 'json',
                addressdetails: 1,
                limit: 1
            }
        });
        console.log('response:', response);

        if (response.data.length === 0) {
            throw new Error('No results found..');
        }

        const location = response.data[0];

        return {
            lan: parseFloat(location.lat),
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
    console.log('origin:', origin);
    console.log('destination:', destination);

    const body = {
        coordinates: [
            [origin.lng, origin.lan],
            [destination.lng, destination.lan]
        ]
    };

    console.log('body:', body);

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
                'User-Agent': 'ber-clone/1.0 vishnu1@gmail.com',
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

        // console.log('response:', response);

        if (!response.data || response.data.length === 0) {
            throw new Error('No suggestions found');
        }

        const suggestions = response.data
            .filter(item => item.display_name.includes('Kerala'))
            .map(place => place.display_name);
            
        console.log('suggestions:', suggestions);
        return suggestions;
    } catch (error) {
        console.log('Nominatim AutoComplete error:', error.message);
        throw new Error(error);
    }
} 
