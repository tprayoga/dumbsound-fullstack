import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Attc from "../assets/interface.png"
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "@mui/material";

const Addmusic = () => {
  const [form, setForm] = useState({
    title:"",
    year:"",
    thumbnail:"",
    attache:""
  })

  const {title, year,thumbnail,attache} = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.type ==="file" ? e.target.files : e.target.value
    })
  }

  const handleSubmit = useMutation(async(e)=>{
    try{
      e.preventDefault()
      const formData = new FormData();
      formData.set('attache', form.attache[0], form.attache[0].name);
      formData.set('thumbnail', form.thumbnail[0], form.thumbnail[0].name);
      formData.set('title', form.title);
      formData.set('year', form.year);

      const config = {
        headers : {
          'Content-type': 'multipart/form-data',
        }
      }
      const body = JSON.stringify(form)

      const response = await API.post("/music", body, config)
      console.log(response);

      if (response.data.status === "success") {
        const alert = (
          <Alert>Register Berhasil</Alert>
        )
        setMessage(alert)
      }else{
        const alert = (
          <Alert>Register Gagal</Alert>
        )
        setMessage(alert)
      }
    }catch(error){
      const alert = (
        <Alert>
          Gagal
        </Alert>
      )
      setMessage(alert)
      console.log(error);
    }
  })

  const [message, setMessage] = useState(null);
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
      {message && message}

        <form className="mt-5 d-grid" onSubmit={(e)=> handleSubmit.mutate(e)}>
        <h1 className="mb-4" style={{
            color: "white",
            fontWeight: "700",
            fontSize: "24px"}}>Add Music</h1>
          <div className="d-flex">
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="form-control text-light mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Title"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                marginRight:"15px"
              }}
            ></input>
            <label className="d-flex justify-content-around"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                height:"38px",
                padding:0,
                border: "1px solid #D2D2D2",
                borderRadius:"5px",
                width:"215px"
              }}
              for="formFile"
            ><div className="mt-1 text-light">Thumbnail.jpg</div><img src={Attc} alt="atc" className="mt-1" style={{height:"28px", objectFit:"cover"}}/></label>
            <input name="thumbnail" onChange={handleChange} type="file" id="formFile" hidden />
          </div>
          <input
            type="text"
            name="year"
            onChange={handleChange}
            id="inputPassword5"
            className="form-control text-light mb-3"
            aria-describedby="passwordHelpBlock"
            placeholder="Year"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <select
            className="form-select text-light mb-3"
            name="artis"
            aria-label="Default select example"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          >
            <option className="text-dark" selected>
              Singer
            </option>
            <option className="text-dark" value="1">
              Male
            </option>
            <option className="text-dark" value="2">
              Female
            </option>
          </select>
          <label className="d-flex justify-content-around"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                height:"38px",
                padding:0,
                border: "1px solid #D2D2D2",
                borderRadius:"5px",
                width:"113px"
              }}
              for="formFile"
            ><div className="mt-1 text-light">Attache.mp3</div></label>
            <input name="attache" onChange={handleChange} type="file" id="formFile" hidden />
          <div className="text-center">
            <button
              className="btn btn-danger mt-3"
              type="submit"
              style={{ backgroundColor: "#F58033",width:"250px" }}
            >
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addmusic;
