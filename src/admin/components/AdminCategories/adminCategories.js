import React, { useState, useContext, useEffect, useRef } from "react";
import categoriesContext from "../../../context/categories/categoriesContext";
import CategoriesImageUpload from "../CategoriessImageUpload copy/CategoriesImageUpload";
import CategoriesImageUploadUpdate from "../CategoriessImageUpload copy/CategoriesImageUploadUpdate";
import "./adminCategories.css";

const AdminCategories = (props) => {
  const context = useContext(categoriesContext);
  const {
    categories,
    addCategories,
    fetchCategories,
    deleteCategory,
    editCategory,
  } = context;
  const [category, setCategory] = useState({
    name: "",
    ofType: props.ofType,
    logo: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const refEditClose = useRef(null);
  const refAddCategoryClose = useRef(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const handleEditClick = (e) => {
    console.log(category)
    editCategory(category._id, category);
    setSelectedImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategories(category);
    setCategory({ name: "", logo: null, ofType: props.ofType });
    setSelectedImage(null);
    refAddCategoryClose.current.click();
    // setCategoryInput("");
  };
  const handleChange = (e) => {
    return setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const [imageUrl, setImageUrl] = useState("");
  if (!imageUrl && category.logo && typeof category.logo === "object") {
    setImageUrl(category.logo.images[0].location);
  }
  return (
    <div>
      <div className="admin-categories-container p-2 rounded-4 mt-3 ">
        <div className="d-flex">
          <h3 className="my-2 mx-4">Categories</h3>
          <button
            type="button"
            className="admin-icon-button adminEditButtons"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
            id="add-admin-categories-button"
            onClick={() => {
              setCategory({ name: "", logo: null, ofType: props.ofType });
              setSelectedImage(null);
            }}
          >
            +
          </button>
        </div>
        {/* Add Category Modal*/}
        <div
          className="modal fade"
          id="addCategoryModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit} className="">
                <div className="modal-body">
                  <CategoriesImageUpload
                    category={category}
                    setCategory={setCategory}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                  <label className="m-2">Category Name </label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    onChange={handleChange}
                    value={category.name}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refAddCategoryClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary ${
                      category.name ? "" : "disabled"
                    }`}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="category-cards-admin">
          Rank Categories
          {categories.map((singleCategory) => {
            if (singleCategory.ofType === props.ofType) {
              return (
                <div className="d-flex justify-content-between m-1" key={singleCategory._id}>
                  <div className="admin-categorybox-name d-flex">
                    <div className="admin-category-rank-card me-4">
                      {singleCategory.rank}
                    </div>
                    {singleCategory.name}
                  </div>
                  <div className="admin-cateegory-buttons">
                    <button
                      type="button"
                      className="admin-icon-button adminEditButtons"
                      data-bs-toggle="modal"
                      data-bs-target="#editCategoryModal"
                      onClick={() => {
                        setCategory(singleCategory);
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/otherIcons/pen.svg"}
                        alt="Edit"
                      />
                    </button>
                    <button
                      onClick={() => {
                        deleteCategory(singleCategory._id);
                      }}
                      className="adminEditButtons"
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/otherIcons/delete.svg"}
                        alt="Edit"
                      />
                    </button>
                    {/*Edit Modal*/}
                    <div
                      className="modal fade"
                      id="editCategoryModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Edit Category {category.name}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <CategoriesImageUploadUpdate
                              category={category}
                              setCategory={setCategory}
                              imageUrl={imageUrl}
                              setImageUrl={setImageUrl}
                              selectedImage={selectedImage}
                              setSelectedImage={setSelectedImage}
                            />
                            <label className="mx-2 my-2">Category Name</label>
                            <input
                              type="text"
                              value={category.name}
                              name="name"
                              onChange={handleEditChange}
                            />
                            <br />
                            <label className="mx-2 my-2">Rank</label>
                            <input
                              type="text"
                              value={category.rank}
                              name="rank"
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                              ref={refEditClose}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                               handleEditClick();
                                window.location.reload();
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
