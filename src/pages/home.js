import './styles/home.scss'
import './scripts/lazyload'

const headerImage = require('./images/header.jpg')

document.addEventListener(`DOMContentLoaded`, setHeaderBackgroundImage)

function setHeaderBackgroundImage () {
  const headerElement = document.getElementsByClassName('header--bg')[0]
  headerElement.style.backgroundImage = `url("${headerImage.placeholder}")`
}

