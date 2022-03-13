const express = require("express");
const router = express.Router();
const fs = require("fs");
const { restart } = require("nodemon");
const readFile = require("../utils/helpers");
const uniqid = require("uniqid");

router
  .get("/", (req, res) => {
    const fileContent = readFile("./data/videos.json");
    res.status(200).json(fileContent);
  })
  .get("/:id", (req, res) => {
    const fileContent = readFile("./data/videos.json");
    const selectedVideo = fileContent.find(
      (video) => video.id == req.params.id
    );
    res.status(200).json(selectedVideo);
  });

router.post("/", (req, res) => {
  try {
    const { title, description, img } = req.body;

    console.log(req.body);
    const newVideo = {
      id: uniqid(),
      title: title,
      channel: "Brainflix",
      image: img,
      description: description,
      views: "100,000",
      likes: "100,000",
      duration: "4:01",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: new Date().getTime(),
      comments: [
        {
          id: uniqid(),
          name: "Martin Evergreen",
          comment:
            "I’ve loved trains ever since I was a child. I dreamed about riding one around the world. This is the most fantastic thing I’ve seen yet, and I’m watching it ON a train!",
          likes: 3,
          timestamp: new Date().getTime(),
        },
      ],
    };
    const fileContent = readFile("./data/videos.json");
    fileContent.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(fileContent));

    res.status(201).json(newVideo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
