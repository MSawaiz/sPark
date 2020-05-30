var connect = require('./connect');
var vehLis = require('../models/vehiclesListSchema');

module.exports.vehicleArchController = function (req, res) {
    res.render('index', { title: 'Express' })
}

module.exports.addLis = function (req, res, next) {
    var vehs = [
        {
            make: "Suzuki",
            model: [
                {
                    name: "Celerio",
                    category: "Medium"
                },
                {
                    name: "Swift",
                    category: "Medium"
                },
                {
                    name: "Ignis",
                    category: "Medium"
                },
                {
                    name: "Alto",
                    category: "Small"
                },
                {
                    name: "Esteem",
                    category: "Medium"
                },
                {
                    name: "Baleno",
                    category: "Medium"
                },
                {
                    name: "Liana",
                    category: "Medium"
                },
                {
                    name: "Samurai",
                    category: "Small"
                },
                {
                    name: "Verona",
                    category: "Large"
                },

            ]
        },
        {
            make: "Volkswagen",
            model: [
                {
                    name: "Vanagon",
                    category: "Large"
                },
                {
                    name: "Beetle",
                    category: "Small"
                },
                {
                    name: "Cabrio",
                    category: "Medium"
                },
                {
                    name: "Phaeton",
                    category: "Large"
                }
            ]
        },
        {
            make: "Ford",
            model: [
                {
                    name: "Transit",
                    category: "XLarge"
                },
                {
                    name: "E Series",
                    category: "XLarge"
                },
                {
                    name: "Festiva",
                    category: "Medium"
                },
                {
                    name: "Focus",
                    category: "Large"
                }
            ]
        },
        {
            make: "Nissan",
            model: [
                {
                    name: "Versa",
                    category: "Medium"
                },
                {
                    name: "Cube",
                    category: "Medium"
                },
                {
                    name: "Sentra",
                    category: "Medium"
                },
                {
                    name: "Pulsar",
                    category: "Medium"
                },
                {
                    name: "NV",
                    category: "XLarge"
                }
            ]
        },
        {
            make: "Honda",
            model: [
                {
                    name: "CR-V",
                    category: "Large"
                },
                {
                    name: "CR-X",
                    category: "Medium"
                },
                {
                    name: "Civic",
                    category: "Medium"
                },
                {
                    name: "CR-Z",
                    category: "Medium"
                },
                {
                    name: "Accord",
                    category: "Large"
                },
                {
                    name: "Fit",
                    category: "Medium"
                },
            ]
        },
        {
            make: "Toyota",
            model: [
                {
                    name: "Hilux",
                    category: "Large"
                },
                {
                    name: "Corolla",
                    category: "Medium"
                },
                {
                    name: "Camry",
                    category: "Large"
                },
                {
                    name: "Accord",
                    category: "Large"
                },
                {
                    name: "Fit",
                    category: "Medium"
                },
                {
                    name: "Tundra",
                    category: "XLarge"
                },
                {
                    name: "Tercel",
                    category: "Medium"
                },
                {
                    name: "Land Cruiser",
                    category: "Large"
                },
            ]
        },
        {
            make: "Daihatsu",
            model: [
                {
                    name: "Charade",
                    category: "Medium"
                },
                {
                    name: "Sirion",
                    category: "Medium"
                },
                {
                    name: "Cuore",
                    category: "Small"
                }
            ]
        },
        {
            make: "Mitsubishi",
            model: [
                {
                    name: "Mirage",
                    category: "Medium"
                },
                {
                    name: "i-MiEV",
                    category: "Small"
                },
            ]
        },
        {
            make: "BMW",
            model: [
                {
                    name: "X4",
                    category: "Large"
                },
                {
                    name: "4 Series",
                    category: "Large"
                },
                {
                    name: "5 Series",
                    category: "Large"
                },
                {
                    name: "8 Series",
                    category: "Large"
                },
                {
                    name: "7 series",
                    category: "Large"
                }
            ]
        },
        {
            make: "Land Rover",
            model: [
                {
                    name: "Range Rover Evoque",
                    category: "XLarge"
                },
                {
                    name: "Range Rover Sport",
                    category: "XLarge"
                },
                {
                    name: "Range Rover",
                    category: "XLarge"
                }
            ]
        },
        {
            make: "Seat",
            model: [
                {
                    name: "Arosa",
                    category: "Medium"
                },
            ]
        },
        {
            make: "Hyundai",
            model: [
                {
                    name: "Accent",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Mazda",
            model: [
                {
                    name: "Tribute",
                    category: "Large"
                }
            ]
        },
        {
            make: "Chevrolet",
            model: [
                {
                    name: "Express",
                    category: "XLarge"
                },
                {
                    name: "Cavalier",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Scion",
            model: [
                {
                    name: "xB",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Geo",
            model: [
                {
                    name: "Tracker",
                    category: "Medium"
                },
                {
                    name: "Prizm",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Mercury",
            model: [
                {
                    name: "Mountaineer",
                    category: "Large"
                },
            ]
        },
        {
            make: "Mercedes-Benz",
            model: [
                {
                    name: "S-Class",
                    category: "Large"
                },
                {
                    name: "C-Class",
                    category: "Large"
                },
                {
                    name: "E-Class",
                    category: "Large"
                },
            ]
        },
        {
            make: "Kia",
            model: [
                {
                    name: "Sedona",
                    category: "Large"
                },
                {
                    name: "Rio",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Lexus",
            model: [
                {
                    name: "GX",
                    category: "Large"
                },
                {
                    name: "LS",
                    category: "Large"
                },
                {
                    name: "RX",
                    category: "Large"
                }
            ]
        },
        {
            make: "Plymouth",
            model: [
                {
                    name: "Colt",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Dodge",
            model: [
                {
                    name: "Caravan",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Jeep",
            model: [
                {
                    name: "Grand Cherokee",
                    category: "Large"
                }
            ]
        },
        {
            make: "USPS",
            model: [
                {
                    name: "delivery truck",
                    category: "XLarge"
                }
            ]
        },
        {
            make: "GMC",
            model: [
                {
                    name: "Safari",
                    category: "Large"
                }
            ]
        },
        {
            make: "Eagle",
            model: [
                {
                    name: "Summit",
                    category: "Medium"
                }
            ]
        },
        {
            make: "Audi",
            model: [
                {
                    name: "A7",
                    category: "Large"
                },
                {
                    name: "A4",
                    category: "Large"
                },
                {
                    name: "A6",
                    category: "Large"
                },
            ]
        },
        {
            make: "Hummer",
            model: [
                {
                    name: "H2",
                    category: "XLarge"
                },
                {
                    name: "H4",
                    category: "XLarge"
                },
                {
                    name: "H3",
                    category: "Large"
                },
                {
                    name: "H1",
                    category: "XLarge"
                },
            ]
        }
    ]
    vehLis.collection.insert(vehs, function (err, doc) {
        if (err) throw err
        res.json("succuess!!")
    })
}

module.exports.viewList = function (req, res, next) {
    vehLis.find({}, function (err, result) {
        res.send(result);
    })
};

module.exports.getCat = function (req, res, next) {
    var veh = JSON.parse(req.params.veh)
    vehLis.findOne({ 'make': veh.make }, function (err, result) {
        if (err) throw err;
        else if (result)
            for (mod of result.model) {
                if (mod.name == veh.model)
                    res.json(mod.category)
            }
    })
};