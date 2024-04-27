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
                    <n-form-item label="ເພດ">
                        <n-select 
                        placeholder="--ເລືອກ--"
                        size="large"
                        v-model:value="gender" 
                        :options="genderOptions" 
                        :disabled="loading"
                        />
                    </n-form-item>
                </div>
                <div>
                    <n-form-item label="ສາຂາ">
                        <n-select 
                        placeholder="--ເລືອກ--"
                        size="large"
                        v-model:value="major" 
                        :options="majorOptions" 
                        :disabled="loading"
                        />
                    </n-form-item>
                </div>
                <div>
                    <n-form-item label="ລະດັບການສຶກສາ">
                        <n-select 
                        placeholder="--ເລືອກ--"
                        size="large"
                        v-model:value="degree" 
                        :options="degreeOptions" 
                        :disabled="loading"
                        />
                    </n-form-item>
                </div>
                <div class="col-start-7">
                    <NuxtLink to="/student/add">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                ເພີ່ມນັກສຶກສາ
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
                                ເພດ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ອີເມລ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ເບີໂທ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ສາຂາ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ລະດັບການສຶກສາ
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
                                        v-if="item.student_profile_url"
                                        :src="item.student_profile_url"
                                        class="w-full h-full rounded-full"
                                        height="100%"
                                        width="100%"
                                        object-fit="cover"
                                    />
                                    
                                    <n-skeleton v-else circle class="w-full h-full" />
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                {{ item.student_firstname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.student_lastname }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.student_gender }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.student_email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.student_phone }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.major.major_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.degree_type.degree_type_name }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <NuxtLink :to=" '/student/' + item.student_id">
                                        <n-button class="w-9 h-9 text-gray-500">
                                            <template #icon>
                                                <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                            </template>
                                        </n-button>
                                    </NuxtLink>
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(item.student_id, item.student_profile)">
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

const gender = ref("all");
const major = ref("all");
const degree = ref("all");

const genderOptions =  ref([
    {
        label: 'ທັງໝົດ',
        value: 'all',
    },
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
        label: 'ທັງໝົດ',
        value: 'all',
    },
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
        label: 'ທັງໝົດ',
        value: 'all',
    },
    {
        label: 'ປະລິນຍາຕີ',
        value: 'bachelor',
    },
    {
        label: 'ປະລິນຍາໂທ',
        value: 'master'
    },
]);

const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });


const loadTotalListCount = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await client.query({
                query: Models.Student.countAll
            })
            if(data) {
                const totolCount = data.data.student_aggregate.aggregate.count;
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
                query: Models.Student.getAll,
                variables: {
                    offset: offset,
                    limit: limit
                }
            })

            
            if(data) {
                const joinedData = await joinData(data.data.student);
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
            //1. join student with major
            const joinMajor = new join.Join(itemList, {tableName: "major", idName: "major_id", returnField: [
                "major_id",
                "major_name",
            ]
            });
            const joinMajorResult = await joinMajor.returnJoin();

            //2. join student with degree
            const joinDegree = new join.Join(joinMajorResult, {tableName: "degree_type", idName: "degree_type_id", returnField: [
                "degree_type_id",
                "degree_type_name",
            ]
            });
            const joinDegreeResult = await joinDegree.returnJoin();

            //3. return fullfied data
            resolve(joinDegreeResult)
        } catch(error) {
            reject(error);
        }
    })
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



async function handleDelete(id, profile_id) {
    try {
        const data = await client.mutate({
            mutation: Models.Student.delete,
            variables: {
                id: id
            }
        })

        if(data) {
            dataList.value = dataList.value.filter((item) => item.student_id !== id);
            message.success("ລົບຂໍ້ມູນສຳເລັດ"); 
        }

        const result = await storage.remove(profile_id);

        if(totalListCount.value === 0 || dataList.value.length === 0) {
            isEmpty.value = true;
        }

    } catch (error) {
        console.log("error accoured while delete item => ", error);
        message.success("ບໍ່ສາມາດລົບໄດ້ ເນື່ອງຈາກມີລາຍຊື່ໃນບົດຄົ້ນຄວ້າ"); 
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

        //4. load data list with image
        dataList.value = await loadDataListWithImage(dataList.value, "student_profile");
        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

loadData();

async function handleSearch() {
    try {

        loading.value = true;

        const data = await client.query({
            query: gql`

                    query search  {
                        student(where:
                            {
                            ${searchText.value === "" ? `` : `

                            _or: [
                                {student_lastname: {_ilike: "%${searchText.value}%"}},
                                {student_firstname: {_ilike: "%${searchText.value}%"}},
                                {student_email: {_ilike: "%${searchText.value}%"}},
                                ${(isNaN(searchText.value)) ? `` : `{student_phone: {_eq: ${searchText.value}}},`}
                            ],

                            `},
                            _and: [
                                ${gender.value === "all" ? `` : ` {student_gender: {_eq: "${gender.value}"}}`},
                                ${major.value === "all" ? `` : ` {major_id: {_eq: "${major.value}"}}`},
                                ${degree.value === "all" ? `` : ` {degree_type_id: {_eq: "${degree.value}"}}`},
                            ]
                            }
                        ) {
                            student_id
                            student_profile
                            student_firstname
                            student_lastname
                            student_gender
                            student_phone
                            student_email
                            major_id
                            degree_type_id
                        }
                    }

            `
        })

        if(data?.data?.student.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        dataList.value = await joinData(data.data.student);
        dataList.value = await loadDataListWithImage(dataList.value, "student_profile");
        loading.value = false;
        
    } catch (error) {
        console.log("error accoured while search staff => ", error);
        loading.value = false;
    }
}

async function loadSelectData() {
    try {
        //1. defalut value
        const defaulValue = {
            label: "ທັງໝົດ",
            value: "all"
        }

        //2. load major data
        const resMajor = await client.query({
            query: Models.Major.getAll,
            variables: {
                offset: 0,
                limit: null
            }
        })
        if(resMajor) {
            const majorList = resMajor.data.major.map((item, index) => ({
                label: item.major_name,
                value: item.major_id,
            }))
            majorOptions.value = [defaulValue, ...majorList];
        }

        //3. load degree data
        const resDegree = await client.query({
            query: Models.Degree.getAll,
            variables: {
                offset: 0,
                limit: null
            }
        })
        if(resDegree) {
            const degreeList = resDegree.data.degree_type.map((item, index) => ({
                label: item.degree_type_name,
                value: item.degree_type_id,
            }))
            degreeOptions.value = [defaulValue, ...degreeList];
        }
    } catch(error) {
        console.log("error occured in loadSelectData => " + error);
    }
}

loadSelectData();

watch([major, degree, gender], async () => {
    await handleSearch();
})

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

</script>