<template>
    <div class="max-w-screen-2xl pb-20 min-h-screen bg-white mx-auto my-4 rounded-md shadow-sm px-6 py-4 mb-12">
        <div class="grow">
            <div class="grid grid-cols-7 gap-5">
                <div class="col-span-3">
                    <n-form-item path="age" label="ຄົ້ນຫາ" class="text-gray-800">
                        <n-input v-model:value="searchText" placeholder="ຄົ້ນຫາຊື່ ແລະ ນາມສະກຸນ..." class="font-light" size="large" v-on:keyup.enter="handleSearch()">
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
                                {{ (index + 1) + ((currentPage - 1) * limit) }}
                            </th>
                            <td class="px-6 py-2">
                                <div class="w-14 h-14 border border-gray-100 rounded-full">
                                    <n-image
                                        v-if="staff.staff_profile_url"
                                        :src="staff.staff_profile_url"
                                        class="w-full h-full rounded-full"
                                        height="100%"
                                        width="100%"
                                        object-fit="cover"
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
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(staff.staff_id, staff.staff_profile)">
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
                <div v-if="isEmpty" class="flex justify-center items-center w-full mt-10">
                    <n-empty description="ບໍ່ມີຂໍ້ມູນ">
                    </n-empty>
                </div>
                <div v-else-if="staffData.length == 0" class="flex justify-center items-center w-full mt-10">
                        <n-spin size="large" />
                </div>
                
            </div>
            <div v-if="totalPage > 1" class="flex justify-center mt-20">
                <n-pagination v-model:page="currentPage" :page-count="totalPage" size="large"  v-on:update:page="changePage"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { IosSearch } from "@vicons/ionicons4";
import { Add } from "@vicons/ionicons5";
import { Random, Trash as TrashIcon } from "@vicons/fa";
import { DoneFilled, EditFilled as EditIcon } from '@vicons/material';
import { NIcon } from "naive-ui";
import { useMessage } from 'naive-ui';
import Models from '../../model/index.js';

const message = useMessage();
const token = useCookie("token");
const { client } = useApolloClient();
const deleteFile = useDelete();

const totalListCount = ref(0);
const totalPage = ref(0);
const currentPage = ref(1);
const staffData = ref([]);
const offset = 0;
const limit = 10;
const searchText = ref('');
const fetchCounting = ref(0);
const isEmpty = ref(false);

const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });


const loadTotalListCount = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await client.query({
                query: Models.Staff.countAll
            })
            if(data) {
                const totolCount = data.data.staff_aggregate.aggregate.count;
                resolve(totolCount)
            }
        } catch (error) {
            console.log("error accoured while load total list count => ", error);
            reject(error)
        }
    })
}

const loadStaffData = async (offset = 0, limit = 10) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await client.query({
                query: Models.Staff.getAll,
                variables: {
                    offset: offset,
                    limit: limit
                }
            })
            if(data) {
                resolve(data.data.staff)
            }
        } catch (error) { 
            console.log("error accoured while loading staff data => ", error);
            reject(error)
        }
    })
}

const loadImageFormId = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const respon = await $fetch(`https://blpbkifrpjcudrpgmsea.storage.ap-southeast-1.nhost.run/v1/files/${id}/presignedurl`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
            if(respon) {
                resolve(respon.url);
            }
        } catch (error) {
            console.log("error accoured while load image form id => ", error);
            reject(error)
        }
    })
}

const loadStaffDataWithImage = async (suffData) => {
    return new Promise(async(resolve, reject) => {
        try {
            let staffList = {};
            let arrStaff = [];
            Object.assign(staffList, JSON.parse(JSON.stringify(suffData)));
            for (const [key, value] of Object.entries(staffList)) {
                value.staff_profile_url = await loadImageFormId(value.staff_profile);
                arrStaff.push(value);
            }
            resolve(arrStaff)
        } catch (error) {
            console.log("error accoured while loading staff data with image => ", error);
            reject(error);
        }
    })
}


function mappingRole(role) {
    const mapping = {
        'admin': 'ແອັດມິນ',
        'staff': 'ຜູ້ຊ່ວຍແອດມິນ'
    }
    return mapping[role]
}


const changePage = async (pageNumber) => {
    try {
        currentPage.value = pageNumber;
        let offset = (pageNumber - 1) * limit;
        staffData.value = await loadStaffData(offset, limit);
        staffData.value = await loadStaffDataWithImage(staffData.value);
    } catch (error) {
        console.log("error accoured while change page => ", error);
    }
}



async function handleDelete(staff_id, profile_id) {
    try {
        const data = await client.mutate({
            mutation: Models.Staff.delete,
            variables: {
                id: staff_id
            }
        })

        if(data) {
            staffData.value = staffData.value.filter((item) => item.staff_id !== staff_id);
            message.success("ລົບຂໍ້ມູນສຳເລັດ")
            await fetchDataAfterDelete();    
        }

        const result = await deleteFile.handleDeleteFile(profile_id);

    } catch (error) {
        console.log("error accoured while delete staff => ", error);
    }
}


async function fetchDataAfterDelete() {
    try {
        const deletedOnPage = currentPage.value;
        const isLastItem = staffData.value.length == 0;

        const isFirstPage = deletedOnPage == 1;
        const isBetweenPage = (deletedOnPage > 1) && (deletedOnPage < totalPage.value);
        const isLastPage = (deletedOnPage == totalPage.value);

        totalListCount.value = totalListCount.value - 1;
        totalPage.value = Math.ceil(totalListCount.value / limit);

        if(totalListCount.value == 0) {
            isEmpty.value = true;
        }

        if(isLastItem && isFirstPage) {
            return;
        }

        if(isLastItem) {
            currentPage.value = currentPage.value - 1;
            let offset = (currentPage.value - 1) * limit;
            staffData.value = await loadStaffData(offset, limit);
            staffData.value = await loadStaffDataWithImage(staffData.value);
            return;
        }

        if(isBetweenPage) {
            await fetchNextData();
            return;
        }

        if(isLastPage) {
            return;
        }

        if(isFirstPage) {
            await fetchNextData();
            return;
        }

        return;
        
    } catch (error) {
        console.log("error accoured in handleFetchDataAfterDelete => ", error);
    }
}

async function fetchNextData() {
    try {
        fetchCounting.value = fetchCounting.value + 1;
        let tempData = await loadStaffData((currentPage.value * limit) - 1, fetchCounting.value);
        tempData = await loadStaffDataWithImage([tempData[0]]);
        staffData.value.push(tempData[0]);
    } catch (error) {
        console.log("error accoured while fetch next data => ", error);
    }
}

async function loadData () {
    try {
        //1. load totalListCount
        totalListCount.value = await loadTotalListCount();
        if(totalListCount.value === 0){
            isEmpty.value = true;
            return;
        }

        //2. calulate total page
        totalPage.value = Math.ceil(totalListCount.value / limit);

        //3. load staff data
        staffData.value = await loadStaffData(offset, limit);

        //4. load staff data with image
        staffData.value = await loadStaffDataWithImage(staffData.value);
        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

loadData();

async function handleSearch() {
    try {
        const data = await client.query({
            query: Models.Staff.search,
            variables: {
                strText: `%${searchText.value}%`,
                phone: (isNaN(searchText.value)) ? 0 : Number(searchText.value)
            }
        })
        staffData.value = data.data.staff;
        staffData.value = await loadStaffDataWithImage(staffData.value);
    } catch (error) {
        console.log("error accoured while search staff => ", error);
    }
}

</script>