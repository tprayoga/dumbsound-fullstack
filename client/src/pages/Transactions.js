import React from "react";
import Navbar from "../components/Navbar";
import { Datauser } from "../components/dataDummys";

const Transactions = () => {
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1
          className="mb-4 mt-5"
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: "24px",
          }}
        >
          Incoming Transaction
        </h1>
        <div>
          <table className="table table-dark table-striped text-center">
            <thead className="text-danger">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Users</th>
                <th scope="col">Remaining Active</th>
                <th scope="col">Status User</th>
                <th scope="col">Status Payment</th>
              </tr>
            </thead>
            <tbody>
                {Datauser.map((item, index)=>{
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.remaing}</td>
                            <td className={`status-${item.status}`}>{item.status}</td>
                            <td className={`status-${item.payment}`}>{item.payment}</td>
                        </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
