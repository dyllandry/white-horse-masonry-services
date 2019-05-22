import './styles/home.scss'
import lazyload from './scripts/lazyload.js'
import '../favicons/favicons.js'

const context = require.context(
  './images/gallery-images/home-gallery-images',
  false,
  /\.(jpe?g|png)$/
)

// Set header image's background manually
// Instead use url loader?
const headerImage = require('./images/header.jpg')
document.addEventListener(`DOMContentLoaded`, setHeaderBackgroundImage)
function setHeaderBackgroundImage () {
  const headerElement = document.getElementsByClassName('header--bg')[0]
  headerElement.style.backgroundImage = `url("${headerImage.placeholder}")`
  lazyload.init()
}
