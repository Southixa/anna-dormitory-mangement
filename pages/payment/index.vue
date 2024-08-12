<template>
    <div>
        <v-breadcrumbs :items="items">
            <template v-slot:prepend>
            </template>
        </v-breadcrumbs>
    </div>
    <div class="w-full bg-white shadow-md rounded-md border border-gray-100 p-4 mb-40">
        <div class="w-full grid grid-cols-12">
            <div class="col-span-6">
                <p class="text-gray-600">ຄົ້ນຫາ</p>
                <n-input @keyup.enter="handleSearch" v-model:value="search" type="text" placeholder="ຄົ້ນຫາເດືອນ ແລະ ປີ..." class="mt-1" >
                    <template #prefix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="col-start-11 col-span-2 w-full flex items-end justify-end text-white">
                <NuxtLink to="/payment/add">
                    <n-button color="#18a058">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        ເພີ່ມເດືອນທີ່ຕອ້ງຊຳລະ
                    </n-button>
                </NuxtLink>
            </div>
        </div>
        <div class="w-full mt-8">
            <p class="text-gray-600 mb-2">ເດືອນທັງໝົດ <span class="text-gray-800 font-semibold">{{ payments.length }}</span> ລາຍການ</p>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="payments"
            >
                <template v-slot:item.manage="{ item }">
                    <div class="flex items-center gap-2 w-[100px]">
                        <NuxtLink :to="`/payment/${item.payment_id}`">
                            <n-button circle>
                                <template #icon>
                                    <n-icon><edit-icon class="text-gray-500" /></n-icon>
                                </template>
                            </n-button>
                        </NuxtLink>
                        <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" :positive-button-props="{ type: 'error', class: 'text-white' }" @positive-click="handleDelete(item.payment_id, item.payment_qr_code)">
                            <template #activator>
                                <n-button class="w-9 h-9 text-white group">
                                    <template #icon>
                                        <n-icon size="18"><trash-icon class="group-hover:text-red-500 text-gray-500"/></n-icon>
                                    </template>
                                </n-button>
                            </template>
                            ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ຫຼືບໍ່?
                        </n-popconfirm>
                        <NuxtLink :to="`/payment/detail/${item.payment_id}`">
                            <n-button icon-placement="right" class=" group">
                                <template #icon>
                                    <n-icon size="18"><arrow-forward-icon class=" text-gray-500"/></n-icon>
                                </template>
                                ລາຍລະອຽດການຊຳລະ
                            </n-button>
                        </NuxtLink>
                    </div>
                    </template>
                    <template v-slot:no-data>
                        ບໍໍ່ມີຂໍ້ມູນ
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
import { ArrowForward as ArrowForwardIcon } from '@vicons/ionicons5'
import { Edit32Filled as EditIcon } from '@vicons/fluent'
import { Random, Trash as TrashIcon } from "@vicons/fa";
import { onMounted } from 'vue';
import { formatCurrency } from '~~/utils/helpers';

const { getAll, del, searchPayment } = usePayment()
const { getUrl } = useFile();

const items = [
    {
        title: 'ຊຳລະເງິນ',
        disabled: true,
        href: '/customer',
    },
];

const search = ref('')
const headers = [
        { title: 'ລຳດັບ', key: 'index'},
        { title: 'ເດືອນ', key: 'payment_month' },
        { title: 'ປີ', key: 'payment_year' },
        { title: 'ຈັດການ', key: 'manage' },
      ]

const payments = ref([]);
const loading = ref(false);

const editItem = (item) => {
    console.log(item)
}
const deleteItem = (item) => {
    console.log(item)
}

const getAllPayments = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    payments.value = addIndex;
}

const handleSearch = async () => {
    loading.value = true;
    if(!search.value){
        await getAllPayments();
        loading.value = false;
        return;
    }
    const resSearch = await searchPayment(search.value);
    if(!resSearch){
        loading.value = false;
        return;
    }
    const addIndex = resSearch.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    payments.value = addIndex;
    loading.value = false;
}

onMounted( async () => {
    loading.value = true;
    await getAllPayments();
    loading.value = false;
})

const handleDelete = async (id, qrCode) => {

    loading.value = true;
    const resDel = await del(id, qrCode);
    if(!resDel){
        loading.value = false;
        return;
    }
    await getAllPayments();
    loading.value = false;
}

</script>