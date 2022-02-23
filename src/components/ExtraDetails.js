function ExtraDetails(props) {
    return (
        <>
        <div className="details">
            <button className="closeButton" onClick={props.handleClose} aria-label="closePopupWindow">X</button>
            {props.content}
        </div>
        {/* Blocker in case users don't want to x out of the window */}
        <div className="blocker" onClick={props.handleClose}></div>
        </>
    )
}

export default ExtraDetails