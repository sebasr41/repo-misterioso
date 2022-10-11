import './Favorite.css'

const Favorite = ( { favorite } ) => {
  const { timezone, temperature} = favorite
  return (
    <div className="fav-item">
      <span className="item-name">{timezone}</span>
      <span className="item-name">{temperature}</span>
    </div>
  )
}

export default Favorite