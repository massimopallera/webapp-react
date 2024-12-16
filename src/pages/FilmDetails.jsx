import { useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext"
import { useEffect, useState } from "react"
import Reviews from "../components/Reviews"
import ReviewsForm from "../components/ReviewsForm"


export default function FilmDetails(){
    
    const [movie, setMovie] = useState()
    const [btn, setBtn] = useState('Add Review')
    const {getImg} = useGlobalContext()

    const params = useParams()
    
    
    useEffect( () => {fetch(`http://localhost:3000/${params.id}`)
    .then(resp => resp.json())
    .then(data => setMovie(data.result))
    },[])

    const navigate = useNavigate()

    // movie ? console.log(movie) : null
    // console.log(formData);



    function toggleForm(){
        const formEl = document.querySelector('form')
        formEl.classList.toggle('d-none')

        if(formEl.classList.contains('d-none')){
            setBtn('Close Review Form')
        } else {
            setBtn('Add Review')
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
                            <button className="btn btn-primary" onClick={() => {toggleForm()}}>{btn}</button>
                        </div>
                    </div>



                    {/* form */}
                    <ReviewsForm id={params.id}></ReviewsForm>

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