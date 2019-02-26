document.addEventListener(`DOMContentLoaded`, function () {
  let lazyImages = [].slice.call(document.querySelectorAll(`img.lazy, .lazy-background-image`))

  if (`IntersectionObserver` in window) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          if (lazyImage.classList.contains('lazy')) {
            lazyImage.srcset = lazyImage.dataset.srcset
          } else if (lazyImage.classList.contains('lazy-background-image')) {
            lazyImage.style.backgroundImage = `url("${lazyImage.dataset.src}")`
          }
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage)
    })
  } else {
    // non-InteractionObserver dependent method
    console.log(`Interaction Observer is not supported! Falling back to bounding rectangle calculations for image lazyloading.`)
    let active = false // lock bool

    const lazyloadWithoutObserver = function () {
      if (active === false) {
        active = true
        setTimeout(() => {
          lazyImages.forEach(lazyImage => {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0)
              && getComputedStyle(lazyImage).display !== "none"
            ) {
              if (lazyImage.classList.contains('lazy')) {
                lazyImage.srcset = lazyImage.dataset.srcset
              } else if (lazyImage.classList.contains('lazy-background-image')) {
                lazyImage.style.backgroundImage = `url("${lazyImage.dataset.src}")`
              }

              lazyImages = lazyImages.filter(image => {
                return image !== lazyImage
              })

              if (lazyImages.length == 0) {
                document.removeEventListener(`scroll`, lazyloadWithoutObserver)
                window.removeEventListener(`resize`, lazyloadWithoutObserver)
                window.removeEventListener(`orientationchange`, lazyloadWithoutObserver)
              }
            }
          })
          active = false
        }, 200)
      }
    }

    document.addEventListener(`scroll`, lazyloadWithoutObserver)
    window.addEventListener(`resize`, lazyloadWithoutObserver)
    window.addEventListener(`orientationchange`, lazyloadWithoutObserver)
    lazyloadWithoutObserver()
  }
})

