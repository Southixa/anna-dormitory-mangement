<template>
    <div class="max-w-screen-2xl pb-20 min-h-screen bg-white mx-auto my-4 rounded-md shadow-sm px-6 py-4 mb-12">
        <div class="grow">
            <div class="grid grid-cols-7 gap-5">
                <div class="col-span-3">
                    <n-form-item path="age" label="ຄົ້ນຫາ" class="text-gray-800">
                        <n-input v-model:value="searchText" placeholder="ຄົ້ນຫາຊື່ ແລະ ນາມສະກຸນ..." class="font-light" size="large">
                            <template #prefix>
                                <n-icon :component="IosSearch" class="mr-2" />
                            </template>
                        </n-input>    
                    </n-form-item>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div class="col-start-7">
                    <NuxtLink to="/stuff/add">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                ເພີ່ມຜູ້ໃຊ້ງານລະບົບ
                            </n-button>
                        </n-form-item>
                    </NuxtLink>
                </div>
            </div>
            <p class="text-gray-800 mt-4">ລາຍການທັງໝົດ <span class="font-medium text-gray-900">42</span> ລາຍການ</p>
            <div class="relative overflow-x-auto mt-2 min-h-[500px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-500 uppercase bg-gray-50 rounded-t-xl">
                        <tr class="border-b border-gray-100">
                            <th scope="col" class="px-6 py-3">
                                ລຳດັບ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ຮູບພາຍ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ຊື່
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ນາມສະກຸນ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ເບີໂທ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ອີເມລ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ລະຫັດຜ່ານ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ສິດນຳໃຊ້ລະບົບ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ຈັດການ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b border-gray-100" v-for="(stuff, index) in stuffData" :key="stuff.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {{ index+1 }}
                            </th>
                            <td class="px-6 py-2">
                                <div class="w-14 h-14 border border-gray-100 rounded-full">
                                    <img v-if="stuff.staff_profile_url" :src="stuff.staff_profile_url" alt="" class="w-full h-full object-cover rounded-full">
                                    <n-skeleton v-else circle class="w-full h-full" />
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                {{ stuff.staff_firstname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ stuff.staff_lastname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ stuff.staff_phone }}
                            </td>
                            <td class="px-6 py-4">
                                {{ stuff.staff_email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ stuff.staff_password }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mappingRole(stuff.staff_role) }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <n-button class="w-9 h-9 text-gray-500">
                                        <template #icon>
                                            <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                        </template>
                                    </n-button>
                                    <n-button class="w-9 h-9 text-gray-500 group">
                                        <template #icon>
                                            <n-icon size="18"><trash-icon class="group-hover:text-red-500 text-gray-500"/></n-icon>
                                        </template>
                                    </n-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-center mt-20">
                <n-pagination v-model:page="page" :page-count="12" size="large" disabled/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { IosSearch } from "@vicons/ionicons4";
import { Add } from "@vicons/ionicons5";
import { Trash as TrashIcon } from "@vicons/fa";
import { DoneFilled, EditFilled as EditIcon } from '@vicons/material';
import { NIcon } from "naive-ui";

const { client } = useApolloClient();

const searchText = ref('');
const selectValue= ref("ທັງໝົດ")
const options =  ref([
    {
        label: 'ທັງໝົດ',
        value: 'all',
    },
    {
        label: 'ອະນຸມັດແລ້ວ',
        value: 'approved'
    },
    {
        label: 'ຍັງບໍ່ໄດ້ອະນຸມັດ',
        value: 'notApproved'
    },
]);

const page = ref(1);

const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });


const stuffQuery = gql`
  query stuff($limit: Int){
        staff(limit: $limit) {
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
`;

const stuffData = ref([]);

async function loadData() {
    try {
        const { data, error } = await client.query({
            query: stuffQuery,
            variables: {
                limit: 10
            }
        })
        stuffData.value = data.staff;
        if(data) {
            let staffList = {};
            let arrStaff = [];
            Object.assign(staffList, JSON.parse(JSON.stringify(data.staff)));
            for (const [key, value] of Object.entries(staffList)) {
                value.staff_profile_url = await loadImageFormId(value.staff_profile);
                arrStaff.push(value);
            }
            stuffData.value = arrStaff;

        }
    } catch (error) { 
        console.log("error accoured while loading data => here ", error);
    }

}

function mappingRole(role) {
    const mapping = {
        'admin': 'ແອັດມິນ',
        'stuff': 'ຜູ້ຊ່ວຍແອດມິນ'
    }
    return mapping[role]
}

loadData();

const token = useCookie("token");

async function loadImageFormId (id) {
    try {
        const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/${id}/presignedurl`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        if(respon) {
            return respon.url;
        } else {
            return "";
        }
    } catch (error) {
        console.log("error accoured while load image form id => ", error);
        return "";
    }
}


</script>