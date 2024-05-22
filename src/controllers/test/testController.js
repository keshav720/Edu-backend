const db = require("../../models");
const Test = db.Test;
const Question = db.Question;

exports.createTest = async (req, res) => {
  try {
    const { title } = req.body;
    const test = await Test.create({ title });
    res.status(201).json({
      success: true,
      message: "test created successfully",
      test,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// exports.getAllTests = async (req, res) => {
//   try {
//     const tests = await Test.findAll({
//       include: [
//         { model: db.Course, as: "Course" },
//         { model: Question, as: "Questions" },
//       ],
//     });
//     res.status(200).json(tests);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.getTestById = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findByPk(id, {
      include: [{ model: Question, as: "Question" }],
    });
    if (test) {
      res.status(200).json(test);
    } else {
      res.status(404).json({ error: "Test not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.updateTest = async (req, res) => {
//   try {
//     const [updated] = await Test.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (updated) {
//       const updatedTest = await Test.findByPk(req.params.id);
//       res.status(200).json(updatedTest);
//     } else {
//       res.status(404).json({ error: "Test not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteTest = async (req, res) => {
//   try {
//     const deleted = await Test.destroy({
//       where: { id: req.params.id },
//     });
//     if (deleted) {
//       res.status(204).json();
//     } else {
//       res.status(404).json({ error: "Test not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
