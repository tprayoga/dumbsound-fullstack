import React from 'react'
import Navbar from "../components/Navbar";


const Addartis = () => {
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div className="container">

        <form className="mt-5 d-grid">
        <h1 className="mb-4" style={{
            color: "white",
            fontWeight: "700",
            fontSize: "24px"}}>Add Artis</h1>
            <input
              type="text"
              className="form-control text-light mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                marginRight:"15px"
              }}
            ></input>
          <input
            type="text"
            id="inputPassword5"
            className="form-control text-light mb-3"
            aria-describedby="passwordHelpBlock"
            placeholder="old"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <select
            className="form-select text-light mb-3"
            aria-label="Default select example"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          >
            <option className="text-dark" selected>
              Solo
            </option>
            <option className="text-dark" value="1">
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
              type="button"
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