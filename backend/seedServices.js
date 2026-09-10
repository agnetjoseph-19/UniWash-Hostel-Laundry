const mongoose = require("mongoose");
const Service = require("./models/Service");

mongoose
  .connect("mongodb://127.0.0.1:27017/uniwash")
  .then(async () => {
    console.log("MongoDB connected");

    await Service.deleteMany({});

    await Service.insertMany([
      {
        serviceName: "Washing Only",
        description: "Washing service only",
        pricePerKg: 40,
      },
      {
        serviceName: "Washing + Drying",
        description: "Washing and drying service",
        pricePerKg: 60,
      },
      {
        serviceName: "Washing + Drying + Ironing",
        description: "Washing, drying and ironing service",
        pricePerKg: 80,
      },
      {
        serviceName: "Washing + Starch + Drying + Ironing",
        description: "Washing, starching, drying and ironing service",
        pricePerKg: 100,
      },
      {
        serviceName: "Ironing Only",
        description: "Ironing service only",
        pricePerKg: 20,
      },
    ]);

    console.log("5 UniWash services added successfully");

    await mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error:", error);
  });