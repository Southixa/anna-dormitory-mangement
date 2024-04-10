<template>
    <div class="max-w-screen-lg mx-auto my-4 mb-12 flex gap-8">
        <div class="w-72 h-72 bg-white rounded-md shadow px-4 py-3">
            <p class="text-sm">ຮູບພາບ</p>
            <p class="text-gray-500">ເລືອກຮູບພາບ</p>
            <div class="flex justify-center mt-6 mb-8">
                <div class="w-24 h-24 bg-gray-400 rounded-full">
                    
                </div>
            </div>
            <div class="flex justify-between px-2">
                <div class="h-12 w-12 bg-gray-300 rounded-full">

                </div>
                <div class="h-12 w-12 bg-gray-300 rounded-full">

                </div>
                <div class="h-12 w-12 bg-gray-300 rounded-full">

                </div>
                <div class="h-12 w-12 bg-gray-300 rounded-full">

                </div>
            </div>
        </div>
        <div class="grow bg-white rounded-md shadow px-6 py-5">
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ຊື່" path="firstname">
                    <n-input 
                    placeholder="ປ້ອນຊື່..." 
                    v-model:value="formValue.firstname" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ນາມສະກຸນ" path="lastname">
                    <n-input 
                    placeholder="ປ້ອນນາມສະກຸນ..." 
                    v-model:value="formValue.lastname" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ເບີໂທ" path="phone">
                    <n-input
                    placeholder="ປ້ອນເບີໂທ...(ex: 20 5583734)" 
                    v-model:value="formValue.phone" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ອີເມວ" path="email">
                    <n-input 
                    placeholder="ປ້ອນອີເມວ..." 
                    v-model:value="formValue.email" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ລະຫັດຜ່ານ" path="password">
                    <n-input 
                    placeholder="ປ້ອນລະຫັດຜ່ານ..." 
                    v-model:value="formValue.password" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ສະຖານະເຂົ້າໃຊ້ເວັບໄຊ" path="isApproved">
                    <n-select 
                    v-model:value="formValue.isApproved" 
                    :options="statusOptions" 
                    default-value="approved" 
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/user">
                    <n-button :disabled="loading" tertiary color="#002749" size="large" class="w-40 shadow font-normal">
                        ຍົກເລີກ
                    </n-button>
                </NuxtLink>
                <n-button @click="handleAdd" :loading="loading" type="primary" color="#002749" size="large" class="w-40 shadow font-normal">
                    ບັນທຶກ
                </n-button>
            </div>
            
        </div>
    </div>
</template>

<script setup>

import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';

const message = useMessage();

const formRef = ref(null);
const size = ref('large');
const formValue = ref({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    isApproved: "ອະນຸມັດແລ້ວ"
})

const rules = {
  firstname: {
    required: true,
    message: 'ກະລຸນາໃສ່ຊື່',
    trigger: 'blur',
  },
  lastname: {
    required: true,
    message: 'ກະລຸນາໃສ່ນາມສະກຸນ',
    trigger: 'blur',
  },
  phone: {
    required: true,
    validator (rule, value) {
        if (!value) {
            return new Error('ກະລຸນາໃສ່ເບີໂທ')
        } else if (!/^\d*$/.test(value)) {
            return new Error('ເບີໂທຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
        }
        return true
        },
        trigger: ['input', 'blur']
  },
  email: {
    required: true,
    validator(rule, value) {
        if(!value) {
            return new Error("ກະລຸນາໃສ່ອີເມລ")
        } else if (!(/@gmail.com/i.test(value))){
            return new Error("ກະລຸນາໃສ່ @gmail.com")
        }
        return true
    },
    trigger: 'blur',
  },
  password: {
    required: true,
    message: 'ກະລຸນາໃສ່ລະຫັດຜ່ານ',
    trigger: 'blur',
  },
  isApproved: {
    required: true,
    message: 'ກະລຸນາເລືອກສະນານະເຂົ້າໃຊ້ງານເວັບໄຊ',
    trigger: 'blur',
  },
};

const statusOptions =  ref([
    {
        label: 'ອະນຸມັດແລ້ວ',
        value: 'approved',
    },
    {
        label: 'ຍັງບໍ່ໄດ້ອະນຸມັດ',
        value: 'notApproved'
    },
]);

const loading = ref(false);


function handleAdd() {
    try{
        formRef.value?.validate((errors) => {
            if(!errors) {
                loading.value = true;
            } else {
                message.error("ບໍ່ສາມາດບັນທຶກຂໍ້ມູນນີ້ໄດ້")
            }
        });
    } catch (error) {

    }
    console.log("called handle Add");
}


</script>