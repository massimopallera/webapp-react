import { useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext"
import { useEffect, useState } from "react"
import Reviews from "../components/Reviews"


const initialFormData ={ 
    name: "",
    text: "",
    vote : 0
}

export default function FilmDetails(){
    
    const [movie, setMovie] = useState()
    const [formData, setFormData] = useState(initialFormData)
    const {getImg} = useGlobalContext()

    const params = useParams()
    
    
    useEffect( () => {fetch(`http://localhost:3000/${params.id}`)
    .then(resp => resp.json())
    .then(data => setMovie(data.result))
    },[])

    const navigate = useNavigate()

    // movie ? console.log(movie) : null
    // console.log(formData);



    // to move to component
    function handleSubmit(e) {
        e.preventDefault()
        if(formData != initialFormData){
            fetch(`http://localhost:3000/${params.id}`, {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({...formData})
            })
            .then(response => console.log(response)
            )
            .then(data => {window.location.reload()}) //reload page
        }
        
        
    }

    
    return(
        <>
            {movie &&
                // create component for single film card
                <div className="container">
                    <div className="d-flex border border-dark-subtle rounded shadow bg-secondary-subtle">
                        <div className="w-25">
                            <img src={getImg} alt={'img'} className="img-fluid rounded" />
                        </div>
                        <div className="px-4 py-2 flex-grow-1">
                            <h1>{movie.movie.title}</h1>
                            <p>{movie.movie.abstract}</p>
                        </div>

                        <div className="align-self-end mb-4 pe-4">
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>Home</button>

                        </div>
                    </div>

                    {/* add a form to create new reviews, remember to refresh the reviews then */}

                    <div className="d-flex align-items-center justify-content-center gap-5 mt-5 mb-4">
                        <h2 className=" text-light">Reviews</h2>
                        <div>
                            <button className="btn btn-primary" onClick={() => toggleForm}>Add Review</button>
                        </div>
                    </div>



                    {/* form */}
                    <div>
                        <form className="my-5 needs-validation" onSubmit={(e) => handleSubmit(e)} noValidate>
                            <div className="col-md-4">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input placeholder="Insert Username" type="text" className="form-control" id="username" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value})}} required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>


                            <div className="col-md-4">
                                <label htmlFor="review" className="form-label">Review</label>
                                <input placeholder="Insert Review" type="text" className="form-control" id="review" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            {/* stars */}
                            <div className="d-flex text-warning">
                                {[1, 2, 3, 4, 5].map(n => 
                                    <i 
                                        key={n} 
                                        className={`bi bi-star${n <= formData.vote ? '-fill' : ''} `} 
                                        onClick={() => setFormData({...formData, vote: n})}
                                    ></i>
                                )}
                            </div>


                            <button type="submit">Post</button>

                        </form>
                    </div>

                    <div className="row gap-4">
                    {/* create component for reviews card (or maybe all the container ^_^ -- new */}
                        {movie.reviews.map(review => <Reviews element={review} key={review.id}/> )}
                    </div>

                </div>
            }
            {!movie &&
                <h1>Film not found</h1>
            }
        </>
    )
}