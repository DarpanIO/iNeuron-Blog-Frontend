import React,{useState} from "react";
import AboutContext from "./aboutContext";


const AboutState=(props)=>{
  const host = "http://localhost:4000"
        // const host = "http://192.168.1.6:4000"
    const [description, setDescription] = useState("")
    const [descriptionId, setDescriptionId] = useState("")
    const [trustees,setTrustees]=useState([])
    const [trustee, setTrustee] = useState({
      name: "",
      position: "",
      description: "",
      photo: null
    });


//Fetching About Us Description
  const fetchAboutUsDescription = async (id) => {
    const response = await fetch(`${host}/aboutus/getDes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setDescription(json.description)
    setDescriptionId(json._id)
    // console.log(json)
  };

//Editing About Us
const editAboutUsDescription = async () => {
    const response = await fetch(`${host}/aboutus/updateDes/${descriptionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({description:description})
    });
    const json = await response.json();
    setDescription(json.description)
    setDescriptionId(json._id)
    alert("AboutUs Updated")
    // console.log(json)
  };

const addTrustee = async (trustee)=>{
  const response = await fetch(`${host}/aboutus/addTrustee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(trustee),
  });
  const newTrustee = await response.json();
    setTrustees(trustees.concat(newTrustee))
  }

const getTrustee = async ()=>{
    const response = await fetch(`${host}/aboutus/getTrustee `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setTrustees(json.getTrustee);
}
const editTrustee = async(id,trustee)=>{

  const response = await fetch(`${host}/aboutus/updateTrustee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
    body: JSON.stringify(trustee)
  });

  let newTrustees = JSON.parse(JSON.stringify(trustees));
  for (let index = 0; index < trustees.length; index++) {
    const element = newTrustees[index];
    if (element._id=== id) {
      newTrustees[index].name = trustee.name;
      newTrustees[index].position = trustee.position;
      newTrustees[index].description = trustee.description;
      break;
    }
  }
  setTrustees(newTrustees);
  }

const deleteTrustee = async (_id) => {
    //TODO : API CAll
    const response = await fetch(`${host}/aboutus/deleteTrustee/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newTrustees = trustees.filter((trustee) => {
      return trustee._id !== _id;
    });
    setTrustees(newTrustees);
  };
    return(
        <AboutContext.Provider 
        value={{
            description,
            setDescription,
            fetchAboutUsDescription,
            editAboutUsDescription,
            trustees,
            addTrustee,
            editTrustee,
            getTrustee,
            deleteTrustee,
            trustee,
            setTrustee
        }}
        >
            {props.children}
        </AboutContext.Provider>
    )
}

export default AboutState;