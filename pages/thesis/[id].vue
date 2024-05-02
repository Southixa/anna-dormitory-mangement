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
                        <div class="w-fit">
                            <NuxtLink v-if="fileUrl" :to="fileUrl" target="_blank">
                                <div class = "mb-5 underline text-blue-600 w-fit">ເບີ່ງຟາຍ</div>
                            </NuxtLink>
                        </div>
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













const { nhost } = useNhost();




const message = useMessage();


const formRef = ref(null);
const teacherFormRef = ref(null);
const size = ref('large');

const uploadTooltipShowCount = ref(0);

const loading = ref(true);

const rules = Rules.Thesis;
const teacherRules = Rules.Teacher;





const formValue = ref({
    fileId: "",
    id: "",
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

const fileUrl = ref("");

const isFileChange = ref(false)


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

    isFileChange.value = true
    fileUrl.value = "";

}






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
            return;
        }
        if(thesisType.value == "ອາຈານ"){
            await handleAddForTeacher();
            return;
        }
        if(thesisType.value == "ສະຖາບັນ"){
            await handleAddForInstitute();
            return;
        }

    } catch (error) {
        console.log("error occured in handleAdd => " + error);
    }
}

async function deletedOddThesis() {
    try {
        
        const fileId = formValue.value.fileId;


        if(thesisType.value == "ນັກສຶກສາ"){
            //1. get list of member list 
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
            if(resMemberList.error) throw new Error("resMemberList error => " + resMemberList.error);


            const memberList = resMemberList.data.thesis_student_member_list;

            //2. loop delete membber list
            for(let i = 0; i < memberList.length; i++) {
                const resMemberListDel = await nhost.graphql.request(Models.Thesis_student_member_list.delete, {
                    id: memberList[i].tsml_id
                })
                if(resMemberListDel.error) console.log("unable to delete member list => ", resMemberListDel.error);
            }


        }

        //3. delete thesis
        const data = await nhost.graphql.request(Models.Thesis.delete, {
            id: id
        })
        if(data.error) throw new Error("data error to delete thesis => " + data.error);


        if(isFileChange.value == true){
            const result = await await nhost.storage.delete({ fileId: fileId })
            if(result.error) throw new Error("result error to delete file => " + result.error);
        }



    } catch (error) {
        console.log("error accoured while delete item => ", error);
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
        let fileId = formValue.value.fileId;

        if(isFileChange.value == true){
            const resUpload = await nhost.storage.upload({ file: fileList.value[0].file });
            if(resUpload.error) {
                message.error("ບໍ່ສາມາດອັບໂຫຼດຟາຍໄດ້")
                throw new Error('cannot upload file');
            }
            fileId = resUpload.fileMetadata.id;
        }


        //6. insert thesis for student
        const resThesis = await nhost.graphql.request(
            Models.Thesis.insert,
             {
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
                    seen: 0,
                    liked: 0,
                    downloaded: 0,
                    file_id: fileId
                }
            }
        )


        if(resThesis.error) {
            message.error("ບໍ່ສາມາດບັນທຶກຂໍ້ມູນໄດ້")
            throw new Error('cannot insert thesis');
        }
        const thesisId = resThesis?.data?.thesis.thesis_id;
        

        //7. insert thesis student member list
        for (let i = 0; i < dataListSelectd.value.length; i++) {
            const resMember = await nhost.graphql.request(
                Models.Thesis_student_member_list.insert,
                {
                    object: {
                        thesis_id: thesisId,
                        student_id: dataListSelectd.value[i].student_id
                    }
                }
            )

            if(resMember.error) {
                throw new Error('cannot insert member');
            }
        }

        
        await deletedOddThesis();

        //8. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;
        
        //await navigateTo({ path: '/thesis' });
        return;

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
        let fileId = formValue.value.fileId;

        if(isFileChange.value == true){
            const resUpload = await nhost.storage.upload({ file: fileList.value[0].file });
            if(resUpload.error) {
                message.error("ບໍ່ສາມາດອັບໂຫຼດຟາຍໄດ້")
                throw new Error('cannot upload file');
            }
            fileId = resUpload.fileMetadata.id;
        }



        //6. insert thesis for student
        const resThesis = await nhost.graphql.request(
            Models.Thesis.insert,
             {
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
                    seen: 0,
                    liked: 0,
                    downloaded: 0,
                    file_id: fileId
                }
            }
        )


        if(resThesis.error) {
            message.error("ບໍ່ສາມາດບັນທຶກຂໍ້ມູນໄດ້")
            throw new Error('cannot insert thesis');
        }

        
        await deletedOddThesis();

        //8. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;

        
        
        //await navigateTo({ path: '/thesis' });
        return;

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
        let fileId = formValue.value.fileId;

        if(isFileChange.value == true){
            const resUpload = await nhost.storage.upload({ file: fileList.value[0].file });
            if(resUpload.error) {
                message.error("ບໍ່ສາມາດອັບໂຫຼດຟາຍໄດ້")
                throw new Error('cannot upload file');
            }
            fileId = resUpload.fileMetadata.id;
        }



        //8. insert thesis for student
        const resThesis = await nhost.graphql.request(
            Models.Thesis.insert,
             {
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
                    seen: 0,
                    liked: 0,
                    downloaded: 0,
                    file_id: fileId
                }
            }
        )


        if(resThesis.error) {
            message.error("ບໍ່ສາມາດບັນທຶກຂໍ້ມູນໄດ້")
            throw new Error('cannot insert thesis');
        }

        
        await deletedOddThesis();

        //8. success
        message.success("ບັນທຶກຂໍ້ມູນສຳເລັດ")
        loading.value = false;
        
        
        //await navigateTo({ path: '/thesis' });
        return;

    } catch (error) {
        console.log("error accoured while handleAddForTeacher => ", error);
        loading.value = false;
    }
}























import { IosSearch } from "@vicons/ionicons4";
import { Random, Trash as TrashIcon,  Times} from "@vicons/fa";
import { DoneFilled, EditFilled as EditIcon } from '@vicons/material';
import { NIcon } from "naive-ui";
import { computed, onMounted, watch } from "vue";






const { id } = useRoute().params;

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
const isLoadEditData = ref(false)

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









async function loadFile() {
    try {
        //fileList
        const file = await nhost.storage.getPresignedUrl({
            fileId: formValue.value.fileId
        })
        if(file.error){
            message.error("ບໍ່ສາມາດໂຫຼດຟາຍບົດຈົບມາສະແດງໄດ້");
            throw new Error(file.error);
        }

        fileUrl.value = file.presignedUrl.url;

        const fileName = await nhost.graphql.request(
            `

            query MyQuery {
                files(where: {id: {_eq: "${formValue.value.fileId}"}}) {
                    id
                    name
                    size
                }
            }
            
            `
        )
        if(fileName.error){
            message.error("ບໍ່ສາມາດໂຫຼດຊື່ຟາຍໄດ້");
            throw new Error(fileName.error);
        }


        const tempFileList = [{
          id: '1',
          name: fileName.data.files[0].name,
          status: 'pending'
        }];

        fileList.value = tempFileList;

    } catch (error) {
        console.log("error accoured while load file => ", error);
    }
}

//stLoadData();

async function handleSearch() {
    try {

        loading.value = true;
        
        if((formValue.value.major == null) || (formValue.value.degree == null)) {
            console.log("disable search on institute");
            loading.value = false;
            return;
        }

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


        if(data.error) {
            throw new Error(data.error);
        }

        if(data?.data?.student.length == 0) {
            dataList.value = [];
            isEmpty.value = true;
            loading.value = false;
            return;
        }

        isEmpty.value = false;
        dataList.value = data.data.student;
        await loadDataListWithImage(dataList.value, "student_profile");
        dataList.value = fillterSelectedStudent(dataList.value);
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
    if(isLoadEditData.value) return;
    major.value = getMajor.value;
    disableFilterMajorAndDegree.value = true;

    //clear dataListSelectd when change major or degree 
    if(dataListSelectd.value.length > 0) {
        dataListSelectd.value = [];
    }
});

watch(getDegree, () => {
    if(isLoadEditData.value) return;
    degree.value = getDegree.value;
    disableFilterMajorAndDegree.value = true;

    //clear dataListSelectd when change major or degree 
    if(dataListSelectd.value.length > 0) {
        dataListSelectd.value = [];
    }
});











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
        thesisTypeOptions.value = [...thesisTypeList];

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
        majorOptions.value = [...majorList];

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
        degreeOptions.value = [...degreeList];

    } catch (error) {
        console.log("error accoured while load select degree => ", error);
    }
}

function loadSelectYear() {
    try {
        const sinceYear = 2010;
        const currentYear = new Date().getFullYear();
        yearOptions.value = [];

        for(let i = currentYear; i >= sinceYear; i--) {
            yearOptions.value.push({label: (i + ""), value: (i + "")});
        }
    } catch (error) {
        console.log("error accoured while load select year => ", error);
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

const defaulValue = {
    label: "ທັງໝົດ",
    value: "all"
}

function loadSelectStAll(){
    stDegreeOptions.value = [defaulValue, ...degreeOptions.value];
    stMajorOptions.value = [defaulValue, ...majorOptions.value];
}



async function loadThesis() {
    try {
        const resThesis = await nhost.graphql.request(Models.Thesis.getOne, {
            id: id
        })
        if(resThesis.error) {
            message.error("ບໍ່ສາມາດໂຫຼດຂໍ້ມູນບົດໄດ້")
            throw new Error(resThesis.error);
        }

        const thesisData = resThesis?.data?.thesis_by_pk;
        formValue.value.fileId = thesisData.file_id;
        formValue.value.laoThesisTitle = thesisData.thesis_title_lao;
        formValue.value.engThesisTitle = thesisData.thesis_title_eng;
        formValue.value.thesisType = thesisData.thesis_type_id;
        formValue.value.major = thesisData.major_id;
        formValue.value.degree = thesisData.degree_type_id;
        formValue.value.year = thesisData.thesis_year + "";
        formValue.value.advisor = thesisData.thesis_advisor_name;
        formValue.value.laoAbstract = thesisData.thesis_abstract_info_lao;
        formValue.value.engAbstract = thesisData.thesis_abstract_info_eng;
        formValue.value.liked = thesisData.liked;
        formValue.value.seen = thesisData.seen;
        formValue.value.downloaded = thesisData.downloaded;
        teacherFormValue.value.teacherFullName1 = thesisData.thesis_author_1;
        teacherFormValue.value.teacherFullName2 = thesisData.thesis_author_2;
        teacherFormValue.value.teacherFullName3 = thesisData.thesis_author_3;


        const thesisType = thesisData.thesis_type.thesis_type_name;


        //1. if thesis type is student
        if(thesisType == "ນັກສຶກສາ") {

            //2. get list of member list 
            const resMemberList = await nhost.graphql.request(
                `
                query MyQuery {
                        thesis_student_member_list(where: {thesis_id: {_eq: "${thesisData.thesis_id}"}}) {
                            tsml_id
                            thesis_id
                            student_id
                        }
                    }

                `
            )
            if(resMemberList.error) {
                message.error("ບໍ່ສາມາດຶິງຂໍ້ມູນລາຍຊື່ນັກສຶກສາໄດ້")
                throw new Error(resMemberList.error);
            }

            const memberList = resMemberList.data.thesis_student_member_list;

            const selectedStudentList = [];

            //3. loop add member list
            for(let i = 0; i < memberList.length; i++) {
                const student = dataList.value.find((item) => item.student_id == memberList[i].student_id);
                selectedStudentList.push(student);
                updateList(memberList[i].student_id, "add");
            }
            dataListSelectd.value = selectedStudentList;


        }

        // major.value = formValue.value.major;
        // degree.value = formValue.value.degree;


    } catch(error) {
        console.log("error accoured while load thesis => ", error);
    }
}




onMounted(async () => {
    await Promise.all([
        loadSelectDegree(),
        loadSelectMajor(),
        loadSelectThesisType(),
        loadSelectYear(),
        loadData()
    ]);
    loadSelectStAll();
    await loadThesis();
    await loadFile();
    loading.value = false;
})












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