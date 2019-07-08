import './styles/home.scss'
import '../favicons/favicons.js'
import './styles/full-gallery.scss'
import imageGallery from './scripts/image-gallery'

// This context declaration with build only a subset of images, taking 1-2 minutes.
// const context = require.context(
//   './images/gallery-images/home-gallery-images/',
//   false,
//   /\.(jpe?g|png)$/
// )
// This context declaration will build ALL the images, taking several minutes.
const context = require.context(
  './images/gallery-images/all/',
  false,
  /\.(jpe?g|png)$/
)

const images = context.keys().map(context)

imageGallery.init(images)
