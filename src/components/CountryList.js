const CountryList = (props =>
    props.country.map((country, index) => {
        return (
            <div className="card" key={index}>
                <div className="card-body">
                    <h5 className="card-title">{country.name.common}</h5>
                </div>
            </div>
        )
    })
)

export default CountryList; 