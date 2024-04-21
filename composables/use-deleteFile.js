
export const useDelete = () => {
    async function handleDeleteFile(id) {
        try {
            const token = useCookie("token");
            const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token.value}`
                },
            })
            return "deleted";
        } catch (error) {
            console.log("error occured when try to delete file to server => ", error);
            return "unable to delete file";
        }
    }
    return {
        handleDeleteFile
    }
}
