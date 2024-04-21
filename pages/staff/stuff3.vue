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
                    <NuxtLink to="/staff/staff2">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                staff2
                            </n-button>
                        </n-form-item>
                    </NuxtLink>
                </div>
                <div class="col-start-7">
                    <NuxtLink to="/staff/add">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                ເພີ່ມຜູ້ໃຊ້ງານລະບົບ
                            </n-button>
                        </n-form-item>
                    </NuxtLink>
                </div>
            </div>
            <p class="text-gray-800 mt-4">ລາຍການທັງໝົດ <span class="font-medium text-gray-900">{{ totalListCount }}</span> ລາຍການ</p>
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
                        <tr class="bg-white border-b border-gray-100" v-for="(staff, index) in staffData" :key="staff.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {{ index+1 }}
                            </th>
                            <td class="px-6 py-2">
                                <div class="w-14 h-14 border border-gray-100 rounded-full">
                                    <n-image
                                        v-if="staff.staff_profile_url"
                                        :src="staff.staff_profile_url"
                                        class="w-full h-full object-cover rounded-full"
                                    />
                                    
                                    <n-skeleton v-else circle class="w-full h-full" />
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                {{ staff.staff_firstname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ staff.staff_lastname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ staff.staff_phone }}
                            </td>
                            <td class="px-6 py-4">
                                {{ staff.staff_email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ staff.staff_password }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mappingRole(staff.staff_role) }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <NuxtLink :to=" '/staff/' + staff.staff_id">
                                        <n-button class="w-9 h-9 text-gray-500">
                                            <template #icon>
                                                <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                            </template>
                                        </n-button>
                                    </NuxtLink>
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(staff.staff_id)">
                                        <template #activator>
                                            <n-button class="w-9 h-9 text-gray-500 group">
                                                <template #icon>
                                                    <n-icon size="18"><trash-icon class="group-hover:text-red-500 text-gray-500"/></n-icon>
                                                </template>
                                            </n-button>
                                        </template>
                                        ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ຫຼືບໍ່?
                                    </n-popconfirm>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="staffData.length == 0" class="flex justify-center items-center w-full mt-10">
                        <n-spin size="large" />
                </div>
            </div>
            <div v-if="totalListCount > 10" class="flex justify-center mt-20">
                <n-pagination v-model:page="page" :page-count="totalPage" size="large"  v-on:update:page="changePage"/>
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

import { useMessage } from 'naive-ui';

const message = useMessage();

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

const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });


const staffQuery = gql`
  query staff($offset: Int, $limit: Int) {
    staff(offset: $offset, limit: $limit) {
        staff_id
        staff_firstname
        staff_lastname
        staff_email
        staff_phone
        staff_password
        staff_profile
        staff_role
    }
    }
`;

const staffData = ref([]);

async function loadData(offset = 0, limit = 10) {
    try {
        const { data, error } = await client.query({
            query: staffQuery,
            variables: {
                offset: offset,
                limit: limit
            }
        })
        staffData.value = data.staff;
        if(data) {
            let staffList = {};
            let arrStaff = [];
            Object.assign(staffList, JSON.parse(JSON.stringify(data.staff)));
            for (const [key, value] of Object.entries(staffList)) {
                value.staff_profile_url = await loadImageFormId(value.staff_profile);
                arrStaff.push(value);
            }
            staffData.value = arrStaff;

        }
    } catch (error) { 
        console.log("error accoured while loading data => here ", error);
    }

}

function mappingRole(role) {
    const mapping = {
        'admin': 'ແອັດມິນ',
        'staff': 'ຜູ້ຊ່ວຍແອດມິນ'
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


const totalListCount = ref(0);

const totalListQuery = gql`
  {
  staff_aggregate {
    aggregate {
      count(columns: staff_id)
    }
  }
}
`;

const page = ref(1);
const totalPage = ref(0);

async function loadTotalListCount() {
    try {
        const { data, error } = await client.query({
            query: totalListQuery
        })
        if(data) {
            totalListCount.value = data.staff_aggregate.aggregate.count;
            totalPage.value = Math.ceil(totalListCount.value / 10);
        }
    } catch (error) {
        console.log("error accoured while load total list count => ", error);
    }
}


loadTotalListCount();


const changePage = async (pageNumber) => {
    let offset = (pageNumber - 1) * 10;
    let limit = 10;
    await loadData(offset, limit);
}


const deleteQuery = gql`
  mutation deleteStaff ($id: uuid!){
  delete_staff_by_pk(staff_id: $id) {
    staff_id
  }
}
`;

async function handleDelete(id) {
    try {
        const { data, error } = await client.mutate({
            mutation: deleteQuery,
            variables: {
                id: id
            }
        })
        if(data) {
            console.log("delete success");
            message.success("ລົບຂໍ້ມູນສຳເລັດ")
            staffData.value = staffData.value.filter((item) => item.staff_id !== id);
            totalListCount.value = totalListCount.value - 1;
        }
    } catch (error) {
        console.log("error accoured while delete staff => ", error);
    }
}

</script>