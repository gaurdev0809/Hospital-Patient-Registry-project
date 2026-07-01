const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://devgaur0809_db_user:l5cb1rOTEMaSo5Gk@cluster0.xagjvdl.mongodb.net/")
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

const patientSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    dateOfAdmission: { type: String, required: true },
    illnessName: { type: String, required: true }
});

const Patient = mongoose.model("Patient", patientSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", async (req, res) => {
    try {

        const patient = new Patient({
            patientName: req.body.patientName,
            dateOfAdmission: req.body.dateOfAdmission,
            illnessName: req.body.illnessName
        });

        await patient.save();

        res.send("Patient Registered Successfully");

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.get("/patients", async (req, res) => {
    try {

        const patients = await Patient.find();

        res.json(patients);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});
