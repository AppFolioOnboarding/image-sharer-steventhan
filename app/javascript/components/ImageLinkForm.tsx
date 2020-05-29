import React, { FC, useState, ChangeEvent, MouseEvent, FormEvent } from "react";

export default function App(): JSX.Element {
  const [link, setLink] = useState("");

  function handleFormSubmit(fe: FormEvent) {
    fe.preventDefault();
    console.log(link);
  }

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="imageLink">Image link</label>
          <input 
            type="text" 
            className="form-control" 
            id="imageLink" 
            aria-describedby="imageHelp" 
            value={link}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setLink(e.target.value) }}
          />
          <small id="imageHelp" className="form-text text-muted">never share your email with anyone else.</small>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
