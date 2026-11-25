function Cell({tier,isSelected, onClick}){
    return ( <div className={isSelected ? 'cell selected' : 'cell'} onClick={onClick}>{tier} </div>
    )
}
export default Cell;
