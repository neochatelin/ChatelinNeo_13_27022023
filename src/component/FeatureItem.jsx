import "../style/FeatureItem.scss"

function FeatureItem(props) {
    return(
        <div className="FeatureItem">
            <img src={props.src} alt={props.src} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}

export default FeatureItem;