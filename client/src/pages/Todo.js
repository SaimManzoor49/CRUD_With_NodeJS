import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const initialState = {
  title: "",
  location: "",
  description: "",
};

const URL = "http://localhost:8000";

export default function Todo() {
  ////////////////StateManagment///////////////
  const [state, setState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [mainButton, setMainButton] = useState("addDoc");

  //////////////////UseEffect/////////////
  useEffect(() => {
    readTodos();
  }, []);

  ////////////UseRef///////////
  const titleF = useRef();
  const locationF = useRef();
  const descriptionF = useRef();

  ///////////////ReadTodos//////////
  const readTodos = () => {
    axios
      .get(URL + "/readTodos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  /////////////HandleChange Input Fields////////////////
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((s) => ({ ...s, [name]: value }));
  };

  //////////////Create Document ///////////////////////////
  const addTodo = () => {
    if (state.title.length < 3) {
      alert("title _-");
      return;
    }

    if (state.location.length < 3) {
      alert("location _-");
      return;
    }

    if (state.description.length < 3) {
      alert("description _-");
      return;
    }

    axios
      .post(URL + "/createTodo", state)
      .then((res) => {
        readTodos();
        titleF.current.value = "";
        locationF.current.value = "";
        descriptionF.current.value = "";
      })
      .catch((err) => {
        alert(err);
      });
  };

  ////////////Update Document///////////////

  const updateDocument = () => {
    axios
      .post(URL + "/updateTodo", state)
      .then((res) => {
        console.log(res.data);
        setMainButton("addDoc");
        readTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (todo) => {
    setState(todo);

    titleF.current.value = todo.title;
    locationF.current.value = todo.location;
    descriptionF.current.value = todo.description;
    setMainButton("updateDoc");
  };

  ////////////Delete Document///////////////
  const handleDelete = (todo) => {
    axios.post(URL + "/deleteTodo", todo).then((res)=>{
      console.log(res.data)
      readTodos( )
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <>
      <div className="container">
        <div className="row card mt-5 shadow ">
          <div className="col text-center mt-3">
            <h2>TODO</h2>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-md-6 ">
              <input
                ref={titleF}
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder="Title"
                name="title"
              />
            </div>
            <div className="col-12 col-md-6 my-3 my-md-0 ">
              <input
                ref={locationF}
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder="Location"
                name="location"
              />
            </div>
            <div className="col-12  my-3 ">
              <textarea
                ref={descriptionF}
                className="form-control"
                onChange={handleChange}
                placeholder="Description"
                name="description"
              />
            </div>
            <div className="col-6 offset-3 text-center mb-4">
              {mainButton === "addDoc" ? (
                <button className="btn btn-success w-100" onClick={addTodo}>
                  Add TODO
                </button>
              ) : (
                <button
                  className="btn btn-success w-100"
                  onClick={updateDocument}
                >
                  Update TODO
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((t, i) => (
                    <tr key={i + 1}>
                      <th scope="row">{i + 1}</th>
                      <td>{t.title}</td>
                      <td>{t.location}</td>
                      <td>{t.description}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm mb-1 mb-md-0"
                          onClick={() => {
                            handleEdit(t);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-0 ms-md-1"
                          onClick={() => {
                            handleDelete(t);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
