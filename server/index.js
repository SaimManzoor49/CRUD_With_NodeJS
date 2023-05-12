const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TodoModal = require("./models/Todo");

const PORT = 8000;

// mongoose.connect(
//   "add Your mongodb Here"
//   );
  
  
const app = express();
app.use(express.json());
app.use(cors());

///////////CreateDoc///////////
app.post("/createTodo", async (req, res) => {
  const { body } = req;

  // try{

  let doc = TodoModal(body);
  await doc.save();
  // }catch{

  // }

  console.log(body);

  res.send("added");
});
////////////ReadDoc/////////////
app.get("/readTodos", async (req, res) => {
  let todos = await TodoModal.find();
  console.log(todos);
  res.json(todos);
});

////////////UpdateDoc///////////////
app.post("/updateTodo", async (req, res) => {
  const todo = req.body;
  console.log(todo._id);
  // TodoModal.findById(todo._id);
  await TodoModal.findByIdAndUpdate(todo._id, todo);
  res.send("undated");
});

/////////////DeleteDoc///////////////
app.post("/deleteTodo", async (req, res) => {
  await TodoModal.findByIdAndRemove(req.body._id);

  res.send("todo deleted");
});

app.listen(PORT, () => {
  console.log("server is listning on : " + PORT);
});
