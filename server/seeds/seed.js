const db = require("../config/connection");
const { User, Business } = require("../models");
const userSeeds = require("./userSeeds.json");
const businessSeeds = require("./businessSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(userSeeds);

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

    console.log("all done");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
