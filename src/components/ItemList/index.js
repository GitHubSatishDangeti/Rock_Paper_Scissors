const ItemList = props => {
  const {itemdetails, buttonClick} = props
  const {imageUrl, id} = itemdetails
  const altkey = id.toLowerCase()
  const altKey = `${altkey}Button`

  const onButtonClick = () => {
    buttonClick(id)
  }

  return (
    <li>
      <button data-testid={altKey} onClick={onButtonClick} type="button">
        <img width="50px" src={imageUrl} alt={id} />
      </button>
    </li>
  )
}
export default ItemList
