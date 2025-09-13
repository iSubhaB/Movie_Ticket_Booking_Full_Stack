import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  _id: string; // MongoDB uses _id
  title: string;
  type: string;
  releaseDate: string;
  totalLikes: string;
  length: string;
  rating: string;
  totalHalls: string;
  language: string;
  poster?: string; // added poster for thumbnail
}

export const Admin_Panel = () => {
  const ref1 = React.useRef<HTMLHeadingElement>(null);
  const [allmovies, setAllmovies] = useState<Movie[]>([]);
  const [photo, setPhoto] = React.useState<File>();
  const [newMovie, setNewMovie] = useState<Omit<Movie, "_id" | "poster">>({
    title: "",
    type: "",
    language: "",
    releaseDate: "",
    totalLikes: "",
    length: "",
    rating: "",
    totalHalls: "",
  });
  const navigate = useNavigate();

  const valUpd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const imgupload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.files?.[0]);
  };



  const handel_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!photo) {
      alert("Please upload an image");
      return;
    }

    const formdata = new FormData();
    formdata.append("poster", photo); // ✅ backend expects poster
    formdata.append("title", newMovie.title);
    formdata.append("type", newMovie.type);
    formdata.append("language", newMovie.language);
    formdata.append("releaseDate", newMovie.releaseDate);
    formdata.append("totalLikes", newMovie.totalLikes);
    formdata.append("length", newMovie.length);
    formdata.append("rating", String(newMovie.rating));
    formdata.append("totalHalls", String(newMovie.totalHalls));

    axios
      .post("http://localhost:3000/home/add-movie", formdata, {})
      .then((res) => {
        console.log(res.data.msg);
        ref1.current!.innerHTML = "Success";
      })
      .catch((err) => {
        console.log(err.message);
        ref1.current!.innerHTML = "Failed";
      });
  };



    React.useEffect(() => {
    axios
      .get("http://localhost:3000/home/all-movies") // fetch all movies
      .then((res) => {
        setAllmovies(res.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  },[handel_submit]);

  const handel_Delete = (_id: string) => {
   
    axios
      .delete("http://localhost:3000/home/delete", {
        data: { _id: _id }, // must be wrapped in "data"
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handel_Edit = (_id: any) => {
  
    navigate(`/editmovie/${_id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add New Movie</h2>
      <form className="card p-3 shadow-sm mb-4" onSubmit={handel_submit}>
        <div className="row g-2">
          <div className="col-md-3">
            <label className="form-label">Poster</label>
            <input
              type="file"
              name="poster"
              className="form-control"
              onChange={imgupload}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={valUpd}
              placeholder="Type movie Name"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Type</label>
            <input
              type="text"
              name="type"
              className="form-control"
              onChange={valUpd}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Language</label>
            <input
              type="text"
              name="language"
              className="form-control"
              onChange={valUpd}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              className="form-control"
              onChange={valUpd}
            />
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-md-2">
            <label className="form-label">Total Halls</label>
            <input
              type="number"
              name="totalHalls"
              className="form-control"
              onChange={valUpd}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Total Likes</label>
            <input
              type="number"
              name="totalLikes"
              className="form-control"
              onChange={valUpd}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Length</label>
            <input
              type="text"
              name="length"
              className="form-control"
              onChange={valUpd}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Rating</label>
            <input
              type="number"
              name="rating"
              className="form-control"
              onChange={valUpd}
            />
          </div>
          <div className="col-md-2 align-self-end">
            <button className="btn btn-success w-100" type="submit">
              ADD
            </button>
          </div>
        </div>
      </form>
      <h1 ref={ref1}></h1>

      <h2 className="mb-3">Movie List</h2>
      <div className="card p-3 shadow-sm">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Poster</th>
              <th style={{ maxWidth: "150px" }}>Title</th>
              <th>Type</th>
              <th>Language</th>
              <th>Release Date</th>
              <th>Total Halls</th>
              <th>Total Likes</th>
              <th>Length</th>
              <th>Rating</th>
              <th style={{ width: "140px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allmovies.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center">
                  No movies added yet
                </td>
              </tr>
            ) : (
              allmovies.map((movie) => (
                <tr key={movie._id}>
                  <td className="text-truncate" style={{ maxWidth: "120px" }}>
                    {movie._id}
                  </td>
                  <td>
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        style={{
                          width: "60px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                        className="rounded"
                      />
                    ) : (
                      <span className="text-muted">No Poster</span>
                    )}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}>
                    {movie.title}
                  </td>
                  <td>{movie.type}</td>
                  <td>{movie.language}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.totalHalls}</td>
                  <td>{movie.totalLikes}</td>
                  <td>{movie.length}</td>
                  <td>{movie.rating}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          handel_Edit(movie._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          handel_Delete(movie._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
