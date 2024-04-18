
const handleUploadFile2 =  async (file) => {
    try {
        const token = useCookie("token");
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
            return respon.id;
        }
    } catch (error) {
        console.log("error occured when try to upload file to server => ", error);
        return "";
    }
}

export default handleUploadFile2;