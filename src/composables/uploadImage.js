import { useAxios } from "@/composables/request.js"

/**
 *
 * Upload image and return url of image
 *
 * @param {image} image
 * @returns {string}
 */
export const uploadImage = async (image) => {
   
    const params = {
        image: image,
    }

    const res = await useAxios.post('/api/image/upload', params)

    if(res.status != 201 && res.response.status == 401)
    {
        showErrorBanner("Error", "Error uploading Image");
    }
    if (res.status == 201) {
        showSuccessBanner("Success", "Image uploaded successfully");

        console.log(res);
    }
    else if(res.status == 404) {
        showErrorBanner("Error", "Error uploading Image");
    }
};
