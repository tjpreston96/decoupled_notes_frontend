import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";


const NotePage = () => {
  const [note, setNote] = useState(null);
  let params = useParams();
  let history = useNavigate();

  useEffect(() => {
    getNote();
  }, [params.id]);

  let getNote = async () => {
    if (params.id === "new") return;

    let response = await fetch(`/api/notes/${params.id}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/notes/${params.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${params.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history("/");
  };

  let handleSubmit = () => {
    console.log(note.body);
    if (params.id !== "new" && note.body === "") {
      deleteNote();
    } else if (params.id !== "new") {
      updateNote();
    } else if (params.id === "new" && note.body !== null) {
      createNote();
    }
    history("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {params.id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        defaultValue={note?.body}
      />
    </div>
  );
};

export default NotePage;
