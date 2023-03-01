import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";
import { toast } from "react-toastify";
const View = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const singleUser = () => {
  
      axios.get(`http://localhost:4000/user/${id}`).then((response) => {
        setUser({ ...response.data[0] });
      });
    
  };
  useEffect(() => {
    if (id) {
      singleUser(id);
    }
  }, [id]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Details</p>
        </div>
     
      <div className="container">
        <strong>ID: </strong>
        <strong>{user.id}</strong>
        <br />
        <br />

        <strong>Name: </strong>
        <strong>{user.name}</strong>
        <br />
        <br />

        <strong>Email: </strong>
        <strong>{user.email}</strong>
        <br />
        <br />

        <strong>Contact: </strong>
        <strong>{user.contact}</strong>
        <br />
        <br />
      </div>
    </div>
    </div>
  );
};

export default View;
