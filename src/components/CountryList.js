/* 
    denna komponenten skapar en lista med alla länder som hämtas från API:et
    och skickar vidare varje land till CountryItem komponenten.
    sen renderar den ut alla länder i en div med klassen text-container.
*/

const CountryList = (props) => {
    const items = props.country.map((country, index) => {
        return <CountryItem country={country} key={index} />
    });

    return <div className="text-container">{items}</div>
};

const CountryItem = (props) => {
    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12">
                    <img className="img-fluid m-2" src={props.country.flags.png} alt="flag" />
                    <h2>{props.country.name.common}</h2>
                    <p>Capital: {props.country.capital}</p>
                    <p>Region: {props.country.region}</p>
                    <p>Population: {props.country.population}</p>
                </div>
            </div>
        </div>
    );
}

export default CountryList;