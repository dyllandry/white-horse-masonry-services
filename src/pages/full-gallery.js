import './styles/home.scss'
import '../favicons/favicons.js'
import './styles/full-gallery.scss'
import imageGallery from './scripts/image-gallery'

const context = require.context(
  './images/gallery-images/home-gallery-images/',
  false,
  /\.(jpe?g|png)$/
)
const images = context.keys().map(context)

imageGallery.init(images)
