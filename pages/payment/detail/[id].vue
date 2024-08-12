<template>
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
    <div>
        <nuxt-link to="/payment" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit mb-4">
            <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
            <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
        </nuxt-link>
    </div>
    <div class="w-full bg-white shadow-md rounded-md border border-gray-100 p-4 mb-40">
        <div class="w-full flex justify-center mb-8 mt-4">
            <p class="text-xl font-medium">ລາຍການຜູ້ທີ່ຕ້ອງຊຳລະໃນເດືອນນີ້</p>
        </div>
        <div class="w-full flex mb-4 gap-4 justify-center">
            <div class="w-[300px] h-[60px] border-2 border-gray-500/40 rounded-md flex justify-center items-center gap-4">
                <p>ເດືອນ:</p>                
                <p class="text-green-500 text-lg font-medium">{{ currentPayment?.payment_month }}</p>                
            </div>
            <div class="w-[300px] h-[60px] border-2 border-gray-500/40 rounded-md flex justify-center items-center gap-4">
                <p>ປີ:</p>                
                <p class="text-green-500 text-lg font-medium">{{ currentPayment?.payment_year }}</p>                
            </div>
        </div>
        <div class="w-full grid grid-cols-12 mt-12">
            <div class="col-span-6">
                <p class="text-gray-600">ຄົ້ນຫາ</p>
                <n-input @keyup.enter="handleSearch" v-model:value="search" type="text" placeholder="ຄົ້ນຫາຊື່ ແລະ ນາມສະກຸນຜູ້ເຊົ່າ..." class="mt-1" >
                    <template #prefix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="col-start-12 col-span-2 w-full flex items-end text-white">

            </div>
        </div>
        <div class="w-full mt-8">
            <p class="text-gray-600 mb-2">ຜູ້ຕ້ອງຊຳລະທັງໝົດ <span class="text-gray-800 font-semibold">{{ paymentDetails.length }}</span> ລາຍການ</p>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="paymentDetails"
            >
                <template v-slot:item.renting.customer.customer_profile="{ value }">
                    <div class="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                        <n-image
                            :src="getUrl(value, 200)"
                            class="w-full h-full rounded-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </template>
                <template v-slot:item.payment_detail_slip="{ value }">
                    <div v-if="value" class="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                        <n-image
                            :src="getUrl(value, 200)"
                            class="w-full h-full rounded-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                    <p v-else>--</p>
                </template>
                <template v-slot:item.payment_deatil_total_price="{ value }">
                    <p v-if="value">{{ formatCurrency(value) }} ກີບ</p>
                    <p v-else>--</p>
                </template>
                <template v-slot:item.payment_detail_is_approved="{ value }">
                    <div v-if="value == `waiting`" class="bg-gray-300 min-w-8 px-4 py-[2px] text-xs text-white text-center rounded-full">ລໍຖ້າການຊຳລະ</div>
                    <div v-else-if="value == `pending`" class="bg-yellow-400 min-w-8 px-4 py-[2px] text-xs text-white rounded-full">ລໍຖ້າອະນຸມັດ</div>
                    <div v-else-if="value == `success`" class="bg-green-400 min-w-8 px-4 py-[2px] text-xs text-white rounded-full">ສຳເລັດແລ້ວ</div>
                    <div v-else-if="value == `reject`" class="bg-red-400 min-w-8 px-4 py-[2px] text-xs text-white rounded-full">ຖືກຍົກເລີກ</div>
                </template>
                <template v-slot:item.manage="{ item }">
                    <div class="w-full flex items-center gap-2">
                        <NuxtLink :to="`/payment/detail/view/${item.payment_detail_id}`">
                            <n-button circle>
                                <template #icon>
                                    <n-icon><eye-icon class="text-gray-500" /></n-icon>
                                </template>
                            </n-button>
                        </NuxtLink>
                    </div>
                    </template>
                    <template v-slot:no-data>
                        ບໍ່ມີຂໍ້ມູນ
                    </template>
            </v-data-table>
        </div>
    </div>
</template>

<style scoped>
</style>

<script setup>
import { IosSearch } from '@vicons/ionicons4'
import { Add as AddIcon } from '@vicons/ionicons5'
import { Eye as EyeIcon } from '@vicons/ionicons5'
import { Edit32Filled as EditIcon } from '@vicons/fluent'
import { Random, Trash as TrashIcon } from "@vicons/fa";
import { onMounted } from 'vue';
import { formatCurrency, timeFormatter } from '~~/utils/helpers';

const { getAll, del } = useRenting()
const { getAllByPaymentId, searchPaymentDetail } = usePaymentDetail();
const { getOne } = usePayment();
const { getUrl } = useFile();

const { id } = useRoute().params;

const items = [
    {
        title: 'ຊຳລະເງິນ',
        disabled: false,
        href: '/payment',
    },
    {
        title: 'ລາຍລະອຽດຊຳລະເງິນ',
        disabled: true,
        href: '/customer',
    },
];

const search = ref('')
const headers = [
        { title: 'ລຳດັບ', key: 'index'},
        { title: 'ໂປຟາຍ', key: 'renting.customer.customer_profile' },
        { title: 'ຊື່', key: 'renting.customer.customer_firstname' },
        { title: 'ນາມສະກຸນ', key: 'renting.customer.customer_lastname' },
        { title: 'ເບີໂທ', key: 'renting.customer.customer_phone' },
        { title: 'ເລກຫ້ອງເຊົ່າ', key: 'renting.room.room_number' },
        { title: 'ຄ່າເຊົ່າ', key: 'payment_deatil_total_price' },
        { title: 'ຮູບການໂອນ', key: 'payment_detail_slip' },
        { title: 'ສະຖານະ', key: 'payment_detail_is_approved' },
        { title: 'ຈັດການ', key: 'manage' },
      ]

const paymentDetails = ref([]);
const currentPayment = ref({});
const loading = ref(false);

const editItem = (item) => {
    console.log(item)
}
const deleteItem = (item) => {
    console.log(item)
}

const getAllPaymentDetails = async () => {
    const resGetAll = await getAllByPaymentId(id);
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    paymentDetails.value = addIndex;
}

const getCurrentPayment = async () => {
    const resGetOne = await getOne(id);
    if(!resGetOne){
        return;
    }
    currentPayment.value = resGetOne;
    console.log(resGetOne);
}

const handleSearch = async () => {
    loading.value = true;
    if(!search.value){
        await getAllPaymentDetails();
        loading.value = false;
        return;
    }
    const resSearch = await searchPaymentDetail(search.value);
    if(!resSearch){
        loading.value = false;
        return;
    }
    const addIndex = resSearch.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    paymentDetails.value = addIndex;
    loading.value = false;
}

onMounted( async () => {
    loading.value = true;
    await Promise.all([
        getAllPaymentDetails(),
        getCurrentPayment()
    ])
    loading.value = false;
})


</script>