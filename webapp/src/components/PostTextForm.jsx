import { useState, use } from "react";

const PostForm = (params) => {
  const {text, setText} = params;


  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
      <>
      <div className="input-group">
        <textarea name="text" value={text} rows="15" cols="33" onChange={handleTextChange} />
      </div>
    </>
  );
};



export default PostForm;