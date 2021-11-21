const Playlist_Card = ({name,image,description ,link}) => {
    
    return (
        <div className="bg-white rounded-2xl w-72 h-full py-5 px-4 flex flex-col gap-5 justify-center items-center md:w-1/5  break-words  md:h-1/3">
            <h1 className="text-xl font-bold text-green-400">
                 {name}    
            </h1>
            <img src={image} alt=""/>        
            <p className="text-lg font-bold text-green-400">{!description.includes("<a")&& description.slice(0,35)+"..."}</p>
            <a target="_blank" className="bg-green-400 p-4 font-semibold rounded-lg text-white no-underline" href={link}>Go to playlist</a>
        </div>
    )
}

export default Playlist_Card
