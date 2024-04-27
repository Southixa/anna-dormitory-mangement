

export const useStorage = () => {

    const token = useCookie("token");
    const upload = async (file) => {
        return new Promise( async (resolve, reject) => {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const respon = await $fetch('https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    },
                    body: formData
                })
                if(respon) {
                    resolve(respon);
                }
            } catch (error) {
                reject(error)
            }
        })
    }


    const remove = async (id) => {
        return new Promise( async (resolve, reject) => {
            try {
                const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    },
                })
                resolve(`${id} has been deleted`);
            } catch (error) {
                reject(error)
            }
        })
    }

    const update = async (idToDelete, fileToUpload) => {
        return new Promise( async (resolve, reject) => {
            try {
                const resultDelete = await remove(idToDelete);
                const resultUpload = await upload(fileToUpload);
                resolve(resultUpload);
            } catch(error) {
                reject(error);
            }
        }
    )}

    const getPresignUrl = async (id) => {
        return new Promise( async (resolve, reject) => {
            try {
                const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/${id}/presignedurl`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })
                //resize image
                respon.url = respon.url.replace("https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files", "https://ik.imagekit.io/hgpqliexx/tr:w-400,h-400")
                if(respon) {
                    resolve(respon)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        upload,
        remove,
        update,
        getPresignUrl
    }

}