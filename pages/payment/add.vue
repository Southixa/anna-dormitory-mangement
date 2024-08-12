<template>
    <div class="w-full mt-4">
        <div>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                </template>
            </v-breadcrumbs>
        </div>
        <div class="w-full grid grid-cols-3">
            <div>
                <nuxt-link to="/payment" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ເພີ່ມຂໍ້ມູນເດືອນທີ່ຕອ້ງຊຳລະ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[500px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ເດືອນ" path="month">
                    <n-select 
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.month" 
                    :options="monthOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ປີ" path="year">
                    <n-select 
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.year" 
                    :options="yearOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ຊີ່ທະນາຄານ" path="accountBankName">
                    <n-input 
                    placeholder="ປ້ອນຊື່ທະນາຄານ..." 
                    v-model:value="formValue.accountBankName"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ເລກບັນຊີທະນາຄານ" path="accountNumber">
                    <n-input 
                    placeholder="ປ້ອນເລກບັນຊີທະນາຄານ..." 
                    v-model:value="formValue.accountNumber"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ຊື່ເຈົ້າຂອງເລກບັນຊີ" path="accountName">
                    <n-input 
                    placeholder="ປ້ອນຊື່ເຈົ້າຂອງເລກບັນຊີ..." 
                    v-model:value="formValue.accountName"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                
            </n-form>

            <p>ຮູບ QR-Code ບັນຊີ</p>
            
                    <n-upload
                        @change="handleUploadChange"
                        class="w-full flex justify-center items-center mb-20"
                        :max="1"
                        :default-upload="false"
                        :default-file-list="fileList"
                        list-type="image-card"
                    />

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/payment">
                    <n-button :disabled="loading" tertiary color="#002749" size="medium" class="w-40 shadow font-normal">
                        ຍົກເລີກ
                    </n-button>
                </NuxtLink>
                <n-button @click="handleAdd" :loading="loading" type="primary" class="w-40 shadow font-normal text-white" size="medium">
                    ບັນທຶກ
                </n-button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup>

import { onMounted } from 'vue';
import Rules from '../../utils/rule/index.js';

const { add, getOneByMonthAndYear } = usePayment();
const { getAll: getAllRenting } = useRenting();
const { addList: addPaymentDetailList } = usePaymentDetail();
import { useMessage } from "naive-ui";
import Models from "~/model";
const message = useMessage();

const showModal = ref(false);
const previewImageUrl = ref("");



const fileList = ref([
]);

const handleUploadChange = (options) => {
    const { file, event } = options;
    if(file.status === "removed") {
        fileList.value = [];
        return;
    }

    // filter file.type only png, jpg, jpeg
    if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
        message.error("ອັບໂຫຼດແຕ່ສະເພາະຮູບທຳນັ້ນ");
    }

    fileList.value = [file];
};


const items = [
    {
        title: 'ການຊຳລະເງິນ',
        disabled: false,
        href: '/payment',
    },
    {
        title: 'ເພີ່ມການຊຳລະເງິນ',
        disabled: true,
        href: '/payment/add',
    },
];

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const startYear = 2015;

const formRef = ref(null);
const size = ref('medium');
const formValue = ref({
    qrCode: "test",
    month: currentMonth.toString(),
    year: currentYear.toString(),
    accountBankName: "accountBankName1",
    accountNumber: "324324234",
    accountName: "accountName1",
})

const monthOptions =  ref(
    Array.from({ length: 12 }, (_, index) => ({
        label: (index + 1).toString(),
        value: (index + 1).toString(),
    }))
);

const yearOptions = ref(
  Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => {
      const year = (currentYear - index).toString();
      return {
        label: year,
        value: year,
      };
    }
  )
);

const loading = ref(false);


const rules = Rules.Payment;

async function addPaymentDetail(payment_id) {
    
    let paymentDetailList = [];

    for(let i = 0; i < rentings.value.length; i++) {
        const item = {
            payment_detail_renting_id: rentings.value[i].renting_id,
            payment_detail_payment_id: payment_id,
            payment_deatil_total_price: rentings.value[i].room.room_price,
        }
        paymentDetailList.push(item);
    }

    console.log("paymentDetailList =>");
    console.log(paymentDetailList);

    const resAddList = await addPaymentDetailList(paymentDetailList);
    if(!resAddList) {
        return false;
    }

    return true;

}

async function handleAdd () {

    //1. check validate input
    const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
    if(invalidField.length > 0) {
        message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
        console.log("invalidField", invalidField);
        return;
    }

    //2. check image
    if(fileList.value.length === 0) {
        message.error("ກະລຸນາໃສ່ຮູບພາບ")
        return;
    }

    loading.value = true;

    const resGetOneByMonthAndYear = await getOneByMonthAndYear(formValue.value.month, formValue.value.year);
    console.log("resGetOneByMonthAndYear", resGetOneByMonthAndYear);
    if(!resGetOneByMonthAndYear) {
        loading.value = false;
        return;
    }
    if(resGetOneByMonthAndYear.length > 0) {
        message.error(`ເດືອນ ${formValue.value.month} ໃນປີ ${formValue.value.year} ຖືກສ້າງຂຶ້ນແລ້ວ`)
        loading.value = false;
        return;
    }

    formValue.value.qrCode = fileList.value[0].file;

    const resAddPayment = await add(formValue.value);
    console.log(resAddPayment);
    if(!resAddPayment) {
        loading.value = false;
        return;
    }


    const resAddPaymentDetail = await addPaymentDetail(resAddPayment.payment_id);
    if(!resAddPaymentDetail) {
        loading.value = false;
        return;
    }

    loading.value = false;
    await navigateTo('/payment');
}


const rentings = ref([]);

const getAllRentings = async () => {
    const resGetAll = await getAllRenting();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);

    // fillter only renting_status = booking
    const resFilter = addIndex.filter(item => item.renting_status === "booking");
    console.log("resFilter only booking =>");
    console.log(resFilter);

    rentings.value = resFilter;
}

onMounted( async () => {
    await getAllRentings();
})


</script>