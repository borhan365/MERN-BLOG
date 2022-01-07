import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Context } from "../../context/Context";
// import "./TextEditor";
import "./write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [cat, setCat] = useState([]);
  const [checked, setChecked] = useState([]); 

  // fetch category name

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/categories");
      setCat(res.data);
    };
    fetchCategories();
  }, []);

  const handleToggle = (category) => {
    const clickedCategory = checked.indexOf(category);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(category);
    } else {
      all.splice(clickedCategory, 1);
      console.log(all);
      setChecked(all);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cat,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          {/* <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea> */}
          {/* <EditorToolbar toolbarId={'t1'}/> */}
          <ReactQuill theme="snow" value={desc} onChange={setDesc} />
          {/* <ReactQuill
              theme="snow"
              value={desc}
              onChange={changeHandler}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            /> */}
        </div>
        <div className="categorylist">
          <h2>Category</h2>
          <ul>
            {cat.map((item, index) => (
              <li key={index}>
                <label class="check-container">
                  {item.name}
                  <input onChange={handleToggle(item._id)} type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
