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
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(staff.staff_id, staff.users_id, staff.staff_profile)">
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

const { nhost } = useNhost();

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


async function loadTotalListCount () {
        try {
            const data = await nhost.graphql.request(Models.Staff.countAll)
            if(data.error) {
                throw new Error(data.error.message);
            }
            totalListCount.value = data.data.staff_aggregate.aggregate.count;
            if(totalListCount.value === 0){
                isEmpty.value = true;
                return;
            }
        } catch (error) {
            console.log("error accoured while load total list count => ", error);
        }
}


async function loadStaffData(offset = 0, limit = 10) {
    try {
        const resStaff = await nhost.graphql.request(Models.Staff.getAll, {
            offset: offset,
            limit: limit
        })
        staffData.value = resStaff.data.staff;
    } catch (error) { 
        console.log("error accoured while loading staff data => ", error);
    }
}


const fetchId = async (id) => {
    const publicUrl = await nhost.storage.getPresignedUrl({ 
        fileId: id,
        height: 200,
        width: 200
    })
    return publicUrl;
}

async function loadDataListWithImage(dataList, profileName) {
    try {
        let fecthArray = []
        for(let i = 0; i < dataList.length; i++) {
            fecthArray.push(fetchId(dataList[i][profileName]))
        }

        const data = await Promise.all(fecthArray);
        dataList.forEach((item, index) => {
            item[`${profileName}_url`] = data[index].presignedUrl.url
        })
    } catch (error) {
        console.log("error accoured while loading data list with image => ", error);
    }
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



async function handleDelete(staff_id, users_id, profile_id) {
    try {
        //1. delete staff
        const resStaff = await nhost.graphql.request(Models.Staff.delete, {
            id: staff_id
        })
        if(resStaff.error) {
            throw new Error(resStaff.error);
        }

        //1. delete users 
        const resUsers = await nhost.graphql.request(Models.Users.delete, {
            id: users_id
        })
        if(resUsers.error) {
            throw new Error(resUsers.error);
        }

        
        staffData.value = staffData.value.filter((item) => item.staff_id !== staff_id);

        const resFile = await nhost.storage.delete({ fileId: profile_id })
        if(resFile.error) {
            throw new Error(resFile.error);
        }

        message.success("ລົບຂໍ້ມູນສຳເລັດ");

    } catch (error) {
        console.log("error accoured while delete staff => ", error);
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

        //2. calulate total page
        //totalPage.value = Math.ceil(totalListCount.value / limit);

        //3. load staff data
        await loadStaffData(offset, limit);

        await loadDataListWithImage(staffData.value, "staff_profile");
        //4. load staff data with image
        //staffData.value = await loadStaffDataWithImage(staffData.value);
        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

//loadData();

async function handleSearch() {
    try {
        const resStaff = await nhost.graphql.request(Models.Staff.search, {
            strText: `%${searchText.value}%`,
            phone: (isNaN(searchText.value)) ? 0 : Number(searchText.value)
        })
        if(resStaff.error) {
            throw new Error(resStaff.error);
        }
        staffData.value = resStaff.data.staff;
        await loadDataListWithImage(staffData.value, "staff_profile");

        if(staffData.value.length == 0) {
            isEmpty.value = true;
            return;
        }

        isEmpty.value = false;

    } catch (error) {
        console.log("error accoured while search staff => ", error);
    }
}


onMounted(async () => {
    await Promise.all([
        loadTotalListCount(),
        loadData()
    ]);
})

watch(staffData, () => {
    totalListCount.value = staffData.value.length;
})

</script>