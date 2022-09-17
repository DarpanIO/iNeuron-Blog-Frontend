import React, { useState, useRef, useContext, useEffect } from "react";
import aboutContext from "../../../context/aboutUs/aboutContext";
import TrusteesImageUpload from "../TrusteesImageUpload/TrusteesImageUpload";
import TrusteesImageUploadUpdate from "../TrusteesImageUpload/TrusteesImageUploadUpdate";
import TrusteeCard from "./trusteeCard";

const Trustees = () => {
  const refClose = useRef(null);
  const editRef = useRef(null);
  const deleteRef = useRef(null);
  const refDeleteClose = useRef(null);
  const editRefClose = useRef(null);


  const context = useContext(aboutContext);
  const { trustees, addTrustee, editTrustee, getTrustee, deleteTrustee,setTrustee,trustee } =
    context;
  const [newTrustee, setNewTrustee] = useState(trustee)
  const [imageUrl,setImageUrl]=useState(null)
  useEffect(() => {
    getTrustee();
    setTrustee({
      name: "",
      position: "",
      description: "",
      photo: null
    })
  }, []);

  const updateTrustee = (currentTrustee) => {
    editRef.current.click();
    // setTrustee(currentTrustee);
    if(currentTrustee.photo){
      setImageUrl(currentTrustee.photo.images[0].location)
    }

    setNewTrustee(currentTrustee)
  };
  const deleteTrusteeClick = (currentTrustee) => {
    setTrustee(currentTrustee);
    deleteRef.current.click();
  };
  const handleChange = (e) => {
    setTrustee({ ...trustee, [e.target.name]: e.target.value });
    setNewTrustee({ ...newTrustee, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    addTrustee(trustee);
    setTrustee({ name: "", position: "", description: "" ,photo:null});
    refClose.current.click();
    window.location.reload();
  };
  const handleUpdateClick = (e) => {
    editTrustee(newTrustee._id, newTrustee);
    editRefClose.current.click();
    window.location.reload();
  };
  const handleDelete = () => {
    deleteTrustee(trustee._id);
    refDeleteClose.current.click();
  };

  return (
    <div>
      <h1 className="my-2">Trustees</h1>
      <hr />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTrusteeModal"
        onClick={()=>{
          setTrustee({
    name: "",
    position: "",
    description: "",
    photo:null
  })
        }}
      >
        Add Trustee
      </button>
      <div className="trustees-cards-admin d-flex flex-wrap py-4">
        {trustees.length>0 && trustees.map((Trustee) => {
          return (
            <TrusteeCard
              key={Trustee._id}
              Trustee={Trustee}
              updateTrustee={updateTrustee}
              deleteTrustee={deleteTrusteeClick}
            />
          );
        })}
      </div>

      {/* Add Trustee Modal */}
      <div
        className="modal fade"
        id="addTrusteeModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Trustee
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column">
            <TrusteesImageUpload trustee={trustee} setTrustee={setTrustee}/>
              <div className="input-field my-2">
                <div className="input-label my-1">Name</div>
                <input
                  type="text"
                  value={trustee?trustee.name:""}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="input-field my-2">
                <div className="input-label my-1">Position</div>
                <input
                  type="text"
                  value={trustee?trustee.position:""}
                  onChange={handleChange}
                  name="position"
                />
              </div>
              <div className="input-field my-2">
                <div className="input-label my-1">Description</div>
                <textarea
                  name="description"
                  value={trustee?trustee.description:""}
                  id=""
                  cols="30"
                  rows="4"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteTrusteeModal"
        ref={deleteRef}
      >
        Delete
      </button>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={editRef}
        data-bs-target="#editTrusteeModal"
      >
        Edit
      </button>

      <div
        className="modal fade"
        id="editTrusteeModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Modal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column">
            <TrusteesImageUploadUpdate trustee={newTrustee} setTrustee={setNewTrustee} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
              <div className="input-field my-2">
                <div className="input-label my-1">Name</div>
                <input
                  type="text"
                  value={newTrustee?newTrustee.name:""}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="input-field my-2">
                <div className="input-label my-1">Position</div>
                <input
                  type="text"
                  value={newTrustee.position}
                  onChange={handleChange}
                  name="position"
                />
              </div>
              <div className="input-field my-2">
                <div className="input-label my-1">Description</div>
                <textarea
                  name="description"
                  value={newTrustee.description}
                  id=""
                  cols="30"
                  rows="4"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={editRefClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleUpdateClick();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteTrusteeModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are You sure you want to delete {trustee.name} ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refDeleteClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleDelete();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trustees;
