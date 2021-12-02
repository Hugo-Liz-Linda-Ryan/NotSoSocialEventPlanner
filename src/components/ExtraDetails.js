function ExtraDetails(props) {
    return (
        <div className="details">
            <button className="closeButton" onClick={props.handleClose} aria-label="closePopupWindow">X</button>
            {props.content}
        </div>
    )
}

export default ExtraDetails