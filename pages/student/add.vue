<template>
    <div class="max-w-screen-lg mx-auto my-4 mb-12 flex gap-8">
        <div class="w-72 h-fit bg-white rounded-md shadow px-4 py-3">
            <p class="text-sm">ຮູບພາບ</p>
            <p class="text-gray-500">ອັບໂຫຼດຮູບພາບຂະໝາດ 2:1 ຫຼື 640px x 360px</p>
            <div class="mb-8 mt-8 flex justify-center items-center">
                <div class="flex flex-col justify-center items-center">
                    <n-image v-if="previewImage" :src="previewImage" class="w-60 h-60 rounded-full" object-fit="cover" width="100%" height="100%"/>
                    <n-upload
                        :file-list="fileList"
                        directory-dnd
                        :max="1"
                        @change="handleSelectFile"
                        @remove="handleRemoveFile"
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
                <n-form-item label="ເພດ" path="gender">
                    <n-select
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.gender" 
                    :options="genderOptions" 
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
                <n-form-item label="ສາຂາ" path="major">
                    <n-select 
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.major" 
                    :options="majorOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ລະດັບການສຶກສາ" path="degree">
                    <n-select 
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.degree" 
                    :options="degreeOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/student">
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

<script setup lang="js">

import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';
import Rules from '../../utils/rule/index.js';
import Models from '../../model/index.js';
import { onMounted } from "vue";


const { nhost } = useNhost();

const { client } = useApolloClient();

const message = useMessage();

const storage = useStorage();

const formRef = ref(null);
const size = ref('large');
const formValue = ref({
    firstname: "southixa",
    lastname: "philavong",
    gender: "ຊາຍ",
    phone: "34234324",
    email: "southixa.pele10@gmail.com",
    major: null,
    degree: null,
})

const fileList = ref([]);
const previewImage = ref("");

const genderOptions =  ref([
    {
        label: 'ຊາຍ',
        value: 'ຊາຍ',
    },
    {
        label: 'ຍິງ',
        value: 'ຍິງ'
    },
]);

const majorOptions =  ref([
    {
        label: 'ວິສະວະກຳຊອບແວ',
        value: 'ce',
    },
    {
        label: 'ບໍລິຫານທຸລະກິດ',
        value: 'ba'
    },
]);

const degreeOptions =  ref([
    {
        label: 'ປະລິນຍາຕີ',
        value: 'bachelor',
    },
    {
        label: 'ປະລິນຍາໂທ',
        value: 'master'
    },
]);

const loading = ref(false);

const rules = Rules.Student;



async function handleAdd() {
    try {
        //1. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        //2. check image is selected
        if(fileList.value.length == 0) {
            message.error("ກະລຸນາອັບໂຫຼດຮູບພາບ")
            throw new Error('no image selected');
        }

        //3. disable all input
        loading.value = true;

        //4. insert image
        const resUpload = await nhost.storage.upload({ file: fileList.value[0].file })

        if(resUpload.error) {
            message.error("ບໍ່ສາມາດອັບໂຫຼດຮູບາບໄດ້")
            throw new Error('cannot upload image');
        }
        const imageId = resUpload.fileMetadata.id;

        //5. insert input
        const resInsert = await nhost.graphql.request(Models.Student.insert, {
            object: {
                student_profile: imageId,
                student_firstname: formValue.value.firstname,
                student_lastname: formValue.value.lastname,
                student_gender: formValue.value.gender,
                student_phone: formValue.value.phone,
                student_email: formValue.value.email,
                major_id: formValue.value.major,
                degree_type_id: formValue.value.degree
            }
        })
        if(resInsert.error) {
            message.error("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ")
            throw new Error('cannot save data => ' + resInsert);
        }

        //6. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;

    } catch (error) {
        console.log("error occured in handleAdd => " + error);
        loading.value = false;
    }
}

function handleSelectFile(UploadFileInfo) {

    if((UploadFileInfo?.file?.status == "removed")){
        return
    }

    const file = UploadFileInfo.file.file;
    const fileMb = file.size / 1024 ** 2;

    if(fileMb > 3) {
        message.error("ຂະໝາດຟາຍກາຍ 3 Mb")
        return
    }

    if((UploadFileInfo.file.type != "image/png") && (UploadFileInfo.file.type != "image/jpeg") && (UploadFileInfo.file.type != "image/jpg")) {
        message.error("ອັບໂຫຼດຮູບພາບສະເພາະຟາຍ png ແລະ jpg")
        return
    }

    fileList.value.push(UploadFileInfo.file);

    const imageSrc = URL.createObjectURL(file);
    previewImage.value = imageSrc;
}

function handleRemoveFile(UploadFileInfo) {
    fileList.value = [];
    UploadFileInfo.fileList.pop();
    previewImage.value = "";
}



async function loadSelectMajor() {
    try {
        const resMajor = await nhost.graphql.request(Models.Major.getAll, {
            offset: 0,
            limit: null
        })
        if(!resMajor.error) {
            const majorList = resMajor.data.major.map((item, index) => ({
                label: item.major_name,
                value: item.major_id,
            }))
            majorOptions.value = majorList;
        }
    } catch (error) {
        console.log("error occured in loadSelectMajor => " + error);
    }
}

async function loadSelectDegree() {
    try {
        const resDegree = await nhost.graphql.request(Models.Degree.getAll, {
            offset: 0,
            limit: null
        })
        if(!resDegree.error) {
            const degreeList = resDegree.data.degree_type.map((item, index) => ({
                label: item.degree_type_name,
                value: item.degree_type_id,
            }))
            degreeOptions.value = degreeList;
        }
    } catch (error) {
        console.log("error occured in loadSelectDegree => " + error);
    }
}

onMounted(async () => {
    await Promise.all([loadSelectMajor(), loadSelectDegree()])
})

</script>