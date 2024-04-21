
const handleDeleteFile =  async (id) => {
    try {
        const token = useCookie("token");
        const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
        })
        console.log(respon);
        if(respon) {
            return "deleted";
        }
    } catch (error) {
        console.log("error occured when try to delete file to server => ", error);
        return "unable to delete file";
    }
}

export default handleDeleteFile;