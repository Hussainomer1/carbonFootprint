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
                res.render('vehicle', {title:'Vehicle', makes, models:null})
            }
        )
});

module.exports = router;
