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

const { nhost } = useNhost();

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


async function loadTotalListCount () {
        try {
            const data = await nhost.graphql.request(Models.Student.countAll)
            if(data.error) {
                throw new Error(data.error.message);
            }
            totalListCount.value = data.data.student_aggregate.aggregate.count;
            if(totalListCount.value === 0){
                isEmpty.value = true;
                return;
            }
        } catch (error) {
            console.log("error accoured while load total list count => ", error);
        }
}

const loadDataList = async (offset = 0, limit = 10) => {
    return new Promise(async(resolve, reject) => {
        try {
            //1. load data student
            const data = await nhost.graphql.request(Models.Student.getAll, {
                offset: offset,
                limit: limit
            })
            
            if(!data.error) {
                resolve(data.data.student)
            }
        } catch (error) { 
            console.log("error accoured while loading data => ", error);
            reject(error)
        }
    })
}


const fetchId = async (id) => {
    const publicUrl = await nhost.storage.getPresignedUrl({ 
        fileId: id,
        height: 200,
        width: 200
    })
    return publicUrl;
}

const loadDataListWithImage = async (dataList, profileName) => {
    return new Promise(async(resolve, reject) => {
        try {
            let fecthArray = []
            for(let i = 0; i < dataList.length; i++) {
                fecthArray.push(fetchId(dataList[i][profileName]))
            }

            const data = await Promise.all(fecthArray);
            dataList.forEach((item, index) => {
                item[`${profileName}_url`] = data[index].presignedUrl.url
            })
            resolve("done")
        } catch (error) {
            console.log("error accoured while loading data list with image => ", error);
            reject(error);
        }
    })
}



async function handleDelete(id, profile_id) {
    try {
        const data = await nhost.graphql.request(Models.Student.delete, {
            id: id
        })
        if(data.error) {
            message.error("ບໍ່ສາມາດລົບໄດ້ ນັກສຶກສາທີ່ມີລາຍຊື່ໃນບົດຈົບ");
            throw new Error("can not delete on used student");
        }

        if(data.data) {
            dataList.value = dataList.value.filter((item) => item.student_id !== id);
            message.success("ລົບຂໍ້ມູນສຳເລັດ"); 
        }

        const result = await nhost.storage.delete({ fileId: profile_id });

        if(totalListCount.value === 0 || dataList.value.length === 0) {
            isEmpty.value = true;
        }

    } catch (error) {
        console.log("error accoured while delete item => ", error);
    }
}


async function loadData () {
    try {

        //2. calulate total page
        //totalPage.value = Math.ceil(totalListCount.value / limit);

        //3. load data list
        dataList.value = await loadDataList(offset, limit);

        //4. load data list with image
        await loadDataListWithImage(dataList.value, "student_profile");
        //console.log("ddone");
        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}



async function handleSearch() {
    try {

        loading.value = true;

        const data = await nhost.graphql.request(

        `

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
                            major {
                            major_name
                            major_id
                            }
                            degree_type {
                            degree_type_id
                            degree_type_name
                            }
                        }
                    }

            `

        )

        if(data?.data?.student.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        dataList.value = data.data.student;
        await loadDataListWithImage(dataList.value, "student_profile");
        loading.value = false;
        
    } catch (error) {
        console.log("error accoured while search staff => ", error);
        loading.value = false;
    }
}



const defaulValue = {
    label: "ທັງໝົດ",
    value: "all"
}

async function loadSelectMajor() {
    try {
        const resMajor = await nhost.graphql.request(Models.Major.getAll, {
            offset: 0,
            limit: null
        })
        if(!resMajor.error) {
            const majorList = resMajor.data.major.map((item, index) => ({
                label: item.major_name,
                value: item.major_id,
            }))
            majorOptions.value = [defaulValue, ...majorList];
        }
    } catch (error) {
        console.log("error accoured while load select major => ", error);
    }
}



async function loadSelectDegree() {
    try {
        const resDegree = await nhost.graphql.request(Models.Degree.getAll, {
            offset: 0,
            limit: null
        })
        if(!resDegree.error) {
            const degreeList = resDegree.data.degree_type.map((item, index) => ({
                label: item.degree_type_name,
                value: item.degree_type_id,
            }))
            degreeOptions.value = [defaulValue, ...degreeList];
        }
    } catch (error) {
        console.log("error accoured while load select major => ", error);
    }
}



onMounted(async () => {
    await Promise.all([loadSelectMajor(), loadSelectDegree(), loadData(), loadTotalListCount()]);
    console.log("ok");
})

watch([major, degree, gender], async () => {
    await handleSearch();
})

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

</script>