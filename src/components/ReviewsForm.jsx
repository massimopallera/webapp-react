import { useState } from "react"

const initialFormData ={ 
    name: "",
    text: "",
    vote : 0
}

const initialFormMessage = ''

export default function ReviewsForm({id}){

    const [formData, setFormData] = useState(initialFormData)
    const [formMessage, setFormMessage] = useState(initialFormMessage)

    function handleSubmit(e) {
        
        e.preventDefault()
        if (formData.vote < 0 || formData.vote > 5) return formMsg(false, 'vote must be between 0 and 5')
        if (formData.text == '') return formMsg(false,'text is empty')
        if (formData.name == '') return formMsg(false, 'username is empty')

        if(formData != initialFormData){
            fetch(`http://192.168.5.153:3000/${id}`, {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({...formData})
            })
            .then(response => formMsg(response))
        }
    }

    function formMsg(bool, message=null){
        if (bool) {
            window.location.reload()
            setFormMessage(message ? message : 'Success')
        } else setFormMessage(message ? message :'Failed')


        setTimeout(() => {
            setFormMessage('')
        },2000)
    }

    return(
        <div>
            <form className="my-5 needs-validation row align-items-center" onSubmit={(e) => handleSubmit(e)} noValidate>

                <div className="col-md-4">
                    <label htmlFor="username" className="form-label text-white">Username</label>
                    <input placeholder="Insert Username" type="text" className="form-control" id="username" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value})}} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>


                <div className="col-md-4">
                    <label htmlFor="review" className="form-label text-white">Review</label>
                    <input placeholder="Insert Review" type="text" className="form-control" id="review" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>

                {/* rating stars */}
                <div className="col-md-4 d-flex text-warning" style={{cursor:"pointer"}}>
                    {[1, 2, 3, 4, 5].map(n => 
                        <i 
                            key={n} 
                            className={`bi bi-star${n <= formData.vote ? '-fill' : ''} `} 
                            onClick={() => setFormData({...formData, vote: n})}
                        ></i>
                    )}
                </div>

                <div className="text-center my-4">
                    <button type="submit" className="btn btn-success px-5 py-2">Post</button>
                </div>


                {/* put state of post form here */}
                <h3 className="text-white">{formMessage}</h3>

            </form>
        </div>
    )
}