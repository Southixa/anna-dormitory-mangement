<template>
    <div class="max-w-screen-lg mx-auto my-4 mb-12 flex gap-8">
        <div class="w-72 h-fit bg-white rounded-md shadow px-4 py-3">
            <p class="text-sm">ຮູບພາບ</p>
            <p class="text-gray-500">ອັບໂຫຼດຮູບພາບຂະໝາດ 2:1 ຫຼື 640px x 360px</p>
            <div class="mb-8 mt-8 flex justify-center items-center">
                <div>
                    <img v-if="previewImage" :src="previewImage" class="w-60 h-60 rounded-full object-cover"/>
                    <n-upload
                        multiple
                        directory-dnd
                        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        :max="1"
                        @change="handleSelectFile"
                        :default-upload="false"
                    >
                        <n-upload-dragger  v-if="!previewImage" class="rounded-full bg-white h-60 w-60 relative">
                            <div>
                                <div style="margin-bottom: 12px">
                                    <n-icon size="48" :depth="3" class="mt-6">
                                    <archive-icon />
                                    </n-icon>
                                </div>
                                <n-text style="font-size: 16px" class="underline text-blue-600">
                                    ເລືອກ
                                </n-text>
                                <n-p depth="3" style="margin: 8px 0 0 0">
                                    ອັບໂຫຼດຮູບພາບ png, jpg
                                </n-p>
                            </div>
                        </n-upload-dragger>
                    </n-upload>
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
                <n-form-item label="ສິດນຳໃຊ້ລະບົບ" path="role">
                    <n-select 
                    v-model:value="formValue.role" 
                    :options="roleOptions" 
                    default-value="admin" 
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/stuff">
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

import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';

const { client } = useApolloClient();

const message = useMessage();

const formRef = ref(null);
const size = ref('large');
const formValue = ref({
    firstname: "southixa",
    lastname: "philavong",
    phone: "55847493",
    email: "southixa.pele10@gmail.com",
    password: "123456",
    role: "admin"
})

const rules = {
  firstname: {
    required: true,
    message: 'ກະລຸນາໃສ່ຊື່',
    trigger: ['blur']
  },
  lastname: {
    required: true,
    message: 'ກະລຸນາໃສ່ນາມສະກຸນ',
    trigger: ['blur']
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
        trigger: ['blur']
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
    trigger: ['blur']
  },
  password: {
    required: true,
    validator(rule, value) {
        if(!value) {
            return new Error("ກະລຸນາໃສ່ລະຫັດຜ່ານ")
        } else if (value.length <= 4){
            return new Error("ລະຫັດຜ່ານຕ້ອງຫຼາຍກວ່າ 4 ຕົວອັກສອນ")
        }
        return true
    },
    trigger: ['blur']
  },
  role: {
    required: true,
    message: 'ກະລຸນາເລືອກສິດນຳໃຊ້ລະບົບ',
    trigger: 'blur',
  },
};

const roleOptions =  ref([
    {
        label: 'ແອດມິນ',
        value: 'admin',
    },
    {
        label: 'ຜູ້ຊ່ວຍແອດມິນ',
        value: 'stuff'
    },
]);

const loading = ref(false);




const insertQuery = gql`
    mutation insertStuff($object: staff_insert_input!) {
        staff: insert_staff_one(object: $object) {
            staff_id
            staff_profile
            staff_firstname
            staff_lastname
            staff_phone
            staff_email
            staff_password
            staff_role
        }
    }
`



async function handleAdd() {
    try{
        const warining = await formRef.value?.validate( async (errors) => {
            if(!errors) {
                loading.value = true;
                try{
                    const uploadFileId = await handleUpdateFile();
                    if(uploadFileId === undefined) {
                        loading.value = false;
                        return;
                    }
                    const { data, error } =  await client.mutate({
                        mutation: insertQuery,
                        variables: {
                            object: {
                                staff_profile: uploadFileId,
                                staff_firstname: formValue.value.firstname,
                                staff_lastname: formValue.value.lastname,
                                staff_phone: formValue.value.phone,
                                staff_email: formValue.value.email,
                                staff_password: formValue.value.password,
                                staff_role: formValue.value.role
                            }
                        }
                    })
                    if(data) {
                        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
                        loading.value = false;
                    }
                } catch (error) {
                    message.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ")
                    console.log("error accured in handle add when try to insert => ", error);
                    loading.value = false;
                }
            } else {
                message.error("ບໍ່ສາມາດບັນທຶກຂໍ້ມູນນີ້ໄດ້")
            }
        });
    } catch (error) {
        console.log("error accured in handle add => ", error);
    }
}

const previewImage = ref(null);
const imageUpload = ref(null);

function handleSelectFile(data) {
    const file = data.file.file;
    imageUpload.value = file;
    const imageSrc = URL.createObjectURL(file);
    previewImage.value = imageSrc;
    if(data.fileList.length <= 0) {
        previewImage.value = null;
        imageUpload.value = null;
    }
}



async function handleUpdateFile() {
    if(imageUpload.value == null) {
        message.error("ກະລຸນາອັບໂຫຼດຮູບພາບ");
        return;
    }
    const token = useCookie("token");
    const formData = new FormData();
    formData.append("file", imageUpload.value);
    try {
        const respon = await $fetch('https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: formData
        })
        if(respon) {
            console.log(respon);
            console.log(token.value);
            return respon.id;
        }
    } catch (error) {
        console.log("error occured when try to upload file to nhost => ", error);
        return "";
    }
}



</script>