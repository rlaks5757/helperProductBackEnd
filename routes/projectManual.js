const express = require("express");
const ProjectManual = require("../schemas/projectManual");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const projectManual = await ProjectManual.find({});
      res.status(200).json({ success: true, data: projectManual });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false });
    }
  })
  .post(async (req, res) => {
    try {
      const projectManual = await ProjectManual.create(req.body);
      res.status(201).json({ success: true, data: projectManual });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, data: err });
    }
  });

router
  .route("/fixedCard/:id")
  .get(async (req, res) => {
    try {
      const projectManual = await ProjectManual.find({
        _id: req.params.id,
      });
      res.status(200).json({ success: true, data: projectManual });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, data: err });
    }
  })
  .put(async (req, res) => {
    try {
      const projectManual = await ProjectManual.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({ success: true, data: projectManual });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, data: err });
    }
  })
  .delete(async (req, res) => {
    try {
      const projectManual = await ProjectManual.deleteOne({
        _id: req.params.id,
      });
      res.status(200).json({ success: true, data: projectManual });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, data: err });
    }
  });

router.get("/:projectName", async (req, res) => {
  try {
    const projectManual = await ProjectManual.find({
      projectName: req.params.projectName,
    });

    const noneDescrtion = projectManual.map((com) => {
      return {
        categoryName: com.categoryName,
        number: com.number,
        projectName: com.projectName,
        title: com.title,
        _id: com._id,
        __v: com.__v,
      };
    });

    res.status(200).json({ success: true, data: noneDescrtion });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: err });
  }
});

router.delete("/fixedCard/allDelete/:projectName", async (req, res) => {
  try {
    const projectManual = await ProjectManual.deleteMany({
      projectName: req.params.projectName,
    });

    res.status(200).json({ success: true, data: projectManual });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: err });
  }
});

module.exports = router;
