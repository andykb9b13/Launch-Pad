const db = require("../config/connection");
const { User, Business } = require("../models");
const userSeeds = require("./userSeeds.json");
const businessSeeds = require("./businessSeeds.json");
const productSeeds = require("./productSeeds.json");
const donorSeeds = requre;

db.once("open", async () => {
  try {
    // creating users
    await User.deleteMany({});
    await User.insertMany(userSeeds);

    // creating businesses
    await Business.deleteMany({});

    for (let i = 0; i < userSeeds.length; i++) {
      const { _id } = await Business.create(businessSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: userSeeds[i].username },
        {
          $addToSet: {
            businesses: _id,
          },
        }
      );
      console.log("user in seeds", user);
    }

    // creating products
    await Product.deleteMany({});

    // products for first business
    for (let i = 0; i < 2; i++) {
      const { _id } = await Product.create(productSeeds[i]);
      const business = await Business.findOneAndUpdate(
        { name: businessSeeds[0].name },
        {
          $addToSet: {
            products: _id,
          },
        }
      );
      console.log("1st business in seeds", business);
    }

    // products for 2nd business
    for (let i = 2; i < 4; i++) {
      const { _id } = await Product.create(productSeeds[i]);
      const business = await Business.findOneAndUpdate(
        { name: businessSeeds[1].name },
        {
          $addToSet: {
            products: _id,
          },
        }
      );
      console.log("2nd business in seeds", business);
    }

    // products for 3rd business
    for (let i = 4; i < 6; i++) {
      const { _id } = await Product.create(productSeeds[i]);
      const business = await Business.findOneAndUpdate(
        { name: businessSeeds[2].name },
        {
          $addToSet: {
            products: _id,
          },
        }
      );
      console.log("3rd business in seeds", business);
    }

    console.log("all done");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
