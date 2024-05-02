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
                <div>
                </div>
                <div class="col-start-7">
                    <NuxtLink to="/major/add">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                ເພີ່ມສາຂາ
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
                                ຊື່ສາຂາ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ຈັດການ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b border-gray-100" v-for="(item, index) in dataList" :key="item.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-36">
                                {{ (index + 1) }}
                            </th>
                            <td class="px-6 py-4">
                                {{ item.major_name }}
                            </td>
                            <td class="px-6 py-4 w-28">
                                <div class="flex gap-2">
                                    <NuxtLink :to=" '/major/' + item.major_id">
                                        <n-button class="w-9 h-9 text-gray-500">
                                            <template #icon>
                                                <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                            </template>
                                        </n-button>
                                    </NuxtLink>
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(item.major_id)">
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


const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });

const { nhost } = useNhost();

const loadTotalListCount = async () => {
    return new Promise(async(resolve, reject) => {
        try {

            const data = await nhost.graphql.request(Models.Major.countAll)

            if(data) {
                const totolCount = data.data.major_aggregate.aggregate.count;
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
            const data = await nhost.graphql.request(Models.Major.getAll, {
                offset: offset,
                limit: limit
            })

            
            resolve(data.data.major)
        } catch (error) { 
            console.log("error accoured while loading data => ", error);
            reject(error)
        }
    })
}



async function handleDelete(id) {
    try {
        const data = await nhost.graphql.request(Models.Major.delete, {
            id: id
        })
        if(data.error) {
            message.error("ບໍ່ສາມາດລົບໄດ້ ສາຂາກຳລັງຖືກໃຊ້ຢູ່"); 
            throw new Error("can not delete on used major");
        }

        if(data) {
            dataList.value = dataList.value.filter((item) => item.major_id !== id);
            message.success("ລົບຂໍ້ມູນສຳເລັດ"); 
        }

        if(totalListCount.value === 0 || dataList.value.length === 0) {
            isEmpty.value = true;
        }

    } catch (error) {
        console.log("error accoured while delete item => ", error);
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
        //totalPage.value = Math.ceil(totalListCount.value / limit);

        //3. load data list
        dataList.value = await loadDataList(offset, limit);


        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

loadData();

async function handleSearch() {
    try {

        loading.value = true;

        const data = await nhost.graphql.request(
            `

                    query search  {
                        major(where:
                            {

                            _or: [
                                {major_name: {_ilike: "%${searchText.value}%"}},
                            ],
                            
                            }
                        ) {
                            major_id
                            major_name
                        }
                    }

            `
        )

        if(data.error) {
            message.error("ບໍ່ສາມາດຄົ້ນຫາໄດ້"); 
            throw new Error("not able to search");
        }

        if(data?.data?.major.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        dataList.value = data.data.major;
        loading.value = false;
        
    } catch (error) {
        console.log("error accoured while search major => ", error);
        loading.value = false;
    }
}

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

</script>