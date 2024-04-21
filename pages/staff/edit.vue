<template>
    <div class="max-w-screen-lg mx-auto my-4 mb-12 flex gap-8">
        <div class="w-72 h-fit bg-white rounded-md shadow px-4 py-3">
            <p class="text-sm">ຮູບພາບ</p>
            <p class="text-gray-500">ອັບໂຫຼດຮູບພາບຂະໝາດ 2:1 ຫຼື 640px x 360px</p>
            <div class="mb-8 mt-8 flex justify-center items-center">
                <div>
                    <n-image v-if="previewImage" :src="previewImage" class="w-60 h-60 rounded-full object-cover"/>
                    <n-upload
                        multiple
                        directory-dnd
                        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        :max="1"
                        :file-list="uploadFileInfo"
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


const uploadFileInfo = ref([
]);
function handleSelectFile(data) {
    console.log("uploadFileInfo =>");
    console.log(uploadFileInfo.value);
    console.log(data);
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

    // might delete later
    console.log(imageUpload.value);
    console.log(previewImage.value);

    console.log("uploadFileInfo 2 =>");
    console.log(uploadFileInfo.value);
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

const staffQuery = gql`
    query staff($id: uuid!) {
        staff_by_pk(staff_id: $id) {
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

// get params from route
const { id } = useRoute().params;


async function loadData() {
    try {
        const { data, error } = await client.query({
            query: staffQuery,
            variables: {
                id: id
            }
        })
        if(data) {
            //const staff = data.staff_by_pk;
            console.log('staff Profile id => ', data.staff_by_pk.staff_profile);
            const staffProfile = await loadImageFormId(id);
            // formValue.value = {
            //     profile: staffProfile,
            //     firstname: staff.staff_firstname,
            //     lastname: staff.staff_lastname,
            //     phone: staff.staff_phone,
            //     email: staff.staff_email,
            //     password: staff.staff_password,
            //     role: staff.staff_role
            // }
            // //formValue.value = data.staff;
            // console.log(formValue.value);
        }
    } catch (error) {
        console.log("error accoured while loading data => here ", error);
    }
}

loadData();


const token = useCookie("token");

async function loadImageFormId (id) {
    console.log(token.value);
    console.log(id);
    try {
        const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/2e57ed4f-c9ed-4299-9892-5ebd78b2a1a4/presignedurl/content?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASMFSI6OTPV4PO7GY%2F20240418%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240418T042650Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=5bcdd008af5a66ec647353cc8445dd0ec56dd3c849915fcf23031b47034232f0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        const file = new File([respon], "name");
        imageUpload.value = file;
        console.log(file);
        //previewImage.value = URL.createObjectURL(file);

        console.log(respon);
        // if(respon) {
        //     return respon.url;
        // } else {
        //     return "";
        // }
    } catch (error) {
        console.log("error accoured while load image form id => ", error);
        return "";
    }
}

// function setImage (data) {
//     console.log("calling set image => ", data);
//     console.log(data);
// }

function callingData(file) {
    console.log("callingdata Function");
    console.log(file);
}


</script>