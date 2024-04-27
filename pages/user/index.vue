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
                    <n-form-item label="ສະຖານະ">
                        <n-select 
                        placeholder="--ເລືອກ--"
                        size="large"
                        v-model:value="isApproved" 
                        :options="isApprovedOptions" 
                        :disabled="loading"
                        />
                    </n-form-item>
                </div>
                <div class="col-start-6">
                    <n-form-item v-if="notApproveAllCount > 0" label="" class="text-gray-800">
                        <n-button @click="showModal = true" type="primary" color="#10B981" size="large" class="w-full shadow font-light" :render-icon="renderIconDone">
                            ອະນຸມັດທັງໝົດ({{ notApproveAllCount }})
                        </n-button>
                        <n-modal
                            v-model:show="showModal"
                            preset="dialog"
                            title="ອະນຸມັດທັງໝົດ"
                            content="ທ່ານຕ້ອງການອະນຸມັດທັງໝົດແທ້ຫຼືບໍ່?"
                            :positive-text=" 'ອະນຸມັດ ' + notApproveAllCount + ' ລາຍການ' "
                            negative-text="ຍົກເລີກ"
                            @positive-click="handleApproveAll"
                        />
                    </n-form-item>
                </div>
                <div class="col-start-7">
                    <NuxtLink to="/user/add">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                ເພີ່ມຜູ້ໃຊ້
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
                                ສະຖານະເຂົ້າໃຊ້ເວັບໄຊ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ຈັດການ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b border-gray-100" v-for="(item, index) in dataList" :key="item.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {{ (index + 1) }}
                            </th>
                            <td class="px-6 py-2">
                                <div class="w-14 h-14 border border-gray-100 rounded-full">
                                    <n-image
                                        v-if="item?.user_avatar?.user_avatar_url"
                                        :src="item?.user_avatar?.user_avatar_url"
                                        class="w-full h-full rounded-full"
                                        height="100%"
                                        width="100%"
                                        object-fit="cover"
                                    />
                                    
                                    <n-skeleton v-else circle class="w-full h-full" />
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                {{ item.user_firstname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.user_lastname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.user_phone }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.user_email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.user_password }}
                            </td>
                            <td class="px-6 py-4">
                                <n-button v-if="item.user_is_approved == false" @click="approveUser(item.user_id)" type="primary" color="#10B981" size="large" class="w-28 shadow font-light" :render-icon="renderIconDone">
                                    ອະນຸມັດ
                                </n-button>
                                <p v-else>{{ (item.user_is_approved == true) ? "ອະນຸມັດແລ້ວ" : 'ຍັງບໍ່ໄດ້ອະນຸມັດ'}}</p>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <NuxtLink :to=" '/user/' + item.user_id">
                                        <n-button class="w-9 h-9 text-gray-500">
                                            <template #icon>
                                                <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                            </template>
                                        </n-button>
                                    </NuxtLink>
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(item.user_id, item?.user_avatar?.user_avatar)">
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
                <div v-else-if="dataList.length == 0" class="flex justify-center items-center w-full mt-10">
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
import { watch } from 'vue';

const message = useMessage();
const token = useCookie("token");
const { client } = useApolloClient();
const storage = useStorage();
const join = useJoin();

const totalListCount = ref(0);
const totalPage = ref(0);
const currentPage = ref(1);
const dataList = ref([]);
const offset = 0;
const limit = 1000;
const searchText = ref('');
const isEmpty = ref(false);
const loading = ref(false);
const notApproveAllCount = ref(0);
const showModal = ref(false)

const isApproved = ref("all");
const gender = ref("all");
const major = ref("all");
const degree = ref("all");

const isApprovedOptions =  ref([
    {
        label: 'ທັງໝົດ',
        value: 'all',
    },
    {
        label: 'ອະນຸມັດແລ້ວ',
        value: 'true',
    },
    {
        label: 'ຍັງບໍ່ໄດ້ອະນຸມັດ',
        value: 'false'
    },
]);


const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });


const loadTotalListCount = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await client.query({
                query: Models.User.countAll
            })
            if(data) {
                const totolCount = data.data.user_tb_aggregate.aggregate.count;
                resolve(totolCount)
            }
        } catch (error) {
            console.log("error accoured while load total list count => ", error);
            reject(error)
        }
    })
}

const loadDataList = async (offset = 0, limit = 10) => {
    return new Promise(async(resolve, reject) => {
        try {
            //1. load data student
            const data = await client.query({
                query: Models.User.getAll,
                variables: {
                    offset: offset,
                    limit: limit,
                    order_by: "asc"
                }
            })
            
            if(data) {
                const joinedData = await joinData(data.data.user_tb);
                resolve(joinedData)
            }
        } catch (error) { 
            console.log("error accoured while loading data => ", error);
            reject(error)
        }
    })
}

function joinData(itemList) {
    return new Promise(async(resolve, reject) => {
        try {
            //1. join user with avatar table
            const joinAvatar = new join.Join(itemList, {tableName: "user_avatar", idName: "user_avatar_id", returnField: [
                "user_avatar_id",
                "user_avatar_order",
                "user_avatar",
            ]
            });
            const joinAvatarResult = await joinAvatar.returnJoin();

            //2. return fullfied data
            resolve(joinAvatarResult)
        } catch(error) {
            reject(error);
        }
    })
}

const loadDataListWithImage = async (dataList) => {
    return new Promise(async(resolve, reject) => {
        try {
            let list = {};
            let arrData = [];
            Object.assign(list, JSON.parse(JSON.stringify(dataList)));
            //
            for (const [key, value] of Object.entries(list)) {
                const res = await storage.getPresignUrl(value.user_avatar.user_avatar);
                value.user_avatar.user_avatar_url = res.url
                arrData.push(value);
            }
            resolve(arrData)
        } catch (error) {
            console.log("error accoured while loading data list with image => ", error);
            reject(error);
        }
    })
}



async function handleDelete(id, profile_id) {
    try {
        const data = await client.mutate({
            mutation: Models.User.delete,
            variables: {
                id: id
            }
        })

        if(data) {
            dataList.value = dataList.value.filter((item) => item.user_id !== id);
            message.success("ລົບຂໍ້ມູນສຳເລັດ"); 
        }

        //const result = await storage.remove(profile_id);

        if(totalListCount.value === 0 || dataList.value.length === 0) {
            isEmpty.value = true;
        }

    } catch (error) {
        console.log("error accoured while delete item => ", error);
    }
}

async function loadApproveAllCount() {
    return new Promise(async(resolve, reject) => {
        try {
        const data = await client.query({
            query: Models.User.countUserNotApproved
        })
        resolve(data.data.user_tb_aggregate.aggregate.count)
        } catch (error) {
            console.log("error accoured while load approve all count => ", error);
            reject(error)
        }
    })
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
        //totalPage.value = Math.ceil(totalListCount.value / limit);

        //3. load approveAllCount
        notApproveAllCount.value = await loadApproveAllCount();

        //4. load data list
        dataList.value = await loadDataList(offset, limit);

        //5. load data list with image
        dataList.value = await loadDataListWithImage(dataList.value);


    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

loadData();

async function approveUser(id) {
    try {
        const data = await client.mutate({
            mutation: Models.User.update,
            variables: {
                id: id,
                object: {
                    user_is_approved: true
                }
            }
        })
        dataList.value.forEach(item => {
            if(item.user_id === id) {
                item.user_is_approved = true
            }
            return;
        })
        notApproveAllCount.value = await loadApproveAllCount();
        message.success("ອະນຸມັດສຳເລັດ")
    } catch (error) {
        console.log("error accoured while approve user => ", error);
    }
}

async function handleApproveAll() {
    try {
        const data = await client.mutate({
            mutation: Models.User.updateAllToApproved,
        })
        message.success("ອະນຸມັດສຳເລັດແລ້ວ " + notApproveAllCount.value);
        notApproveAllCount.value = await loadApproveAllCount();
        handleSearch();
    } catch (error) {
        console.log("error accoured while approve all => ", error);
    }
}

async function handleSearch() {
    try {

        loading.value = true;

        const data = await client.query({
            query: gql`

                    query search  {
                        user_tb(where:
                            {
                            ${searchText.value === "" ? `` : `

                            _or: [
                                {user_lastname: {_ilike: "%${searchText.value}%"}},
                                {user_firstname: {_ilike: "%${searchText.value}%"}},
                                {user_email: {_ilike: "%${searchText.value}%"}},
                                ${(isNaN(searchText.value)) ? `` : `{user_phone: {_eq: ${searchText.value}}},`}
                            ],

                            `},
                            _and: [
                                ${isApproved.value === "all" ? `` : ` {user_is_approved: {_eq: "${isApproved.value}"}}`},
                            ]
                            }
                            , order_by: {user_is_approved: asc}
                        ) {
                            user_id
                            user_avatar_id
                            user_firstname
                            user_lastname
                            user_phone
                            user_email
                            user_password
                            user_is_approved
                        }
                    }

            `
        })

        if(data?.data?.user_tb.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        dataList.value = await joinData(data.data.user_tb);
        dataList.value = await loadDataListWithImage(dataList.value);
        loading.value = false;
        
    } catch (error) {
        console.log("error accoured while search staff => ", error);
        loading.value = false;
    }
}


watch([isApproved], async () => {
    await handleSearch();
})

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

</script>