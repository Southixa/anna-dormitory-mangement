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
                                {{ item.thesis_title_lao }}
                            </td>
                            <td class="px-6 py-4 text-xs">
                                {{ getListStudentName(item) }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.thesis_type.thesis_type_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item?.major?.major_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item?.degree_type?.degree_type_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.thesis_year }}
                            </td>
                            <td class="px-6 py-4">
                                <NuxtLink :to="item.file_id_url" target="_blank" class="text-blue-600 underline">ໂຫຼດ</NuxtLink>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <NuxtLink :to=" '/thesis/' + item.thesis_id">
                                        <n-button class="w-9 h-9 text-gray-500">
                                            <template #icon>
                                                <n-icon size="22"><edit-icon class="text-gray-500"/></n-icon>
                                            </template>
                                        </n-button>
                                    </NuxtLink>
                                    <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" @positive-click="handleDelete(item.thesis_id, item.file_id)">
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


const loadTotalListCount = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await client.query({
                query: Models.Thesis.countAll
            })
            if(data) {
                const totolCount = data.data.thesis_aggregate.aggregate.count;
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
            //1. load data thesis
            const data = await client.query({
                query: Models.Thesis.getAll,
                variables: {
                    offset: offset,
                    limit: limit
                }
            })
            
            if(data) {
                const joinedData = await joinData(data.data.thesis);
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

            //1. join with thesis type
            const joinThesisType = new join.Join(itemList, {tableName: "thesis_type", idName: "thesis_type_id", returnField: [
                "thesis_type_id",
                "thesis_type_name",
            ]})
            const joinThesisTypeResult = await joinThesisType.returnJoin();

            //2. filter out thesis type = institute
            const onlyInstituteThesis = joinThesisTypeResult.filter((item) => item.thesis_type.thesis_type_name == "ສະຖາບັນ");
            const notInstituteThesis = joinThesisTypeResult.filter((item) => item.thesis_type.thesis_type_name != "ສະຖາບັນ");

            let result = [];
            if(notInstituteThesis.length > 0) {

                //3. join thesis with major
                const joinMajor = new join.Join(notInstituteThesis, {tableName: "major", idName: "major_id", returnField: [
                    "major_id",
                    "major_name",
                ]
                });
                const joinMajorResult = await joinMajor.returnJoin();

                //4. join thesis with degree
                const joinDegree = new join.Join(joinMajorResult, {tableName: "degree_type", idName: "degree_type_id", returnField: [
                    "degree_type_id",
                    "degree_type_name",
                ]
                });
                const joinDegreeResult = await joinDegree.returnJoin();
                

                //5. rejoin with onlyInstituteThesis
                result = [...joinDegreeResult, ...onlyInstituteThesis];

            } else {
                result = onlyInstituteThesis;
            }

            //6. filter out thesis type = student
            const onlyStudentThesis = result.filter((item) => item.thesis_type.thesis_type_name == "ນັກສຶກສາ");
            const notStudentThesis = result.filter((item) => item.thesis_type.thesis_type_name != "ນັກສຶກສາ");


            let result2 = [];
            if(onlyStudentThesis.length > 0) {
                const joinStudentResult = await joinStudentData(onlyStudentThesis);

                //8. rejoin with notStudentThesis
                result2 = [...joinStudentResult, ...notStudentThesis];
            } else {
                result2 = notStudentThesis;
            }

            //6. return fullfied data
            resolve(result2)
        } catch(error) {
            reject(error);
        }
    })
}

async function joinStudentData(dataList) {
    return new Promise(async(resolve, reject) => {
        try {
            for(let i = 0; i < dataList.length; i++) {
                const thesisId = dataList[i].thesis_id;
                const resMemberList = await client.query({
                    query: gql`
                        query MyQuery {
                            thesis_student_member_list(where: {thesis_id: {_eq: "${thesisId}"}}) {
                                tsml_id
                                thesis_id
                                student_id
                            }
                        }
                    `,
                });
                const studentList = await getStudentData(resMemberList.data.thesis_student_member_list);
                dataList[i]["student_list"] = studentList;
            }
            resolve(dataList);
        } catch (error) {
            console.log("error accoured while join student data => ", error);
            reject(error);
        }
    })
}

async function getStudentData(dataList) {
    return new Promise(async(resolve, reject) => {
        try {
            const arr = [];
            for(let i = 0; i < dataList.length; i++) {
                const resStudent = await client.query({
                    query: Models.Student.getOne,
                    variables: {
                        id: dataList[i].student_id
                    }
                })
                arr.push(resStudent.data.student_by_pk);
            }
            resolve(arr)
        } catch (error) {
            console.log("error accoured while get student data => ", error);
            reject(error);
        }
    })
}

const loadDataListWithFile = async (dataList, profileName) => {
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



async function handleDelete(id, fileId) {
    try {

        //1. get list of member list 
        const resMemberList = await client.query({
            query: gql`
                query MyQuery {
                    thesis_student_member_list(where: {thesis_id: {_eq: "${id}"}}) {
                        tsml_id
                        thesis_id
                        student_id
                    }
                }
            `,
        });
        const memberList = resMemberList.data.thesis_student_member_list;

        //2. loop delete membber list
        for(let i = 0; i < memberList.length; i++) {
            const resMemberListDel = await client.mutate({
                mutation: Models.Thesis_student_member_list.delete,
                variables: {
                    id: memberList[i].tsml_id
                }
            })
        }

        //3. delete thesis
        const data = await client.mutate({
            mutation: Models.Thesis.delete,
            variables: {
                id: id
            }
        })


        //4. remove item from list
        if(data) {
            dataList.value = dataList.value.filter((item) => item.thesis_id !== id);
            message.success("ລົບຂໍ້ມູນສຳເລັດ"); 
        }
        const result = await storage.remove(fileId);

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


        //4. load data list with image
        dataList.value = await loadDataListWithFile(dataList.value, "file_id");
        console.log(dataList.value);
        
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
                        }
                    }

            `
        })


        if(data?.data?.thesis.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        const joinedData = await joinData(data.data.thesis);
        dataList.value = await loadDataListWithFile(joinedData, "file_id");
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

        //2. load thesis type
        const resThesisType = await client.query({
            query: Models.Thesis_type.getAll,
            variables: {
                offset: 0,
                limit: null
            }
        })
        if(resThesisType) {
            const thesisTypeList = resThesisType.data.thesis_type.map((item, index) => ({
                label: item.thesis_type_name,
                value: item.thesis_type_id,
            }))
            thesisTypeOptions.value = [defaulValue, ...thesisTypeList];
        }

        //3. load major data
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

        //4. load degree data
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


        //5. load year option
        const sinceYear = 2010;
        const currentYear = new Date().getFullYear();
        yearOptions.value = [];

        yearOptions.value.push(defaulValue)
        for(let i = currentYear; i >= sinceYear; i--) {
            yearOptions.value.push({label: (i + ""), value: (i + "")});
        }

    } catch(error) {
        console.log("error occured in loadSelectData => " + error);
    }
}

function getListStudentName(item) {
    const thesisType = item.thesis_type.thesis_type_name;
    if(thesisType == "ນັກສຶກສາ") {
        let listName = "";
        const list = item.student_list;
        for(let i = 0; i < list.length; i++) {
            listName += list[i].student_firstname + " " + list[i].student_lastname + `${i == list.length - 1 ? "" : ", "}` ;
        }

        return listName;
    }
    if(thesisType == "ອາຈານ" || thesisType == "ສະຖາບັນ") {
        const listName = (item.thesis_author_1 || "") + " " + (item.thesis_author_2 || "") + " " + (item.thesis_author_1 || "");
        return listName;
    }
    return "ບໍ່ມີລາຍຊື່"
}

loadSelectData();

watch([thesisType, major, degree, year], async () => {
    await handleSearch();
})

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

</script>