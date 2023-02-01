const Error = (props) => {
    if (!props.isError) {
        return null
    }

    return (
        <div className="alert alert-danger" role="alert">
            {props.text}
        </div>
    )
}

export default Error
