import Axios from 'axios'
import { useState } from 'react'


function App() {

  const [Name, setName] = useState("");
  const [NewName, setNewName] = useState("");

  const [dataList, setdataList] = useState([]);

  const Getdata = () => {
    Axios.get("http://localhost:3001/getdata").then((response) => {
      setdataList(response.data);
    });
  };

  const Adddata = () => {
    Axios.post("http://localhost:3001/insertdata", {
      ID: ID,
      Name: Name
    }).then(() => {
      alert("successful")
    });
  };

  const updatedata = (id) => {
    Axios.put("http://localhost:3001/updatedata", { ID: id, Name: NewName }).then(
      (response) => {
        setdataList(
          dataList.map((val) => {
            return val.id == id
              ? {
                id: val.id,
                name: NewName
              }
              : val;
          })
        );
      }
    );
  };

  const deletedata = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setdataList(
        dataList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <form action="">
        <label>input:</label>
        <input type="text" onChange={(event) => {
          setName(event.target.value)
        }} />
        <hr></hr>
        <button onClick={Adddata}>adddata</button>



      </form>
      <button onClick={Getdata}>showdata</button>
      {dataList.map((val, key) => {
        return (
          <div>
            <p>ID:{val.ID}</p>
            <p>Name:{val.Name}</p>
            <div>
              <input placeholder="for update name" onChange={(event) => {
                setNewName(event.target.value)
              }}></input>
              <button onClick={updatedata(val.id)} >Save</button>
              <button onClick={deletedata(val.id)} >delete</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
