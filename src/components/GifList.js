/*
    Denna komponent ska ta emot en array med gif-objekt som props och rendera ut en lista med dessa.
    Varje gif-objekt ska renderas ut som en GifItem-komponent.
*/

const GifList = (props) => {
    const items = props.gifs.map((gif, index) => {
        return <GifItem url={gif.url} key={index} />
    });

    return <div className="text-container">{items}</div>
};

const GifItem = (props) => {
    return (
        <div className="gif-item">
            <img src={props.url} alt="" />
        </div>
    );
};

export default GifList;
