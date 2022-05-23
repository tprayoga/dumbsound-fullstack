import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import { API } from '../config/api';


const Addartis = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [form, setForm] = useState({
    name:"",
    old:"",
    type:"",
    startCareer:""
  })
  const {name, old, type, startCareer} = form
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    })
  }
  const handleSubmit = async (e) =>{
    setLoadingSubmit(true)
    e.preventDefault();
    try {
      setLoadingSubmit(false);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/artis", body, config);
      console.log("berhasi!", response);
      setForm({
        name: "",
        old: "",
        type: "",
        startCareer: "",
      });
    } catch (error) {
      console.log(error);
      setLoadingSubmit(false);
    }    
  }
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div className="container">

        <form className="mt-5 d-grid" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="mb-4" style={{
            color: "white",
            fontWeight: "700",
            fontSize: "24px"}}>Add Artis</h1>
            <input
              type="text"
              name='name'
              onChange={handleChange}
              value={name}
              className="form-control text-light mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                marginRight:"15px"
              }}
            ></input>
          <input name="old" onChange={handleChange} value={old}
            type="text"
            id="inputPassword5"
            className="form-control text-light mb-3"
            aria-describedby="passwordHelpBlock"
            placeholder="old"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <select onChange={handleChange} value={type} name="type"
            className="form-select text-light mb-3"
            aria-label="Default select example"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          >
            <option className="text-dark" name="type">
              Solo
            </option>
            <option className="text-dark" name="type">
              Group
            </option>
          </select>
          <input
            type="text"
            id="inputPassword5"
            className="form-control text-light mb-3"
            aria-describedby="passwordHelpBlock"
            placeholder="Start Career"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <div className="text-center">
            <button
              className="btn btn-danger mt-3"
              type="submit"
              style={{ backgroundColor: "#F58033",width:"250px" }}
            >
              Add Artis
            </button>
          </div>
        </form>
      </div>
    </div>  )
}

export default Addartis