import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';

interface Movie {
  title: string;
  type: string;
  releaseDate: string;
  totalLikes: string;
  length: string;
  rating: string;
  totalHalls: string;
  language: string;
}

export const Edit_Movie = () => {
  const ref1 = React.useRef<HTMLHeadingElement>(null)
  const [newdata, setnewdata] = React.useState<Movie>({
    title: "",
    type: "",
    releaseDate: "",
    totalLikes: "",
    length: "",
    rating: "",
    totalHalls: "",
    language: ""
  });

  const { _id } = useParams();

  const valUpd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewdata({ ...newdata, [e.target.name]: e.target.value })
  }

  const handel_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post(`http://localhost:3000/home/update/${_id}`, {
      title: newdata.title,
      type: newdata.type,
      releaseDate: newdata.releaseDate,
      totalLikes: newdata.totalLikes,
      length: newdata.length,
      rating: newdata.rating,
      totalHalls: newdata.totalHalls,
      language: newdata.language
    })
      .then((res) => {
         ref1.current!.innerHTML = "Successfully Updated Movie Details"
        setTimeout(() => {
         ref1.current!.innerHTML ="" 
        }, 3000);
       
      }).catch((err) => {
        console.log(err);
        ref1.current!.innerHTML = "Update Failed"
        setTimeout(() => {
              ref1.current!.innerHTML =""
        }, 3000);
        
      })
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Edit Movie Details</h2>
        <form onSubmit={handel_submit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input type="text" name='title' value={newdata.title} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <input type="text" name='type' value={newdata.type} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Language</label>
              <input type="text" name='language' value={newdata.language} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Release Date</label>
              <input type="date" name='releaseDate' value={newdata.releaseDate} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Total Likes</label>
              <input type="number" name='totalLikes' value={newdata.totalLikes} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Length</label>
              <input type="text" name='length' value={newdata.length} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Rating</label>
              <input type="number" name='rating' value={newdata.rating} onChange={valUpd} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Total Halls</label>
              <input type="number" name='totalHalls' value={newdata.totalHalls} onChange={valUpd} className="form-control" />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary w-50">Update Movie</button>
          </div>
        </form>
        <h4 ref={ref1} className="text-center mt-3 text-success"></h4>
      </div>
    </div>
  )
}
