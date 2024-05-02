<template>
    <div class="max-w-screen-lg mx-auto my-4 mb-12 flex gap-8">
        <div class="w-72 h-fit bg-white rounded-md shadow px-4 py-3">
            <p class="text-sm">ຮູບພາບ</p>
            <p class="text-gray-500">ອັບໂຫຼດຮູບພາບຂະໝາດ 2:1 ຫຼື 640px x 360px</p>
            <div class="mb-8 mt-8 flex justify-center items-center">
                <div class="flex flex-col justify-center items-center">
                    <n-image v-if="previewImage" :src="previewImage" class="w-60 h-60 rounded-full" object-fit="cover" width="100%" height="100%"/>
                    <n-upload
                        directory-dnd
                        :max="1"
                        @change="handleSelectFile"
                        :default-upload="false"
                        accept="image/*"
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
                <NuxtLink to="/staff">
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
import Rules from '../../utils/rule/index.js';
import Models from '../../model/index.js';


const { nhost } = useNhost();


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

const roleOptions =  ref([
    {
        label: 'ແອດມິນ',
        value: 'admin',
    },
    {
        label: 'ຜູ້ຊ່ວຍແອດມິນ',
        value: 'staff'
    },
]);

const loading = ref(false);


const rules = Rules.Staff;



async function handleAdd() {
    try {
        //formValue.value.firstname = (Number(formValue.value.firstname) + 1) + "";
        //1. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        //2. check image is selected
        if(!imageUpload.value){
            message.error("ກະລຸນາອັບໂຫຼດຮູບພາບ")
            throw new Error('no image selected');
        }

        //3. disable all input
        loading.value = true;


        //4. insert users
        const resUsers = await $fetch('https://blpbkifrpjcudrpgmsea.auth.ap-southeast-1.nhost.run/v1/signup/email-password', {
            method: 'POST',
            body: {
                email: formValue.value.email,
                password: formValue.value.password
            }
        }).catch((error) => {
            message.error("ອີເມວຖືກໃຊ້ແລ້ວ")
            formValue.value.email = "";
            throw new Error('Email alrealy in use => ' + error);
        });
        
        const usersId = resUsers.session.user.id;


        //5. insert image
        const resFile = await nhost.storage.upload({ file: imageUpload.value })
        if(resFile.error) {
            message.error("ບໍ່ສາມາດອັບໂຫຼດຮູບາບໄດ້")
            throw new Error('cannot upload image => ' + resFile.error)
        }

        const imageId = resFile.fileMetadata.id;



        //6. insert input
        const resStaff = await nhost.graphql.request(Models.Staff.insert, {
            object: {
                    staff_profile: imageId,
                    staff_firstname: formValue.value.firstname,
                    staff_lastname: formValue.value.lastname,
                    staff_phone: formValue.value.phone,
                    staff_email: formValue.value.email,
                    staff_password: formValue.value.password,
                    staff_role: formValue.value.role,
                    users_id: usersId
            }
        })
        if(resStaff.error) {
            message.error("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ")
            throw new Error('cannot save data => ' + resStaff);
        }


        //7. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;

    } catch (error) {
        console.log("error occured in handleAdd => " + error);
        loading.value = false;
    }
}


const previewImage = ref(null);
const imageUpload = ref(null);

function handleSelectFile(data) {
    const file = data.file.file;
    const fileMb = file.size / 1024 ** 2;
    if(fileMb > 3) {
        data.fileList.pop();
        message.error("ຂະໝາດຟາຍກາຍ 3 Mb")
        return
    }
    if((data.file.type != "image/png") && (data.file.type != "image/jpeg") && (data.file.type != "image/jpg")) {
        data.fileList.pop();
        message.error("ອັບໂຫຼດຮູບພາບສະເພາະຟາຍ png ແລະ jpg")
        return
    }
    imageUpload.value = file;
    const imageSrc = URL.createObjectURL(file);
    previewImage.value = imageSrc;
    if(data.fileList.length <= 0) {
        previewImage.value = null;
        imageUpload.value = null;
    }
}




</script>