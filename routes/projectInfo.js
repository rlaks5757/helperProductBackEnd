const express = require("express");
const ProjectInfo = require("../schemas/projectInfo");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const projectInfo = await ProjectInfo.find({});
      res.status(200).json({ success: true, data: projectInfo });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  })
  .post(async (req, res) => {
    try {
      const projectInfoPost = await ProjectInfo.create(req.body);
      res.status(201).json({ success: true, data: projectInfoPost });
    } catch (err) {
      res.status(400).json({ success: false, data: req });
    }
  });

router
  .route("/fixedCate/:id")
  .get(async (req, res) => {
    try {
      const projectInfo = await ProjectInfo.findOne({
        _id: req.params.id,
      });
      res.status(200).json({ success: true, data: projectInfo });
    } catch (err) {
      res.status(400).json({ success: false, data: err });
    }
  })
  .put(async (req, res) => {
    try {
      const projectInfo = await ProjectInfo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({ success: true, data: projectInfo });
    } catch (err) {
      res.status(400).json({ success: false, data: err });
    }
  })
  .delete(async (req, res) => {
    try {
      const projectInfo = await ProjectInfo.deleteOne({ _id: req.params.id });
      res.status(200).json({ success: true, data: projectInfo });
    } catch (err) {
      res.status(400).json({ success: false, data: err });
    }
  });

router.get("/:projectName", async (req, res) => {
  try {
    const projectInfo = await ProjectInfo.findOne({
      projectName: req.params.projectName,
    });
    res.status(200).json({ success: true, data: projectInfo });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
});

module.exports = router;
