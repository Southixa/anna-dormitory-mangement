<template>
    <div class="max-w-screen-lg mx-auto my-4 mb-12 flex gap-8">
        <div class="w-72 h-fit bg-white rounded-md shadow px-4 pt-3 pb-4">
            <p class="text-sm">ຮູບພາບ</p>
            <p class="text-gray-500">ເລືອກຮູບພາບ</p>
            <div class="flex justify-center mt-6 mb-8">
                <div class="w-24 h-24 border border-gray-100 rounded-full">
                    <n-image
                            v-if="avatar?.user_avatar_url"
                            :src="avatar?.user_avatar_url"
                            class="w-full h-full rounded-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                        
                    <n-skeleton v-else circle class="w-full h-full" />
                </div>
            </div>
            <div class="grid grid-cols-4 gap-2">
                <div class=" w-full rounded-full flex justify-center items-center" v-for="(item) in userAvatarList" :key="item.id">
                    <div class="w-12 h-12 border border-gray-100 rounded-full">
                        <n-image
                            :class="`${item?.user_avatar == avatar?.user_avatar ? 'border border-green-600' : 'opacity-50'}`"
                            v-if="item.user_avatar_url"
                            :src="item.user_avatar_url"
                            class="w-full h-full rounded-full cursor-pointer"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                            preview-disabled
                            @click="selectImage(item)"
                        />
                        
                        <n-skeleton v-else circle class="w-full h-full" />
                    </div>
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
                <n-button @click="handleUpdate" :loading="loading" type="primary" color="#002749" size="large" class="w-40 shadow font-normal">
                    ບັນທຶກ
                </n-button>
            </div>
            
        </div>
    </div>
</template>

<script setup>

import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';
import Rules from '../../utils/rule/index.js';
import Models from '../../model/index.js';
import { useApolloClient } from '@vue/apollo-composable';

const message = useMessage();
const token = useCookie("token");
const { client } = useApolloClient();
const storage = useStorage();
const join = useJoin();

const { id } = useRoute().params;

const userAvatarList = ref([]);
const avatar = ref(null);

const formRef = ref(null);
const size = ref('large');
const formValue = ref({
    firstname: "southixaUser",
    lastname: "philavongUser",
    phone: "234234",
    email: "southixa.pele@gmail.com",
    password: "121423234",
    isApproved: "false"
})

const rules = Rules.User;

const statusOptions =  ref([
    {
        label: 'ອະນຸມັດແລ້ວ',
        value: "true",
    },
    {
        label: 'ຍັງບໍ່ໄດ້ອະນຸມັດ',
        value: "false"
    },
]);

const loading = ref(false);


async function handleUpdate() {
    try {
        //1. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        //2. check image is selected
        if(avatar.value == null) {
            message.error("ກະລຸນາເລືອກຮູບພາບ")
            throw new Error('no image selected');
        }

        //3. disable all input
        loading.value = true;

        //4. update input
        const resUpdate =  await client.mutate({
            mutation: Models.User.update,
            variables: {
                id: id,
                object: {
                    user_avatar_id: avatar.value.user_avatar_id,
                    user_firstname: formValue.value.firstname,
                    user_lastname: formValue.value.lastname,
                    user_phone: formValue.value.phone,
                    user_email: formValue.value.email,
                    user_password: formValue.value.password,
                    user_is_approved: (formValue.value.isApproved == "true"),
                }
            }
        }).catch(async (error)=>{return error});
        
        
        if(!resUpdate?.data) {
            message.error("ອັບແດດຂໍ້ມູນບໍ່ສຳເລັດ")
            throw new Error('cannot save data => ' + resUpdate);
        }

        //5. success
        message.success("ອັບແດດຂໍ້ມູນແລ້ວ")
        loading.value = false;

    } catch (error) {
        console.log("error occured in handleUpdate => " + error);
        loading.value = false;
    }
}

const loadDataListWithImage = async (dataList, profileName) => {
    return new Promise(async(resolve, reject) => {
        try {
            let list = {};
            let arrData = [];
            Object.assign(list, JSON.parse(JSON.stringify(dataList)));
            for (const [key, value] of Object.entries(list)) {
                const res = await storage.getPresignUrl(value[profileName]);
                value[`${profileName}_url`] = res.url
                arrData.push(value);
            }
            resolve(arrData)
        } catch (error) {
            console.log("error accoured while loading data list with image => ", error);
            reject(error);
        }
    })
}

async function loadUserData () {
    try {
        const resUser = await client.query({
            query: Models.User.getOne,
            variables: {
                id: id
            }
        })
        const userData = resUser.data.user_tb_by_pk;
        formValue.value.firstname = userData.user_firstname;
        formValue.value.lastname = userData.user_lastname;
        formValue.value.phone = userData.user_phone + "";
        formValue.value.email = userData.user_email;
        formValue.value.password = userData.user_password;
        formValue.value.isApproved = userData.user_is_approved + "";
        
        const findAvatar = userAvatarList.value.find((item) => item.user_avatar_id == userData.user_avatar_id);
        avatar.value = findAvatar;
        
    } catch (error) {
        console.log("eroor occured in loadUserData => " + error);
    }
}


async function loadData () {
    try {
        //1. load user avatar
        const resUserAvatarList = await client.query({
            query: Models.User_avatar.getAll
        })
        userAvatarList.value = resUserAvatarList.data.user_avatar;

        //2. load user avatar with image
        const resUserAvatarListWithImage = await loadDataListWithImage(resUserAvatarList.data.user_avatar, "user_avatar");
        //avatar.value = resUserAvatarListWithImage[0];
        userAvatarList.value = resUserAvatarListWithImage

        //3. load user data
        loadUserData();
        

    } catch (error) {
        console.log("eroor occured in loadData => " + error);
    }
}

function selectImage (data) {  
    avatar.value = data;
}

loadData();


</script>