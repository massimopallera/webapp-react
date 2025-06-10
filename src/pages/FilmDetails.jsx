import { useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext"
import { useEffect, useState } from "react"
import Reviews from "../components/Reviews"
import ReviewsForm from "../components/ReviewsForm"
import Loader from "../components/Loader"


export default function FilmDetails(){
    
    const [movie, setMovie] = useState()
    const [btn, setBtn] = useState('Add Review')
    const {getImg} = useGlobalContext()


    const [loading, setLoading] = useState(false)


    const params = useParams()
    
    

    useEffect( () => {fetch(`http://192.168.5.153:3000/${params.id}`)
    .then(resp => resp.json())
    .then(data => {setMovie(data.result); setLoading(false)})
    },[])

    const navigate = useNavigate()

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
        <div className="container">

        {loading ? <Loader /> :
            (movie &&
                <div className="">
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

                    <div className="d-flex align-items-center justify-content-center gap-5 mt-5 mb-4">
                        <h2 className=" text-light">Reviews</h2>
                        <div>
                            <button className="btn btn-primary" onClick={() => {toggleForm()}}>{btn}</button>
                        </div>
                    </div>

                    <ReviewsForm id={params.id}></ReviewsForm>

                    <div className="row gap-4">
                        {movie.reviews.map(review => <Reviews element={review} key={review.id}/> )}
                    </div>

                </div>
            )
        }

        </div>
    )
}