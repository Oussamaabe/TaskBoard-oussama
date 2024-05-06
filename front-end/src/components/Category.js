import React, { useState } from "react";
import GetCategories from "../hooks/GetCategories";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Category() {
  const categories = GetCategories();

  const [index, setIndex] = useState(-1);
  const [addCateg, setAddCateg] = useState(false);
  const [category, setCategory] = useState({
    nameCategory: "",
    color: "green",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch()

  function HandleChangeCateg(e) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  function StoreCategory(e) {
    e.preventDefault();

    if (category.nameCategory === "") {
      setError("Give a name to you category");
    } else if (
      categories.filter((categ) => categ.nameCategory === category.nameCategory)
        .length !== 0
    ) {
      setError("This category already exist");
    } else {
      axios.post("http://localhost:8000/api/categories", { ...category });
      window.location.reload();
    }
  }

  if (categories === "load") {
    return <div className="loader1"></div>;
  } else {
    return (
      <div>
        <p className="fw-bold fs-5">Task categories :</p>
        <div className="d-flex align-items-center gap-3 m-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
                setIndex(-1);
                dispatch({type:"storeCateg" , payload : 'all'})
              }}
            >
        <span
              className="catColor"
              style={{ backgroundColor: 'green' }}
            ></span>
            <span className={
                index === -1 && "fw-bold bg-body-secondary pt-0 pb-0 p-3 rounded"
              }>
              all
            </span>
        </div>
        {categories.map((categorie, i) => (
          <div
            key={i}
            className="d-flex align-items-center gap-3 m-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIndex(i);
              dispatch({type:"storeCateg" , payload : categorie.nameCategory})
            }}
          >
            <span
              className="catColor"
              style={{ backgroundColor: categorie.color }}
            ></span>
            <span
              className={
                i === index && "fw-bold bg-body-secondary pt-0 pb-0 p-3 rounded"
              }
            >
              {categorie.nameCategory}
            </span>
          </div>
        ))}
        <div>
          <lord-icon
            onClick={() => {
              setAddCateg((prev) => !prev);
            }}
            src="https://cdn.lordicon.com/zrkkrrpl.json"
            trigger="hover"
            stroke="bold"
            state="hover-swirl"
            style={{ width: "35px", height: "35px", cursor: "pointer" }}
          ></lord-icon>
        </div>
        {addCateg && (
          <form className="AddCategForm">
            <input
              type="text"
              placeholder="category name"
              name="nameCategory"
              onChange={(e) => HandleChangeCateg(e)}
            />
            <input
              type="color"
              name="color"
              onChange={(e) => HandleChangeCateg(e)}
            />
            <button onClick={StoreCategory}>add</button>
            <p>{error}</p>
          </form>
        )}
      </div>
    );
  }
}