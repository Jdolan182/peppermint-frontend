import { useAxios } from "@/composables/request.js"
import { showSuccessBanner, showErrorBanner } from "@/composables/banners";

/**
 *
 * Upload image and return url of image
 *
 * @param {image} image
 * @returns {string}
 */
export const uploadImage = async (image) => {
   
    let params = new FormData();
    params.append('image', image);
    params.append('imageName', image.name);

    let config = { 
            headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const res = await useAxios.postImage('/api/image/upload', params, config)

    if(res.status != 200 && res.status == 400)
    {
        showErrorBanner("Error", "Error uploading Image");
        return false;
    }
    if (res.status == 200) {
        showSuccessBanner("Success", "Image uploaded successfully");

        return res.data.filename
    }
};
