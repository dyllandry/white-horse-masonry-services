const useObserver = `IntersectionObserver` in window
let lazyImages = []
let masonry = undefined 
let observer = undefined 
let rectIntervalId = undefined

export default {
  init: init,
}

function init (options) {
  lazyImages = [].slice.call(document.querySelectorAll(`img.lazy, .lazy-background-image`))
  masonry = (options !== undefined && options.masonry !== undefined) ? options.masonry : undefined 
  if (useObserver) {
    observer = makeObserver()
    lazyImages.forEach(img => observer.observe(img))
  } else {
    startRectInterval()
  }
}

function startRectInterval () {
  if (rectIntervalId !== undefined) return
  rectIntervalId = setInterval(() => {
    lazyImages.forEach(image => {
      if (image.getBoundingClientRect().top <= window.innerHeight) {
        if (image.getBoundingClientRect().bottom >= 0) {
          if (getComputedStyle(image).display !== "none") {
            if (image.classList.contains('lazy')) {
              image.srcset = image.dataset.srcset
              image.classList.remove('lazy')
            } else if (image.classList.contains('lazy-background-image')) {
              image.style.backgroundImage = `url("${image.dataset.src}")`
              image.classList.remove('lazy-background-image')
            }
            lazyImages = lazyImages.filter(imageInArray => {
              return imageInArray !== image
            })


            if (masonry !== undefined && image.classList.contains(masonry.selector)) {
              masonry.object.layout()
            }
          }
        }
      }
    })

    if (lazyImages.length == 0) {
      clearInterval(rectIntervalId)
      rectIntervalId = undefined
    }
  }, 500)
}

function makeObserver () {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const image = entry.target
      if (image.classList.contains('lazy')) {
        image.srcset = image.dataset.srcset
        image.classList.remove('lazy')
      } else if (image.classList.contains('lazy-background-image')) {
        image.style.backgroundImage = `url("${image.dataset.src}")`
        image.classList.remove('lazy-background-image')
      }
      observer.unobserve(image)
      if (masonry != undefined && image.classList.contains(masonry.selector)) {
        masonry.object.layout()
      }
    })
  })
}

function logWithTime(template) {
  const date = new Date()
  console.log(`${date.getSeconds()}.${date.getMilliseconds()}: ${template}`)
}
