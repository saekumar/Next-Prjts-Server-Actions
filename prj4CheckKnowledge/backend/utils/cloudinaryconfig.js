import { v2 as cloudinary } from 'cloudinary'
export const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: 'dwp75ziq4',
      api_key: '366732429834142',
      api_secret: 'uoaBq6RGE5HM-sYjRnVp597C1CI',
    })
    console.log('Cloudinary configuration successful')
  } catch (error) {
    console.log(`error at cloudinary : ${error.message}`)
  }
}

export const uploadImage = async (imagePath) => {
  await cloudinaryConfig() // Ensure Cloudinary is configured
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'BlogApp', // Specify folder
    })
    console.log(result)
    return result // Return the uploaded image URL
  } catch (error) {
    console.error(`Error uploading to Cloudinary: ${error.message}`)
    throw error
  }
}

export const deleteImageFromCloudinary = async (imageId) => {
  try {
    await cloudinary.uploader.destroy(imageId)
  } catch (error) {
    throw error.message
  }
}
