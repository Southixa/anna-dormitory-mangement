<template>
    <div class="max-w-screen-sm mx-auto my-4 mb-12 flex justify-center items-center">
        <div class="w-full bg-white rounded-md shadow px-6 py-5">
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ຊື່ສາຂາ" path="name">
                    <n-input 
                    placeholder="ປ້ອນຊື່ສາຂາ..." 
                    v-model:value="formValue.name" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/major">
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

<script setup lang="js">

import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';
import Rules from '../../utils/rule/index.js';
import Models from '../../model/index.js';



const { id } = useRoute().params;

const { client } = useApolloClient();

const message = useMessage();

const storage = useStorage();

const formRef = ref(null);
const size = ref('large');
const formValue = ref({
    name: "",
})

const loading = ref(false);

const rules = Rules.Major;



async function handleUpdate() {
    try {
        //1. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        //2. disable all input
        loading.value = true;

        //3. update input
        const resUpdate =  await client.mutate({
            mutation: Models.Major.update,
            variables: {
                id: id,
                object: {
                    major_name: formValue.value.name
                }
            }
        }).catch(async (error)=>{return error});
        
        
        if(!resUpdate?.data) {
            message.error("ອັບແດດຂໍ້ມູນບໍ່ສຳເລັດ")
            throw new Error('cannot save data => ' + resUpdate);
        }

        //4. success
        message.success("ອັບແດດຂໍ້ມູນແລ້ວ")
        loading.value = false;

    } catch (error) {
        console.log("error occured in handleUpdate => " + error);
        loading.value = false;
    }
}

async function loadData () {
    try {
        const resMajor = await client.query({
            query: Models.Major.getOne,
            variables: {
                id: id
            }
        })
        formValue.value.name = resMajor?.data?.major_by_pk?.major_name;
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

loadData();


</script>