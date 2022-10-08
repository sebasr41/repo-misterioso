import './Favorite.css'

const Favorite = ( { favorite } ) => {
  const { name, colors} = favorite
  return (
    <div className="fav-item">
      <span className="item-name">{name}</span>
      {
        colors.map( color => <div key={color} className="item-color" style={{backgroundColor: color}}></div>)
      }
    </div>
  )
}

export default Favorite