<template>
    <div class="max-w-screen-xl mx-auto my-4 mb-12 bg-white p-6 rounded-md shadow">
        <div class="w-full">
            <h2 class="text-lg font-bold mt-2 mb-6">ຂໍ້ມູນບົດຈົບ</h2>
            
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <div class="flex gap-5">
                    <div class="w-1/2">
                        <n-form-item label="ຊືບົດຄົ້ນຄວ້າ(ພາສາລາວ)" path="laoThesisTitle">
                            <n-input 
                            placeholder="ປ້ອນຊື່ບົດຄົ້ນຄວ້າ..." 
                            v-model:value="formValue.laoThesisTitle"
                            laoThesisTitle                            
                            @keydown.enter.prevent
                            :disabled="loading"
                            />
                        </n-form-item>
                        <n-form-item label="ປະເພດບົດຈົບ" path="thesisType">
                            <n-select
                            placeholder="--ເລືອກ--"
                            v-model:value="formValue.thesisType"
                            :options="thesisTypeOptions"
                            :disabled="loading"
                            />
                        </n-form-item>
                        <n-form-item label="ລະດັບ" path="degree">
                            <n-select
                            placeholder="--ເລືອກ--"
                            v-model:value="formValue.degree" 
                            :options="degreeOptions" 
                            :disabled="loading || (thesisType == 'ສະຖາບັນ')"
                            />
                        </n-form-item>
                        <n-form-item label="ຊື່ອາຈານທີ່ປຶກສາ" path="advisor">
                            <n-input 
                            placeholder="ປ້ອນຊື່..." 
                            v-model:value="formValue.advisor" 
                            @keydown.enter.prevent
                            :disabled="loading"
                            />
                        </n-form-item>
                        <n-form-item label="ບົດຄັດຫຍໍ້(ພາສາລາວ)" path="laoAbstract">
                            <n-input 
                            placeholder="ປ້ອນບົດຄັດຫຍໍ້..." 
                            v-model:value="formValue.laoAbstract" 
                            @keydown.enter.prevent
                            :disabled="loading"
                            type="textarea"
                            :autosize="{
                            minRows: 5,
                            maxRows: 5
                            }"
                            />
                        </n-form-item>
                        <h2 class="text-lg font-bold mt-8 mb-6">ອັບໂຫຼດຟາຍບົດຄົ້ນຄວ້າ</h2>
                        <div class="w-full min-h-32">
                            <n-tooltip placement="top-start" :trigger="uploadTooltipShowCount < 2 ? 'hover' : ''">
                                <template #trigger>
                                    <n-upload
                                    :file-list="fileList"
                                    @mouseleave="uploadTooltipShowCount++"
                                    :default-upload="false"
                                    accept=".pdf"
                                    :max="1"
                                    @change="handleSelectFile"
                                    @remove="handleRemoveFile"
                                    >
                                        <n-button>
                                            <n-icon size="20" :depth="3" color="gray">
                                                <CloudUpload-icon />
                                            </n-icon>
                                            <span class="w-2"></span>
                                            ເລືອກຟາຍ
                                        </n-button>
                                    </n-upload>
                                </template>
                                ອັບໂຫຼດສະເພາະຟາຍ PDF
                            </n-tooltip>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <n-form-item label="ຊືບົດຄົ້ນຄວ້າ(ພາສາອັງກິດ)" path="engThesisTitle">
                            <n-input 
                            placeholder="ປ້ອນຊື່ບົດຄົ້ນຄວ້າ..." 
                            v-model:value="formValue.engThesisTitle" 
                            @keydown.enter.prevent
                            :disabled="loading"
                            />
                        </n-form-item>
                        <n-form-item label="ສາຂາ" path="major">
                            <n-select
                            placeholder="--ເລືອກ--"
                            v-model:value="formValue.major" 
                            :options="majorOptions" 
                            :disabled="loading || (thesisType == 'ສະຖາບັນ')"
                            />
                        </n-form-item>
                        <n-form-item label="ປະຈຳປີ" path="year">
                            <n-select
                            placeholder="--ເລືອກ--"
                            v-model:value="formValue.year" 
                            :options="yearOptions" 
                            :disabled="loading"
                            />
                        </n-form-item>
                        
                        <div class="w-full h-20">

                        </div>
                        <n-form-item label="ບົດຄັດຫຍໍ້(ພາສາອັງກິດ)" path="engAbstract" class="mt-[14px]">
                            <n-input 
                            placeholder="ປ້ອນບົດຄັດຫຍໍ້..." 
                            v-model:value="formValue.engAbstract" 
                            @keydown.enter.prevent
                            :disabled="loading"
                            type="textarea"
                            :autosize="{
                            minRows: 5,
                            maxRows: 5
                            }"
                            />
                        </n-form-item>
                    </div>
                </div>
            </n-form>

            <div v-if="thesisType == 'ນັກສຶກສາ'">
                
                <h2 class="text-lg font-bold mt-2 mb-6">ເລືອກນັກສຶກສາ</h2>


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
                            :options="stGenderOptions" 
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
                            :options="stMajorOptions" 
                            :disabled="loading || disableFilterMajorAndDegree"
                            />
                        </n-form-item>
                    </div>
                    <div>
                        <n-form-item label="ລະດັບການສຶກສາ">
                            <n-select 
                            placeholder="--ເລືອກ--"
                            size="large"
                            v-model:value="degree" 
                            :options="stDegreeOptions" 
                            :disabled="loading || disableFilterMajorAndDegree"
                            />
                        </n-form-item>
                    </div>
                    <div class="col-start-7">
                    </div>
                </div>




                <p class="text-gray-800 mt-4">ລາຍການທັງໝົດ <span class="font-medium text-gray-900">{{ totalListCount }}</span> ລາຍການ</p>
                <div class="relative overflow-x-auto mt-2 min-h-[200px] max-h-[400px] custom-scrollbar">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-500 uppercase bg-gray-50 rounded-t-xl sticky top-0 left-0 z-10">
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
                            <tr class="bg-white border-b border-gray-100" v-for="(item, index) in dataList" :key="item.id" :class="(item?.selected) ? 'opacity-50' : ''">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {{ (index + 1) }}
                                </th>
                                <td class="px-6 py-2">
                                    <div class="w-14 h-14 border border-gray-100 rounded-full">
                                        <n-image
                                            v-if="item.student_profile"
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
                                    <n-button v-if="!(item?.selected)" type="primary" color="#10B981" size="large" class="w-28 shadow font-light" :render-icon="renderIconDone" @click="selectStudent(item)" :disabled="loading">
                                        ເລືອກ
                                    </n-button>
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





                <p class="text-gray-800 mt-24">ລາຍຊື່ນັກສຶກສາທີ່ເລືອກ <span class="font-medium text-gray-900">{{ totalListSelectdCount }}</span> ລາຍການ</p>
                <div class="relative overflow-x-auto mt-2 min-h-[200px] max-h-[400px] custom-scrollbar">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-500 uppercase bg-gray-50 rounded-t-xl sticky top-0 left-0 z-10">
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
                            <tr class="bg-white border-b border-gray-100" v-for="(item, index) in dataListSelectd" :key="item.id">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {{ (index + 1) }}
                                </th>
                                <td class="px-6 py-2">
                                    <div class="w-14 h-14 border border-gray-100 rounded-full">
                                        <n-image
                                            v-if="item.student_profile"
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
                                    <n-button type="primary" color="#EF4444" size="large" class="w-28 shadow font-light" :render-icon="renderIconTimes" @click="unSelectStudent(item)" :disabled="loading">
                                        ຍົກເລີກ
                                    </n-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

            </div>



        </div>

        <div v-if="(thesisType == 'ອາຈານ') || (thesisType == 'ສະຖາບັນ')">

             <h2 class="text-lg font-bold mt-2 mb-6">ລາຍຊື່ອາຈານບົດຄົ້ນຄວ້າ</h2>
            
            <n-form
            ref="teacherFormRef"
            :label-width="80"
            :model="teacherFormValue"
            :rules="teacherRules"
            :size="size"
            >
                <div class="flex gap-5">
                    <div class="w-1/2">
                        <n-form-item label="ຊື່ອາຈານຄົ້ນທີ 1" path="teacherFullName1">
                            <n-input 
                            placeholder="ປ້ອນຊື່ບົດຄົ້ນຄວ້າ..." 
                            v-model:value="teacherFormValue.teacherFullName1"
                            laoThesisTitle                            
                            @keydown.enter.prevent
                            :disabled="loading"
                            />
                        </n-form-item>
                        <n-form-item label="ຊື່ອາຈານຄົ້ນທີ 3 (ຖ້າມີ)" path="teacherFullName3">
                            <n-input 
                            placeholder="ປ້ອນຊື່ບົດຄົ້ນຄວ້າ..." 
                            v-model:value="teacherFormValue.teacherFullName3"
                            laoThesisTitle                            
                            @keydown.enter.prevent
                            :disabled="loading"
                            />
                        </n-form-item>
                    </div>
                    <div class="w-1/2">
                        <n-form-item label="ຊື່ອາຈານຄົ້ນທີ 2 (ຖ້າມີ)" path="teacherFullName2">
                            <n-input 
                            placeholder="ປ້ອນຊື່ບົດຄົ້ນຄວ້າ..." 
                            v-model:value="teacherFormValue.teacherFullName2" 
                            @keydown.enter.prevent
                            :disabled="loading"
                            />
                        </n-form-item>
                    </div>
                </div>
            </n-form>

        </div>



        <div class="flex justify-center gap-4 mt-40 mb-4">
            <NuxtLink to="/thesis">
                <n-button :disabled="loading" tertiary color="#002749" size="large" class="w-40 shadow font-normal">
                    ຍົກເລີກ
                </n-button>
            </NuxtLink>
            <n-button @click="handleAdd" :loading="loading" type="primary" color="#002749" size="large" class="w-40 shadow font-normal">
                ບັນທຶກ
            </n-button>
        </div>


        </div>
    </div>
</template>

<script setup lang="js">

import { CloudUpload as CloudUploadIcon } from "@vicons/ionicons5";
import { EyeOffOutline, EyeOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui';
import Rules from '../../utils/rule/index.js';
import Models from '../../model/index.js';


















const { client } = useApolloClient();

const message = useMessage();

const storage = useStorage();

const formRef = ref(null);
const teacherFormRef = ref(null);
const size = ref('large');

const uploadTooltipShowCount = ref(0);

const loading = ref(false);

const rules = Rules.Thesis;
const teacherRules = Rules.Teacher;





const formValue = ref({
    laoThesisTitle: "ລະບົບຄັ້ງບົດຄົ້ນຄວ້າ",
    engThesisTitle: "thesis management system",
    thesisType: null,
    major: null,
    degree: null,
    year: new Date().getFullYear() + "",
    advisor: "ອາຈານ ຕຽງທອງ",
    laoAbstract: "ບົດນີ້ກ່ຽວກັບ...",
    engAbstract: "this thesis is about...",
    liked: 0,
    seen: 0,
    downloaded: 0
})

const teacherFormValue = ref({
    teacherFullName1: null,
    teacherFullName2: null,
    teacherFullName3: null
})

const fileList = ref([]);
const thesisType = ref("");




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
        label: 'ວິສະວະກຳຊອບແວ',
        value: 'ວິສະວະກຳຊອບແວ',
    },
    {
        label: 'ພາສາອັງກິດ',
        value: 'ພາສາອັງກິດ'
    },
]);

const degreeOptions =  ref([
    {
        label: 'ປະລິນຍາຕີ',
        value: 'ປະລິນຍາຕີ',
    },
    {
        label: 'ປະລິນຍາໂທ',
        value: 'ປະລິນຍາໂທ'
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



function handleSelectFile(UploadFileInfo) {
    if((UploadFileInfo?.file?.status == "removed")){
        return
    }

    const file = UploadFileInfo.file.file;
    const fileMb = file.size / 1024 ** 2;

    if(fileMb > 100) {
        message.error("ຂະໝາດຟາຍກາຍ 100 Mb")
        return
    }

    if((UploadFileInfo.file.type != "application/pdf")) {
        message.error("ອັບໂຫຼດສະເພາະຟາຍ pdf")
        return
    }

    fileList.value.push(UploadFileInfo.file);
}

function handleRemoveFile(UploadFileInfo) {
    fileList.value = [];
    UploadFileInfo.fileList.pop();
}



async function loadSelectOptionData() {
    try {
        //1. load thesis type
        const resThesisType = await client.query({
            query: Models.Thesis_type.getAll,
            variables: {
                offset: 0,
                limit: null
            }
        })
        thesisTypeOptions.value = resThesisType.data.thesis_type.map((item, index) => ({
            label: item.thesis_type_name,
            value: item.thesis_type_id,
        }))

        //2. load marjor option
        const resMajor = await client.query({
            query: Models.Major.getAll,
            variables: {
                offset: 0,
                limit: null
            }
        })
        majorOptions.value = resMajor.data.major.map((item, index) => ({
            label: item.major_name,
            value: item.major_id,
        }))

        //3. load degree option
        const resDegree = await client.query({
            query: Models.Degree.getAll,
            variables: {
                offset: 0,
                limit: null
            }
        })
        degreeOptions.value = resDegree.data.degree_type.map((item, index) => ({
            label: item.degree_type_name,
            value: item.degree_type_id,
        }))

        //4. load year option
        const sinceYear = 2010;
        const currentYear = new Date().getFullYear();
        yearOptions.value = [];

        for(let i = currentYear; i >= sinceYear; i--) {
            yearOptions.value.push({label: (i + ""), value: (i + "")});
        }

    } catch (error) {
        console.log("error accoured while load select option => ", error);
    }
}



async function loadData () {
    try {
        //1. load select option
        loadSelectOptionData();

        //2. check thesis type, if 
        //  2.1 student then load student
        //  2.2 teacher then load teacher
        //  2.3 institute then load institute
    } catch (error) {
        console.log("error occured in loadData => " + error);
    }

}


loadData();


const getThsisType = computed(() => {
    return formValue.value.thesisType;
})

watch(getThsisType, async () => {
    await handleThesisTypeChange(getThsisType.value);
})

async function handleThesisTypeChange(thesisId) {
    try {
        const thesis = thesisTypeOptions.value.find((item) => item.value == thesisId);
        thesisType.value = thesis?.label;
    } catch (error) {
        console.log("error accoured while handleThesisTypeChange => ", error);
    }
}












async function handleAdd() {
    try {
        if(formValue.value.thesisType == null){
            message.error("ກະລຸນາເລືອກປະເພດບົດຈົບ");
            return;
        }

        //1. check thesis type
        if(thesisType.value == "ນັກສຶກສາ"){
            await handleAddForStudent();
            return
        }
        if(thesisType.value == "ອາຈານ"){
            await handleAddForTeacher();
            return
        }
        if(thesisType.value == "ສະຖາບັນ"){
            await handleAddForInstitute();
            return
        }

    } catch (error) {
        console.log("error occured in handleAdd => " + error);
    }
}



async function handleAddForStudent() {
    try {

        //1. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }


        //2. check file is selected
        if(fileList.value.length == 0) {
            message.error("ກະລຸນາອັບໂຫຼດຟາຍບົດຄົ້ນຄວ້າ")
            throw new Error('no file selected');
        }

        //3. check student is selected
        if(dataListSelectd.value.length == 0) {
            message.error("ກະລຸນາເລືອກລາຍຊື່ນັກສຶກສາ")
            throw new Error('no student is selected');
        }

        //4. disable all input
        loading.value = true;


        //5. insert file
        const resUpload = await storage.upload(fileList.value[0].file);
        if(!resUpload) {
            message.error("ບໍ່ສາມາດອັບໂຫຼດຟາຍໄດ້")
            throw new Error('cannot upload file');
        }
        const fileId = resUpload.id;



        //6. insert thesis for student
        const resThesis = await client.mutate({
            mutation: Models.Thesis.insert,
            variables: {
                object: {
                    thesis_title_lao: formValue.value.laoThesisTitle,
                    thesis_title_eng: formValue.value.engThesisTitle,
                    thesis_type_id: formValue.value.thesisType,
                    major_id: formValue.value.major,
                    degree_type_id: formValue.value.degree,
                    thesis_year: formValue.value.year,
                    thesis_advisor_name: formValue.value.advisor,
                    thesis_abstract_info_lao: formValue.value.laoAbstract,
                    thesis_abstract_info_eng: formValue.value.engAbstract,
                    thesis_author_1: teacherFormValue.value.teacherFullName1,
                    thesis_author_2: teacherFormValue.value.teacherFullName2,
                    thesis_author_3: teacherFormValue.value.teacherFullName3,
                    seen: formValue.value.seen,
                    liked: formValue.value.liked,
                    downloaded: formValue.value.downloaded,
                    file_id: fileId
                }
            }
        })
        const thesisId = resThesis?.data?.thesis.thesis_id;
        

        //7. insert thesis student member list
        for (let i = 0; i < dataListSelectd.value.length; i++) {
            const resMember = await client.mutate({
                mutation: Models.Thesis_student_member_list.insert,
                variables: {
                    object: {
                        thesis_id: thesisId,
                        student_id: dataListSelectd.value[i].student_id
                    }
                }
            })
        }


        //8. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;

    } catch (error) {
        console.log("error accoured while handleAddForStudent => ", error);
        loading.value = false;
    }
}






async function handleAddForTeacher() {
    try {

        //1. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }


        //2. check file is selected
        if(fileList.value.length == 0) {
            message.error("ກະລຸນາອັບໂຫຼດຟາຍບົດຄົ້ນຄວ້າ")
            throw new Error('no file selected');
        }

        //3. check validate input for teacher list
        const invalidFieldForTeacher = await teacherFormRef.value?.validate().catch((error)=>{return error;})
        if(invalidFieldForTeacher.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        //4. disable all input
        loading.value = true;


        //5. insert file
        const resUpload = await storage.upload(fileList.value[0].file);
        if(!resUpload) {
            message.error("ບໍ່ສາມາດອັບໂຫຼດຟາຍໄດ້")
            throw new Error('cannot upload file');
        }
        const fileId = resUpload.id;



        //6. insert thesis for student
        const resThesis = await client.mutate({
            mutation: Models.Thesis.insert,
            variables: {
                object: {
                    thesis_title_lao: formValue.value.laoThesisTitle,
                    thesis_title_eng: formValue.value.engThesisTitle,
                    thesis_type_id: formValue.value.thesisType,
                    major_id: formValue.value.major,
                    degree_type_id: formValue.value.degree,
                    thesis_year: formValue.value.year,
                    thesis_advisor_name: formValue.value.advisor,
                    thesis_abstract_info_lao: formValue.value.laoAbstract,
                    thesis_abstract_info_eng: formValue.value.engAbstract,
                    thesis_author_1: teacherFormValue.value.teacherFullName1,
                    thesis_author_2: teacherFormValue.value.teacherFullName2,
                    thesis_author_3: teacherFormValue.value.teacherFullName3,
                    seen: formValue.value.seen,
                    liked: formValue.value.liked,
                    downloaded: formValue.value.downloaded,
                    file_id: fileId
                }
            }
        }).catch((error)=>{return error;})

        if(!resThesis) {
            message.error("ບໍ່ສາມາດບັນທຶກໄດ້")
            throw new Error('unable to save data');
        }

        //8. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;

    } catch (error) {
        console.log("error accoured while handleAddForTeacher => ", error);
        loading.value = false;
    }
}



async function handleAddForInstitute() {
    try {

        //1. by pass validate input for major and degree
        rules.major.required = false;
        rules.degree.required = false;
        teacherRules.teacherFullName1.required = false;
        formValue.value.major = "1";
        formValue.value.degree = "1";
        formValue.value.major = null;
        formValue.value.degree = null;


        //2. check validate input
        const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
        if(invalidField.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        
        //3. enable validate again
        rules.major.required = false;
        rules.degree.required = false;
        teacherRules.teacherFullName1.required = false;


        //4. check file is selected
        if(fileList.value.length == 0) {
            message.error("ກະລຸນາອັບໂຫຼດຟາຍບົດຄົ້ນຄວ້າ")
            throw new Error('no file selected');
        }

        //5. check validate input for teacher list
        const invalidFieldForTeacher = await teacherFormRef.value?.validate().catch((error)=>{return error;})
        if(invalidFieldForTeacher.length > 0) {
            message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
            throw new Error('invalid input => ' + invalidField);
        }

        //6. disable all input
        loading.value = true;


        //7. insert file
        const resUpload = await storage.upload(fileList.value[0].file);
        if(!resUpload) {
            message.error("ບໍ່ສາມາດອັບໂຫຼດຟາຍໄດ້")
            throw new Error('cannot upload file');
        }
        const fileId = resUpload.id;



        //8. insert thesis for student
        const resThesis = await client.mutate({
            mutation: Models.Thesis.insert,
            variables: {
                object: {
                    thesis_title_lao: formValue.value.laoThesisTitle,
                    thesis_title_eng: formValue.value.engThesisTitle,
                    thesis_type_id: formValue.value.thesisType,
                    major_id: formValue.value.major,
                    degree_type_id: formValue.value.degree,
                    thesis_year: formValue.value.year,
                    thesis_advisor_name: formValue.value.advisor,
                    thesis_abstract_info_lao: formValue.value.laoAbstract,
                    thesis_abstract_info_eng: formValue.value.engAbstract,
                    thesis_author_1: teacherFormValue.value.teacherFullName1,
                    thesis_author_2: teacherFormValue.value.teacherFullName2,
                    thesis_author_3: teacherFormValue.value.teacherFullName3,
                    seen: formValue.value.seen,
                    liked: formValue.value.liked,
                    downloaded: formValue.value.downloaded,
                    file_id: fileId
                }
            }
        }).catch((error)=>{return error;})

        if(!resThesis) {
            message.error("ບໍ່ສາມາດບັນທຶກໄດ້")
            throw new Error('unable to save data');
        }

        //8. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;

    } catch (error) {
        console.log("error accoured while handleAddForTeacher => ", error);
        loading.value = false;
    }
}























import { IosSearch } from "@vicons/ionicons4";
import { Random, Trash as TrashIcon,  Times} from "@vicons/fa";
import { DoneFilled, EditFilled as EditIcon } from '@vicons/material';
import { NIcon } from "naive-ui";
import { computed, watch } from "vue";





const token = useCookie("token");
const join = useJoin();

const totalListCount = ref(0);
const totalListSelectdCount = ref(0);
const totalPage = ref(0);
const currentPage = ref(1);
const dataList = ref([]);
const dataListSelectd = ref([]);
const offset = 0;
const limit = 1000;
const searchText = ref('');
const isEmpty = ref(false);

const disableFilterMajorAndDegree = ref(false);

const gender = ref("all");
const major = ref("all");
const degree = ref("all");

const stGenderOptions =  ref([
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

const stMajorOptions =  ref([
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

const stDegreeOptions =  ref([
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
const renderIconTimes = () => h(NIcon, null, { default: () => h(Times) });


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


async function stLoadSelectData() {
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
            stMajorOptions.value = [defaulValue, ...majorList];
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
            stDegreeOptions.value = [defaulValue, ...degreeList];
        }
    } catch(error) {
        console.log("error occured in loadSelectData => " + error);
    }
}



async function stLoadData () {
    try {
        //1. load totalListCount
        totalListCount.value = await loadTotalListCount();
        if(totalListCount.value === 0){
            isEmpty.value = true;
            return;
        }

        //2. load select data
        await stLoadSelectData();

        //3. calulate total page
        //totalPage.value = Math.ceil(totalListCount.value / limit);

        //4. load data list
        dataList.value = await loadDataList(offset, limit);

        //5. load data list with image
        dataList.value = await loadDataListWithImage(dataList.value, "student_profile");
        
    } catch (error) {
        console.log("error accoured while load data => ", error);
    }
}

stLoadData();

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
        let tempDataList = await joinData(data.data.student);
        tempDataList = await loadDataListWithImage(tempDataList, "student_profile");
        dataList.value = fillterSelectedStudent(tempDataList);
        loading.value = false;
        
    } catch (error) {
        console.log("error accoured while search staff => ", error);
        loading.value = false;
    }
}

function fillterSelectedStudent(dataList) {
    const selectedId = dataListSelectd.value.map((item) => item.student_id);
    const hash = {};
    selectedId.forEach((item) => {
        hash[item] = true;
    })
    const result = dataList.map((item) => {
        if(hash[item.student_id]) {
            item.selected = true;
        }
        return item;
    })
    return result;

}

function updateList (studentId, action) {
    dataList.value.forEach((item) => {
        if(item.student_id == studentId) {
            if(action == "add") item.selected = true;
            if(action == "remove") item.selected = false;
            return;
        }
    })
}

function selectStudent (data) {
    //1. check if major is not selected
    if(formValue.value.major == null) {
        message.error("ກະລຸນາເລືອກສາຂາຂອງບົດຈົບກ່ອນ")
        return;
    }
    //2. check if degree is not selected
    if(formValue.value.degree == null) {
        message.error("ກະລຸນາເລືອກລະດັບການສຶກສາຂອງບົດຈົບກ່ອນ")
        return;
    }
    //3. check if select student that not the same major as selected student and degree
    if(dataListSelectd.value.length >= 1){
        const selectedPreviousStudentMajor = dataListSelectd.value[0].major.major_name;
        const selectedPreviousStudentDegree = dataListSelectd.value[0].degree_type.degree_type_name;
        const currentStudentMajor = data.major.major_name;
        const currentStudentDegree = data.degree_type.degree_type_name;
        if(selectedPreviousStudentMajor != currentStudentMajor){
            message.error("ກະລຸນາເລືອກແຕ່ສາຂາ " + selectedPreviousStudentMajor + " ຕາມລາຍຊື່ນັກສຶກສາຄົນອື່ນ")
            return;    
        }
        if(selectedPreviousStudentDegree != currentStudentDegree){
            message.error("ກະລຸນາເລືອກແຕ່ລະດັບການສຶກສາ " + selectedPreviousStudentDegree + " ຕາມລາຍຊື່ນັກສຶກສາຄົນອື່ນ")
            return;    
        }
    }

    //4. check if select student that not the main major
    if(formValue.value.major != data.major_id){
        const majorName = majorOptions.value.find((item) => {
            return item.value == formValue.value.major
        })
        message.error("ກະລຸນາເລືອກແຕ່ສາຂາ " + majorName.label + " ຕາມຂໍ້ມູນບົດຈົບ")
        return;
    }
    //5. check if select student more then 3
    if(dataListSelectd.value.length >= 3) {
        message.error("ບໍ່ສາມາດເພື່ມໄດ້ຫຼາຍກວ່າ 3")
        return;
    }
    dataListSelectd.value = [...dataListSelectd.value, data];
    updateList(data.student_id, "add");
}

function unSelectStudent (data) {
    dataListSelectd.value = dataListSelectd.value.filter((item) => item.student_id !== data.student_id);
    updateList(data.student_id, "remove");
}

watch([major, degree, gender], async () => {
    await handleSearch();
})

watch(dataList, () => {
    totalListCount.value = dataList.value.length;
})

watch(dataListSelectd, () => {
    totalListSelectdCount.value = dataListSelectd.value.length;
})

const getMajor = computed(() => formValue.value.major);
const getDegree = computed(() => formValue.value.degree);

watch(getMajor, () => {
    major.value = getMajor.value;
    disableFilterMajorAndDegree.value = true;
});

watch(getDegree, () => {
    degree.value = getDegree.value;
    disableFilterMajorAndDegree.value = true;
});




</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;  /* Adjust scrollbar width */
  background-color: #f1f1f1;  /* Set track color */
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cfcfcf;  /* Set track color */
    border-radius: 8px;
}
</style>