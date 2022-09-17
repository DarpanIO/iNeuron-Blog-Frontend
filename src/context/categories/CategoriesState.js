import React, { useState } from "react";
import CategoryContext from "./categoriesContext";


const CategoryState = (props) => {
  const host = "http://localhost:4000";
  // const host = "http://192.168.1.6:4000";
  const [categories, setCategories] = useState([]);

  const addCategories = async (content) => {
    const response = await fetch(`${host}/api/addcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(content),
    });
    //   console.log(response.json());
    const Category = await response.json();
    setCategories(categories.concat(Category));
  };

  const fetchCategories = async () => {
    const response = await fetch(`${host}/api/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Category = await response.json();
    //   console.log(Category.get_category)
    setCategories(Category.get_category);
    //   console.log(Categories)
  };

  const deleteCategory = async (_id) => {
    //TODO : API CAll
    const response = await fetch(`${host}/api/deleteCategory/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newCategories = categories.filter((category) => {
      return category._id !== _id;
    });
    setCategories(newCategories);
  };

  const editCategory = async (id, category) => {
    // API Call
    const response = await fetch(`${host}/api/updatecategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(category),
    });
    const json = response.json();
    //Logic to edit in client
    let newCategories = JSON.parse(JSON.stringify(categories));
    for (let index = 0; index < categories.length; index++) {
      const element = newCategories[index];
      if (element._id === id) {
        newCategories[index].name = category.name;
        break;
      }
    }
    setCategories(newCategories);
  };
  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        addCategories,
        fetchCategories,
        deleteCategory,
        editCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
