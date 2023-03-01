import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  const getApiData = () => {
    axios.get(`http://localhost:4000/users`).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  const handleDelete=(id)=>{
   if(window.confirm("Are you sure that you want to delete user record")){
    axios.delete(`http://localhost:4000/user/${id}`).then((response) => {
      if (response.status === 200) {
         toast.success(response.data)
        getApiData();
      }
      
    });
   }
  }
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div style={{ marginTop: "150px" }} className="main ">
      <tabel className="styled-tabel ">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((items, index) => {
              return (
                <tr key={items.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.contact}</td>
                 <td>
                 <Link to={`/edit/${items.id}`}>
                  <button className="btn btn-edit">Edit</button>
                  </Link>
                  
                  <button className="btn btn-delete" onClick={()=>handleDelete(items.id)}>Delete</button>
                  <Link to={`/view/${items.id}`}>
                  <button className="btn btn-view">View</button>
                  </Link>
                 </td>
                </tr>
              );
            })}
        </tbody>
      </tabel>
    </div>
   
  );
};

export default Home;
