const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "no tag found with this ID!" });
      return;
    }
    console.log(tagData);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((updateTagData) => {
      if (!updateTagData[0]) {
        res.status(404).json({ message: "no tag found with this ID!" });
      }
    });

    res.status(200).json(updateTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value

  try {
    const tagDataDelete = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDataDelete) {
      res.status(404).json({ message: "no tag found with this ID!" });
      return;
    }
    res.status(200).json(tagDataDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
