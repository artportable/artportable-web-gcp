import { AwPrintImage } from '../models/AwPrintImage'

const sortByIndex = (a, b) => {
  if (a.index > b.index) return 1
  if (a.index < b.index) return -1
  return 0
}

// Find the image with drawBorder:true (an artwork/print) with the lowest index.
const findFirstFramedImage = (images: AwPrintImage[]) => {
  // console.log('images', Array.isArray(images), images);
  
	let sortedImages = images.sort(sortByIndex)
  const firstFramedImage = images.find(image => image.drawBorder)

	return firstFramedImage || null
}

// Find the image with drawBorder:false (an environment image) with the lowest index.
const findFirstNotFramedImage = (images: AwPrintImage[]) => {
	let sortedImages = images.sort(sortByIndex)
  const firstNotFramedImage = images.find(image => !image.drawBorder)

	return firstNotFramedImage || null
}

// Values for images set in Artworks Portal, convert to values usable in css object-position.
const IMAGE_POSITIONS = {
  center: 'center',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  'top left': '0% 0%',
  'top right': '100% 0%',
  'bottom left': '0% 100%',
  'bottom right': '100% 100%',
}
const convertImagePosition = (position) => {
  return IMAGE_POSITIONS[position] || 'center'
}

export {
  findFirstFramedImage, findFirstNotFramedImage, convertImagePosition,
}