<template>
    <div class="bg-[#f4f5fa] w-full h-screen flex justify-center items-center">
        <div class="w-[500px] h-[500px] bg-white shadow-xl rounded-md p-8">
            <h1 class="text-center font-semibold text-xl text-gray-700">ລະບົບຈັດການຫໍພັກແອນນາ</h1>
            <h2 class="mt-8 text-xl text-gray-700">ຍິນດີຕ້ອນຮັບ 👋</h2>
            <p class="text-gray-400 mt-2">ກະລຸນາເຂົ້າສູ່ລະບົດດ້ວຍອີເມວ ແລະ ລະຫັດຜ່ານ</p>
            <n-input :disabled="loading" v-model:value="user.email" type="text" placeholder="ອີເມວລ" class="mt-4 rounded-md" size="large"/>
            <n-input
                :disabled="loading"
                v-model:value="user.password"
                type="password"
                show-password-on="click"
                placeholder="ລະຫັດຜ່ານ"
                :maxlength="20"
                class="mt-4 rounded-md"
                size="large"
                >
                <template #password-visible-icon>
                    <n-icon :size="16" :component="EyeOutline" />
                </template>
                <template #password-invisible-icon>
                    <n-icon :size="16" :component="EyeOffOutline" />
                </template>
            </n-input>
            <n-button :loading="loading" @click="handleLogin" type="primary" class="rounded-md mt-16 w-full text-white" size="large">
                ເຂົ້າສຸ່ລະບົບ
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';
import { onMounted } from 'vue';

const message = useMessage();
const { login, logout } = useStaff();


definePageMeta({
    layout: 'blank'
})

const user = ref({
    email: 'southixa.pele@gmail.com',
    password: '12345678'
})

const loading = ref(false);

const handleLogin = async () => {
    loading.value = true
    await login(user.value.email, user.value.password)
    loading.value = false
}
onMounted( async () => {
    await logout();
})

</script>