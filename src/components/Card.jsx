import { useNavigate } from "react-router-dom"

export default function Card({movie, getImg}){
    
    const navigate = useNavigate()
    
    return(
    <div className="col my-3 "> 
        <div className="card bg-secondary-subtle border-0 shadow rounded-2 h-100">

            <img src={movie?.image || getImg} alt="" className="rounded-top-2" />

            <div className="px-3 my-2">
                <h3>{ movie.title}</h3>
                <p>{movie.abstract}</p>

                <div className="text-end">
                    <button 
                    className="btn btn-primary text-decoration-underline" 
                    onClick={() => (navigate(String(movie.id)))}
                    >
                        Go to details 
                        <i className="bi bi-chevron-double-right ps-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}