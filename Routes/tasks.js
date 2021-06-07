const router = require('express').Router();
const tasksDb = require('../database/taskDb');

router.get('/', async (req, res) => {
    const tasks = await tasksDb.getTasks();
    res.render('tasks/index', { tasks });
});
router.get('/newtask', async (req, res) => {
    const categories = await tasksDb.getCategories();
    res.render('tasks/newTask', { categories });
});
router.post('/addItem', async (req, res) => {
    await tasksDb.addTask(req.body);
    res.redirect('/tasks/');
});

router.post('/markAsCompleted', async (req, res) => {
    await tasksDb.markTaskCompleted(req.body);
    console.log(req.body);
    res.redirect('/tasks/');
});

router.get('/completed', async (req, res) => {
    const completedTasks = await tasksDb.getCompleted();
    res.render('tasks/completed', { completedTasks });
});

router.get('/categories', async (req, res) => {
    const categories = await tasksDb.getCategories();
    res.render('tasks/categories', { categories });
});

router.get('/newCategory', async (req, res) => {
    res.render('tasks/newCategory');
});

router.post('/addCategory', async (req, res) => {
    await tasksDb.addCategory(req.body);
    res.redirect('/tasks/');
});
router.get('/editCategory', async (req, res) => {
    const category = await tasksDb.getCategoryById(req.query.id);
    res.render('tasks/editCategory', { category });
});
router.post('/updateCategory', async (req, res) => {
    await tasksDb.updateCategory(req.body);
    console.log(req.body);
    res.redirect('/tasks/categories');
});
module.exports = router;