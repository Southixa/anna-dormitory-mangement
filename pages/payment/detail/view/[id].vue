<template>
    <div class="w-full mt-4">
        <div>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                </template>
                <template v-slot:item="{ item }">
                <nuxt-link v-if="!item.disabled" :to="item.href">
                    {{ item.title }}
                </nuxt-link>
                <span v-else class="text-gray-400">
                    {{ item.title }}
                </span>
                </template>
            </v-breadcrumbs>
        </div>
        <div class="w-full grid grid-cols-3">
            <div>
                <nuxt-link :to="'/payment/detail/' + paymentDetailData?.payment_detail_payment_id" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ລາຍລະອຽດການຊຳລະເງິນ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-4 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບການໂອນ</p>
                    <div class="w-48 h-48 bg-gray-100 rounded-md overflow-hidden mt-4">
                        <n-image
                            v-if="paymentDetailData?.payment_detail_slip"
                            :src="getUrl(paymentDetailData?.payment_detail_slip, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                        <div class="w-full h-full flex justify-center items-center">
                            ຍັງບໍ່ມີ
                        </div>
                    </div>
                </div>
                <div class="col-span-8">
                    <p class="font-medium">ລາຍລະອຽດການໂອນ</p>
                    <div v-if="loading" class="mt-4">
                        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 50%" />
                    </div>
                    <div v-else>
                        <div class="w-full flex mt-4">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ສະຖານະການໂອນ:</p>
                            </div>
                            <div v-if="paymentDetailData?.payment_detail_is_approved">
                                <P v-if="paymentDetailData?.payment_detail_is_approved === 'waiting'" class="text-white bg-gray-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ລໍຖ້າການໂອນ</P>
                                <P v-else-if="paymentDetailData?.payment_detail_is_approved === 'pending'" class="text-white bg-yellow-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ລໍຖ້າອະນຸມັດ</P>
                                <P v-else-if="paymentDetailData?.payment_detail_is_approved === 'success'" class="text-white bg-green-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ອະນຸມັດແລ້ວ</P>
                                <P v-else-if="paymentDetailData?.payment_detail_is_approved === 'reject'" class="text-white bg-red-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ຖືກຍົກເລີກ</P>
                            </div>
                        </div>
                        <div v-if="paymentDetailData?.payment_detail_is_approved === 'pending'" class="w-full flex items-center gap-4 mt-4">
                            <n-button @click="showModalCancel = true" type="error" class="text-white" icon-placement="right">
                                <template #icon>
                                    <n-icon>
                                        <times-icon />
                                    </n-icon>
                                </template>
                                ປະຕິເສດ
                            </n-button>
                            <n-button @click="showModalApprove = true" type="primary" class="text-white" icon-placement="right">
                                <template #icon>
                                    <n-icon>
                                        <done-filled-icon />
                                    </n-icon>
                                </template>
                                ອະນຸມັດ
                            </n-button>
                        </div>
                        <n-modal
                            v-model:show="showModalCancel"
                            :mask-closable="true"
                            preset="dialog"
                            title="ຢືນຢັນການປະຕິເສດ"
                            content="ຖ້າຢືນຢັນແລ້ວຈະບໍ່ສາມາດແກ້ໄຂໄດ້"
                            positive-text="ຢືນຢັນ"
                            negative-text="ຍົກເລີກ"
                            @positive-click="onPositiveClickCancel"
                            @negative-click="onNegativeClickCancel"
                        />
                        <n-modal
                            v-model:show="showModalApprove"
                            :mask-closable="true"
                            preset="dialog"
                            title="ຢືນຢັນການອະນຸມັດ"
                            content="ຖ້າຢືນຢັນແລ້ວຈະບໍ່ສາມາດແກ້ໄຂໄດ້"
                            positive-text="ຢືນຢັນ"
                            negative-text="ຍົກເລີກ"
                            @positive-click="onPositiveClickApprove"
                            @negative-click="onNegativeClickApprove"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-4 p-4">
            <div class="w-full flex justify-between items-center">
                <p class="font-bold text-lg">ຫ້ອງ {{ paymentDetailData?.renting?.room?.room_number }} ຕຶກ {{ paymentDetailData?.renting?.room?.room_building_name }}</p>
            </div>
            <div class="w-[400px]">
                <div v-if="loading" class="mt-4">
                    <n-skeleton text style="width: 50%" />
                </div>
                <div v-else class="w-full flex mt-4">
                    <div class="min-w-[200px]">
                        <p class="text-gray-500">ລາຄາເຊົ່າຕໍ່ເດືອນ:</p>
                    </div>
                    <p>{{ formatCurrency(paymentDetailData?.renting?.room?.room_price) }} ກີບ</p>
                </div>
            </div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-4 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບສັນຍາເຊົ່າ</p>
                    <div class="w-48 h-48 bg-gray-100 rounded-md overflow-hidden mt-4">
                        <n-image
                            v-if="paymentDetailData?.renting?.renting_lease_agreement"
                            :src="getUrl(paymentDetailData?.renting?.renting_lease_agreement, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
                <div class="col-span-8">
                    <p class="font-medium">ລາຍລະອຽດການຈອງ</p>
                    <div v-if="loading" class="mt-4">
                        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 50%" />
                    </div>
                    <div v-else>
                        <div class="w-full flex mt-4">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ລະຫັດການເຊົ່າ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.renting_id }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເລີ່ມເຊົ່າວັນທີ:</p>
                            </div>
                            <p>{{ timeFormatter(paymentDetailData?.renting?.renting_start_date) }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ອອກວັນທີ:</p>
                            </div>
                            <p>{{ timeFormatter(paymentDetailData?.renting?.renting_end_date) }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ຄ່າຈອງ:</p>
                            </div>
                            <p>{{ formatCurrency(paymentDetailData?.renting?.renting_deposit) }} ກີບ</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ສະຖານະ:</p>
                            </div>
                            <div v-if="paymentDetailData?.renting?.renting_status">
                                <P v-if="paymentDetailData?.renting?.renting_status === 'booking'" class="text-white bg-yellow-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ກຳລັງເຊົ່າ</P>
                                <P v-else-if="paymentDetailData?.renting?.renting_status === 'left'" class="text-white bg-gray-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ອອກແລ້ວ</P>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບຜູ້ເຊົ່າ</p>
                    <div class="w-20 h-20 bg-gray-100 rounded-full overflow-hidden mt-4">
                        <n-image
                            v-if="paymentDetailData?.renting?.customer?.customer_profile"
                            :src="getUrl(paymentDetailData?.renting?.customer.customer_profile, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
                <div class="col-span-8">
                    <p class="font-medium">ລາຍລະອຽດຜູ້ເຊົ່າ</p>
                    <div v-if="loading" class="mt-4">
                        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 50%" />
                    </div>
                    <div v-else>
                        <div class="w-full flex items-center mt-4">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ຊື່:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_firstname }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ນາມສະກຸນ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_lastname }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເພດ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_gender }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເບີໂທ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_phone }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເລກບັດປະຈຳໂຕ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_identification_id }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ບ້ານ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_village }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເມືອງ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_district }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ແຂວງ:</p>
                            </div>
                            <p>{{ paymentDetailData?.renting?.customer?.customer_province }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup>

import { onMounted } from 'vue';
import Rules from '../../utils/rule/index.js';
import { timeFormatter, formatCurrency } from '~~/utils/helpers';

const { updateRentingLeft } = useRenting();
const { getOne, updateStatus } = usePaymentDetail();
const { getUrl } = useFile();
import { useMessage } from "naive-ui";
import { Exit as ExitIcon } from '@vicons/ionicons5'
import { DoneFilled as DoneFilledIcon } from '@vicons/material'
import { Times as TimesIcon } from '@vicons/fa'
import Models from "~/model";
const message = useMessage();


const showModalCancel = ref(false)
const showModalApprove = ref(false)

const onPositiveClickCancel = async () => {
    showModalCancel.value = false
    await cancelPaymentDetail();
}

const onPositiveClickApprove = async () => {
    showModalApprove.value = false
    await approvePaymentDetail();
}

const onNegativeClickCancel = () => {
    showModalCancel.value = false
}

const onNegativeClickApprove = () => {
    showModalApprove.value = false
}


const { id } = useRoute().params;
const loading = ref(false);


const paymentDetailData = ref({});

const items = [
    {
        title: 'ຊຳລະເງິນ',
        disabled: false,
        href: '/payment',
    },
    {
        title: 'ລາຍລະອຽດຊຳລະເງິນ',
        disabled: true,
        href: '/payment/detail/',
    },
    {
        title: 'ລາຍລະອຽດການຊຳລະເງິນ',
        disabled: true,
        href: '/renting/add',
    },
];


const cancelPaymentDetail = async () => {
    loading.value = true;
    const resUpdateStatus = await updateStatus(id, 'reject')
    if(!resUpdateStatus) {
        loading.value = false;
        return;
    }
    await getCurrenPaymentDetail();
    loading.value = false;
}


const approvePaymentDetail = async () => {
    loading.value = true;
    const resUpdateStatus = await updateStatus(id, 'success')
    if(!resUpdateStatus) {
        loading.value = false;
        return;
    }
    await getCurrenPaymentDetail();
    loading.value = false;
}


const getCurrenPaymentDetail = async () => {
    const resGetOne = await getOne(id);
    if(!resGetOne) {
        return;
    }
    paymentDetailData.value = resGetOne;
    console.log(resGetOne);
}


onMounted(async () => {
    loading.value = true;
    await getCurrenPaymentDetail();
    loading.value = false;
})


</script>