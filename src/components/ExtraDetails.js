function ExtraDetails(props) {
    return (
        <div className="details">
            <button className="closeBox" onClick={props.handleClose} aria-label="closePopupWindow">CLOSE</button>
            <div className="showDescription">
                {props.content}
            </div>
        </div>
    )
}

export default ExtraDetails