import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const AddEdit = () => {
  const navigate = useNavigate();
  const{id}=useParams();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const addContact = async (data) => {
    const response = await axios.post("http://localhost:4000/user",data);
    if (response.status === 200) {
       toast.success(response.data)
    }
  };


  const updateContact = async (data,id) => {
    const response = await axios.put(`http://localhost:4000/user/${id}`,data);
    if (response.status === 200) {
       toast.success(response.data)
    }
  }
const singleUser=()=>{
  if(window.confirm("Are you sure that you want to update user record")){
    axios.get(`http://localhost:4000/user/${id}`).then((response) => {
     setState({...response.data[0]})
    });
   }
}
  useEffect(()=>{
  if(id){
    singleUser(id)
  }
  },[id])
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(!id){
      addContact(state);
    }else{
      updateContact(state,id)
    }
    navigate("/");
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          id="name"
          name="name"
          onChange={handleInput}
          value={state.name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter Your Email"
          id="email"
          name="email"
          onChange={handleInput}
          value={state.email}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          placeholder="Enter Your Phone Number"
          id="contact"
          name="contact"
          onChange={handleInput}
          value={state.contact}
        />
        <input type="submit" value={id?"Update":"Add"} />
      </form>
    </div>
  );
};
export default AddEdit;
