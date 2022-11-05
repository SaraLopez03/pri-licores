const CloseCashierCard = ({list}) => {
    return(
        <div className="cards-closed mb-4 ">
            {list.map((item, i) => <p key={i} className="bold"> {item.name}: <span className="ms-1">{"$" + new Intl.NumberFormat('es-CL').format(item.value)}</span></p>)}
        </div>
    )
}

export default CloseCashierCard;