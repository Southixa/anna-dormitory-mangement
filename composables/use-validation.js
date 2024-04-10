export const useValidation = () => {
    async function login (formRef) {
        const result = await formRef?.validate((errors) => {
            return errors
        });
        console.log(result);
    }
    return { login }
}