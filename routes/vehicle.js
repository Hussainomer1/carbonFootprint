var express = require('express');
var router = express.Router();
const request = require('request');

const token = process.env.API_KEY

/* GET home page. */
router.get('/', function (req, res, next) {
        const options = {
            url: `https://www.carboninterface.com/api/v1/vehicle_makes`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        request(
            options,
            (err, response, body) => {
                const cars = JSON.parse(body);
                const makes = cars.sort((a, b) => {
                    var nameA = a.data.attributes.name.toUpperCase();
                    var nameB = b.data.attributes.name.toUpperCase();
                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                })
                res.render('vehicle-make', {title:'Vehicle Make', makes, models:null})
            }
        )
});

router.get('/model', function (req, res, next) {
        if (req.query.make) {
        const options = {
            url: `https://www.carboninterface.com/api/v1/vehicle_makes/${req.query.make}/vehicle_models`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        request(
            options,
            (err, response, body) => {
                const cars = JSON.parse(body);
                const models = cars.sort((a, b) => {
                    var nameA = a.data.attributes.name.toUpperCase();
                    var nameB = b.data.attributes.name.toUpperCase();
                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                })
                res.render('vehicle-model', { title: 'Vehicle Make', models })
            }
        )
    } else {
        res.redirect('vehicle-make')
    }
}); 

router.get('/score', function (req, res, next) {
    if (req.query.model) {
        const options = {
            url: `https://www.carboninterface.com/api/v1/estimates`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                "type": "vehicle",
                "distance_unit": `${req.query.unit}`,
                "distance_value": `${req.query.distance_value}`,
                "vehicle_model_id": `${req.query.model}`
            }
        }
        request(
            options,
            (err, response, body) => {
                const score = JSON.parse(body);
                console.log(score)
                res.render('vehicle-score', { title: 'Vehicle Score', score })
            }
        )
    } else {
        res.redirect('vehicle-score')
    }
}); 

module.exports = router;
