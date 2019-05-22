import lazyload from './lazyload'
import Masonry from 'masonry-layout'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import 'photoswipe/dist/photoswipe.min.js'
import 'photoswipe/dist/photoswipe-ui-default.min.js'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
const template = require(`../partials/image-gallery.pug`)

export default {
  init: init
}

function init (images) {
  const imageHtml = template({ images: images })
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid') 
    grid.innerHTML += imageHtml

    const masonry = new Masonry (grid, {
      itemSelector: `.grid-item`,
      columnWidth: `.grid-sizer`,
      percentPosition: true
    })

    window.addEventListener('load', () => {
      masonry.once('layoutComplete', () => {
        document.querySelector('.grid-container').style.opacity = '1'
        lazyload.init({
          masonry: {
            object: masonry,
            selector: `grid-item`
          }
        })
      })
      masonry.layout()
    })

    const pswpImages = images.map(image => {
      return {
        src: image.images[image.images.length-1].path,
        w: image.images[image.images.length-1].width,
        h: image.images[image.images.length-1].height
      }
    })

    const pswpHtmlElements  = document.querySelectorAll(`.pswp-image`)
    pswpHtmlElements.forEach((image, index) => {
      image.addEventListener(`click`, () => {
        const pswpElement = document.querySelector(`.pswp`)
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pswpImages, {index: index})
        gallery.init()
      })
    })
  })
}
