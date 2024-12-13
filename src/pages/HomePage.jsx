import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card"
import { useEffect,useState } from "react"

export default function HomePage(){
    
    const {movies, getImg} = useGlobalContext()    
    /* const [loading, setLoading] = useState(true);

   const loadingFunction =  useEffect(() => {
        let isMounted = true;
        const clock = setInterval(() => {
            if(!isMounted) return; // To not make useless processing
            if (movies.length) {
                clearInterval(clock);
                setLoading(false); // loading complete
            }
        }, 100);

        const timeout = setTimeout(() => {
            if (loading) {
                clearInterval(clock);
                setLoading(false); // loading complete (timeout)
            }
        }, 10000);

        return () => {
            isMounted = false;
            clearInterval(clock);
            clearTimeout(timeout);
        };
    }, [movies]); */

    
    return(
        <div className="container">
            <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-4 flex-wrap justify-content-center align-items-stretch">
            {movies.length !== 0 ? movies.map(movie => <Card key={movie.id} movie={movie} getImg={getImg}/>)
                
                :<div className="w-100 vh-100">
                    <h2 className="text-white">
                        No Films Found
                    </h2>   
                </div>
            }
                
            </div>
        </div>
    )
}