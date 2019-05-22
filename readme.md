# White Horse Masonry Services Static Site Generator
This is a freelance project by [Dylan Landry](https://github.com/dyllandry) to create a website for White Horse Masonry Services. The website is a client facing site with service benefits, contact information, and a gallery showcasing the company's past work.

This project is part of Dylan Landry's portfolio, and the code can be found on the [project's GitHub repository](https://github.com/dyllandry/white-horse-masonry-services).

*Whenever intructed to execute shell commands, this readme assumes you've navigated to this project's directory using your system's shell.*

## Install
**This Project requires Node version 11.10.0 due to a dependency's incompatability with new Node versions.**
1. Install [Node.js version 11.10.0](https://nodejs.org/en/) for your system.
1. Navigate to this directory using a shell
1. Execute `npm install` to install dependencies

## Configuration

## Usage
### Build
1. **WARNING**: Builds can be set to build the entire image gallery, or only a subset of it to reduce build times drastically. To do so, it is required that you navigate to `src/pages/full-gallery.js` and comment/uncomment lines 7 to 11 or 13 to 17, depending on your choice.
1. Execute `npm run build` to build a distributable version of the static site within the `dist/` directory. 

### Develop
1. Execute `npm run start:dev` to startup the webpack-dev-server and begin rebuilding changed files.

## Noteworthy Project Characteristics
1. Many images are built from each source image at multiple resolutions to better fit devices and network speeds. This is made possible by Webpack's [`require.context()` method](https://webpack.js.org/guides/dependency-management/#requirecontext) and the [responsive-loader](https://github.com/herrstucki/responsive-loader).
1. Images dont slow down site loading. First fuzzy placeholders are loaded, then later replaced by higher resolution version when network speeds allow.
1. Image gallery features both lazy loading, and a fullscreen photoviewer for taking a closer look at each photo.
1. Design is pretty clean and UX pretty smooth.