export default function Reviews({element}){
    return(
            <div className="col-12">
                <div className="card px-3 py-4 shadow bg-secondary-subtle">
                    <h4 className="mb-3">{element.username}</h4>
                    <p>{element.content}</p>
                </div>
            </div>
    )
}