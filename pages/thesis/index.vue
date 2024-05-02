<template>
    <div class="max-w-screen-2xl pb-20 min-h-screen bg-white mx-auto my-4 rounded-md shadow-sm px-6 py-4 mb-12">
        <div class="grow">
            <div class="grid grid-cols-7 gap-5">
                <div class="col-span-3">
                    <n-form-item path="age" label="ຄົ້ນຫາ" class="text-gray-800">
                        <n-input v-model:value="searchText" placeholder="ຄົ້ນຫາຊື່ບົດຄົ້ນຄ້ວາ..." class="font-light" size="large" v-on:keyup.enter="handleSearch()">
                            <template #prefix>
                                <n-icon :component="IosSearch" class="mr-2" />
                            </template>
                        </n-input>    
                    </n-form-item>
                </div>
                <div>
                    <n-form-item label="ປະເພດບົດຄົ້ນຄວ້າ">
                        <n-select 
                        placeholder="--ເລືອກ--"
                        size="large"
                        v-model:value="thesisType" 
                        :options="thesisTypeOptions" 
                        :disabled="loading"
                        />
                    </n-form-item>
                </div>
                <div class="col-start-7">
                    <NuxtLink to="/thesis/add">
                        <n-form-item label="" class="text-gray-800">
                            <n-button type="primary" color="#002749" size="large" class="w-full shadow font-light" :render-icon="renderIconAdd">
                                ເພີ່ມບົດຄົ້ນຄ້ວາ
                            </n-button>
                        </n-form-item>
                    </NuxtLink>
                </div>
            </div>
            <div class="grid grid-cols-7 gap-5">
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
                <div>
                    <n-form-item label="ສົກຮຽນ">
                        <n-select 
                        placeholder="--ເລືອກ--"
                        size="large"
                        v-model:value="year" 
                        :options="yearOptions" 
                        :disabled="loading"
                        />
                    </n-form-item>
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
                            <th scope="col" class="px-6 py-3 min-w-60">
                                ຊື່ບົດຈົບ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ລາຍຊື່ນັກສຶກສາ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ປະເພດ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ສາຂາ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ລະດັບ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ສົກຮຽນ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ດາວໂຫຼດ
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
                            <td class="px-6 py-4 font-medium">
                                {{ item?.thesis_title_lao }}
                            </td>
                            <td class="px-6 py-4 text-xs">
                                {{ (getListStudentName(item) == "" ? "--" : getListStudentName(item)) }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item?.thesis_type?.thesis_type_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ (item?.major?.major_name || "--") }}
                            </td>
                            <td class="px-6 py-4">
                                {{ (item?.degree_type?.degree_type_name || "--") }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item?.thesis_year }}
                            </td>
                            <td class="px-6 py-4">
                                <NuxtLink @click="getFileLink(item?.file_id)" class="text-blue-600 underline cursor-pointer">ໂຫຼດ</NuxtLink>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <NuxtLink :to=" '/thesis/' + item?.thesis_id">
                                        <n-button class="w-9 h-9 text-gray-500">
                                            <template #icon>
                                                <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                            </template>
                                        </n-button>
                                    </NuxtLink>
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(item?.thesis_id, item?.file_id)">
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
import { DoneFilled, EditFilled as EditIcon, RestaurantRound } from '@vicons/material';
import { NIcon } from "naive-ui";
import { useMessage } from 'naive-ui';
import Models from '../../model/index.js';
import { onMounted, watch } from 'vue';

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

const thesisType = ref("all");
const gender = ref("all");
const major = ref("all");
const degree = ref("all");
const year = ref("all");

const thesisTypeOptions =  ref([
    {
        label: 'ບົດຄົ້ນຄວ້ານັກສຶກສາ',
        value: 'ບົດຄົ້ນຄວ້ານັກສຶກສາ',
    },
    {
        label: 'ບົດຄົ້ນຄວ້າອາຈານ',
        value: 'ບົດຄົ້ນຄວ້າອອາຈານ'
    }
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

const yearOptions =  ref([
    {
        label: '2024',
        value: '2024',
    },
    {
        label: '2023',
        value: '2023'
    },
    {
        label: '2022',
        value: '202'
    },
]);

const renderIconDone = () => h(NIcon, null, { default: () => h(DoneFilled) });
const renderIconAdd = () => h(NIcon, null, { default: () => h(Add) });



async function getFileLink (fileId) {
    const data = await nhost.storage.getPresignedUrl({
        fileId: fileId,
    })
    await navigateTo(data.presignedUrl.url, {
        external: true,
        open: {
            target: '_blank'
        }
    })
    return;
}

const loadDataList = async (offset = 0, limit = 10) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await nhost.graphql.request(Models.Thesis.getAll, {
                offset: offset,
                limit: limit
            })
            console.log(data);
            if(data.error) throw new Error(data.error);

            resolve(data.data.thesis)
        } catch (error) { 
            console.log("error accoured while loading data => ", error);
            reject(error)
        }
    })
}



async function handleDelete(id, fileId) {
    try {

        const resMemberList = await nhost.graphql.request(
            `

            query MyQuery {
                    thesis_student_member_list(where: {thesis_id: {_eq: "${id}"}}) {
                        tsml_id
                        thesis_id
                        student_id
                    }
                }


            `
        )

        if(resMemberList.error) throw new Error(resMemberList.error);
        
        
        const memberList = resMemberList.data.thesis_student_member_list;

        //2. loop delete membber list
        for(let i = 0; i < memberList.length; i++) {
            const resMemberListDel = await nhost.graphql.request(Models.Thesis_student_member_list.delete, {
                id: memberList[i].tsml_id
            })
            if(resMemberListDel.error) console.log("unable to delete member list => ", memberList[i].tsml_id, resMemberListDel.error);
        }

        //3. delete thesis
        const data = await nhost.graphql.request(Models.Thesis.delete, {
            id: id
        })

        if(data.error) throw new Error(data.error);


        //4. remove item from list
        dataList.value = dataList.value.filter((item) => item.thesis_id !== id);
        message.success("ລົບຂໍ້ມູນສຳເລັດ"); 

        //5. remove from storage
        const result = await nhost.storage.delete({ fileId: fileId })
        if(result.error) throw new Error(result.error);

        if(totalListCount.value === 0 || dataList.value.length === 0) {
            isEmpty.value = true;
        }

    } catch (error) {
        console.log("error accoured while delete item => ", error);
    }
}


async function loadData () {
    try {

        //3. load data list
        dataList.value = await loadDataList(offset, limit);
        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

//loadData();

async function handleSearch() {
    try {

        loading.value = true;

        const data = await nhost.graphql.request(
            `

                    query search  {
                        thesis(where:
                            {
                            ${searchText.value === "" ? `` : `

                            _or: [
                                {thesis_title_lao: {_ilike: "%${searchText.value}%"}},
                                {thesis_title_eng: {_ilike: "%${searchText.value}%"}},
                                {thesis_author_1: {_ilike: "%${searchText.value}%"}},
                                {thesis_author_2: {_ilike: "%${searchText.value}%"}},
                                {thesis_author_3: {_ilike: "%${searchText.value}%"}},
                            ],

                            `},
                            _and: [
                                ${thesisType.value === "all" ? `` : ` {thesis_type_id: {_eq: "${thesisType.value}"}}`},
                                ${major.value === "all" ? `` : ` {major_id: {_eq: "${major.value}"}}`},
                                ${degree.value === "all" ? `` : ` {degree_type_id: {_eq: "${degree.value}"}}`},
                                ${year.value === "all" ? `` : ` {thesis_year: {_eq: ${year.value}}}`},
                            ]
                            }
                        ) {


                            thesis_id
                            thesis_title_lao
                            thesis_title_eng
                            thesis_type_id
                            major_id
                            degree_type_id
                            thesis_year
                            thesis_advisor_name
                            thesis_abstract_info_lao
                            thesis_abstract_info_eng
                            thesis_author_1
                            thesis_author_2
                            thesis_author_3
                            seen
                            liked
                            downloaded
                            file_id
                            degree_type {
                            degree_type_id
                            degree_type_name
                            }
                            major {
                            major_id
                            major_name
                            }
                            thesis_student_member_lists {
                            student {
                                student_firstname
                                student_lastname
                                student_profile
                            }
                            }
                            thesis_type {
                            thesis_type_id
                            thesis_type_name
                            }


                        }
                    }
            
            
            `
        );

        if(data.error) {
            message.error("ບໍ່ສາມາດຄົ້ນຫາໄດ້"); 
            throw new Error("not able to search");
        }

        



        if(data?.data?.thesis.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        dataList.value = data.data.thesis;
        loading.value = false;
        
    } catch (error) {
        console.log("error accoured while search staff => ", error);
        loading.value = false;
    }
}

async function loadTotalListCount () {
    try {
        const data = await nhost.graphql.request(Models.Thesis.countAll);
        if(data.error) throw new Error(data.error);

        totalListCount.value = data.data.thesis_aggregate.aggregate.count;

        if(totalListCount.value === 0) {
            isEmpty.value = true;
            return;
        }
    } catch(errror) {
        console.log("error accoured while load total list count => ", error);
    }
}

const defaulValue = {
    label: "ທັງໝົດ",
    value: "all"
}

async function loadSelectThesisType() {
    try {
        const resThesisType = await nhost.graphql.request(Models.Thesis_type.getAll, {
            offset: 0,
            limit: null
        })
        if(resThesisType.error) throw new Error(resThesisType.error);

        const thesisTypeList = resThesisType.data.thesis_type.map((item, index) => ({
            label: item.thesis_type_name,
            value: item.thesis_type_id,
        }))
        thesisTypeOptions.value = [defaulValue, ...thesisTypeList];
        console.log("done load thesis type");

    } catch (error) {
        console.log("error accoured while load select thesis type => ", error);
    }
}

async function loadSelectMajor() {
    try {
        const resMajor = await nhost.graphql.request(Models.Major.getAll, {
            offset: 0,
            limit: null
        })
        if(resMajor.error) throw new Error(resThesisType.error);

        const majorList = resMajor.data.major.map((item, index) => ({
            label: item.major_name,
            value: item.major_id,
        }))
        majorOptions.value = [defaulValue, ...majorList];
        console.log("done load major type");

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
        if(resDegree.error) throw new Error(resThesisType.error);

        const degreeList = resDegree.data.degree_type.map((item, index) => ({
            label: item.degree_type_name,
            value: item.degree_type_id,
        }))
        degreeOptions.value = [defaulValue, ...degreeList];
        console.log("done load degree type");

    } catch (error) {
        console.log("error accoured while load select degree => ", error);
    }
}

function loadSelectYear() {
    const sinceYear = 2010;
    const currentYear = new Date().getFullYear();
    yearOptions.value = [];

    yearOptions.value.push(defaulValue)
    for(let i = currentYear; i >= sinceYear; i--) {
        yearOptions.value.push({label: (i + ""), value: (i + "")});
    }
}





function getListStudentName(item) {
    const thesisType = item.thesis_type.thesis_type_name;
    if(thesisType == "ນັກສຶກສາ") {
        let listName = "";
        const list = item.thesis_student_member_lists;
        for(let i = 0; i < list.length; i++) {
            listName += list[i].student.student_firstname + " " + list[i].student.student_lastname + `${i == list.length - 1 ? "" : ", "}` ;
        }

        return listName;
    }
    if(thesisType == "ອາຈານ" || thesisType == "ສະຖາບັນ") {
        const listName = (item.thesis_author_1 || "") + " " + (item.thesis_author_2 || "") + " " + (item.thesis_author_1 || "");
        return listName.trim();
    }
    return "ບໍ່ມີລາຍຊື່"
}

//loadSelectData();

watch([thesisType, major, degree, year], async () => {
    await handleSearch();
})

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

onMounted(async () => {
    await Promise.all([
        loadSelectThesisType(),
        loadSelectMajor(),
        loadSelectDegree(),
        loadSelectYear(),
        loadTotalListCount(),
        loadData()
    ]);
})

</script>