const createLogo = () => {
  const template = `
    <a href="/">
      <p class="logo"></p>
    </a>
  `
  return template
}
  
const createElement = (element, textNode) => {
  const template = `
    <${element}>${textNode}</${element}>
  `
  return template
}
 
const createImg = (src) => {
  const image = new Image()
  image.src = src
  return image
}

const hasProperty = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}


export default { createLogo, createElement, createImg, hasProperty }