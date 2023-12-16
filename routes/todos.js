const router = require("express").Router();
const {
  get_todos,
  add_todo,
  update_todo,
  delete_todo,
} = require("../controllers/todos");
const v = require("../validations/todos");

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing Todos
 *
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: mongoObjectId
 *           readOnly: true
 *         title:
 *           type: string
 *           required: true
 *         completed:
 *           type: boolean
 *           required: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 5fecceea7d7bc321c87ce654
 *         title: Example Todo
 *         completed: false
 *         createdAt: "2023-12-15T20:46:43.691Z"
 *         updatedAt: 2023-12-15T21:12:21.300Z
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all Todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todos List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/", get_todos);

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Add Todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               completed:
 *                 type: boolean
 *                 required: true
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           mongoObjectId:
 *             schema:
 *               type: string
 *               format: mongoObjectId
 *             example: 657cbec3324dd670d030b5d6
 */
router.post("/", v.addTodo, add_todo);

/**
 * @swagger
 * /todo:
 *   put:
 *     summary: Update Todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Todo"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     createdAt:
 *                       type: string
 *                 - $ref: "#/components/schemas/Todo"
 *             example:
 *               title: Example Todo
 *               completed: false
 *               createdAt: "2023-12-15T20:46:43.691Z"
 *               updatedAt: 2023-12-15T21:12:21.300Z
 *               id: 5fecceea7d7bc321c87ce654
 *
 */
router.put("/", v.updateTodo, update_todo);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete Todo
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "MongoDB ObjectId"
 *         schema:
 *           type: string
 *         example: 5fecceea7d7bc321c87ce654
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: mongoObjectId
 *           example:
 *             id: 5fecceea7d7bc321c87ce654
 *
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *             example:
 *               title: Example Todo
 *               completed: false
 *               createdAt: "2023-12-15T20:46:43.691Z"
 *               updatedAt: 2023-12-15T21:12:21.300Z
 *               id: 5fecceea7d7bc321c87ce654
 *
 */
router.delete("/:id?", v.deleteTodo, delete_todo);

module.exports = router;
