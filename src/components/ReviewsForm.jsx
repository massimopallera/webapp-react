import { useState } from "react"


const initialFormData ={ 
    name: "",
    text: "",
    vote : 0
}


export default function ReviewsForm({id}){

    const [formData, setFormData] = useState(initialFormData)

    function handleSubmit(e) {
        e.preventDefault()
        if(formData != initialFormData){
            fetch(`http://localhost:3000/${id}`, {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({...formData})
            })
            .then(response => console.log(response)
            )
            .then(() => {window.location.reload()}) //reload page
        }   
    }



    return(
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

                {/* rating stars */}
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
    )
}