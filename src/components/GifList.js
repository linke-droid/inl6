const GifList = (props) => {
    const items = props.gifs.map((gif, index) => {
        return <GifItem gif={gif} key={index} />
    });

    return <div className="container">{items}</div>
};

const GifItem = (props) => {
    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <img className="img-fluid" src={props.gif.images.original.url} alt="gif" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GifList;
