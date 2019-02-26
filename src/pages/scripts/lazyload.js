document.addEventListener(`DOMContentLoaded`, function () {
  const lazyImages = [].slice.call(document.querySelectorAll(`img.lazy, .lazy-background-image`))
  if (`IntersectionObserver` in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const lazyImage = entry.target
        console.log(lazyImage)
        if (lazyImage.classList.contains('lazy')) {
          lazyImage.srcset = lazyImage.dataset.srcset
        } else if (lazyImage.classList.contains('lazy-background-image')) {
          console.log(lazyImage.style.backgroundImage)
          lazyImage.style.backgroundImage = `url("${lazyImage.dataset.src}")`
        }
        lazyImageObserver.unobserve(lazyImage)
      })
    })

    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage)
    })
  }
})
