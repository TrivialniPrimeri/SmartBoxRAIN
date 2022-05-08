function Photos(props){
    return(
        <div>
            {props.photos.map((photo)=>(<Photo photo={photo}/>))}
        </div>
    )
}

export default Photos;