const express = require("express");
const router = express.Router();
const fs = require("fs");
const { restart } = require("nodemon");
const readFile = require("../utils/helpers");
const uniqid = require("uniqid");

router
  .get("/", (req, res) => {
    // const fileContent = JSON.parse(fs.readFileSync("./data/videos.json"));
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
  // axios.post("/videos", {title: "title", content: "content"})

  console.log(req.body);
  const newVideo = {
    id: uniqid(),
    title: req.body.title,
    content: req.body.content,
  };
  const fileContent = readFile("./data/videos.json");
  fileContent.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(fileContent));

  res.status(201).json(newVideo);
});

module.exports = router;
