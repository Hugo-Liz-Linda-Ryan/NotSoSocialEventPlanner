function ExtraDetails(props) {
    return (
        <div className="details">
            <div className="expandedShowDesc">
            <button className="closeButton" onClick={props.handleClose} aria-label="closePopupWindow">X</button>
                {props.content}
            </div>
        </div>
    )
}

export default ExtraDetails