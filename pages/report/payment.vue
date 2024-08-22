<template>
    <div class="w-full mt-4">
        <div>
            <nuxt-link to="/" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
            </nuxt-link>
        </div>
        <div class="w-full flex justify-center items-center">
            <p class="text-xl font-medium text-gray-600">ລາຍງານຜູ້ໃຊ້ທັງໝົດ</p>
        </div>
        <div class="w-full grid grid-cols-12 mt-4">
            <div class="col-start-2 col-span-4">
                <p>ເລືອກໄລຍະເວລາສ້າງ</p>
                <n-date-picker v-model:value="range" type="daterange" clearable />
            </div>
            <div class="col-start-11 flex items-end">
                <n-button @click="exportExcel"  class="text-white" color="#18a058">
                    <template #icon>
                        <n-icon>
                            <File-icon />
                        </n-icon>
                    </template>
                    Export
                </n-button>
            </div>
        </div>
        <div class="w-full flex justify-center mt-8">
            <table class="border border-gray-300 max-w-[1200px] text-[10px]">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-[8px]">ລຳດັບ</th>
                        <th class="border border-gray-300 px-[8px]">ເດືອນ</th>
                        <th class="border border-gray-300 px-[8px]">ປີ</th>
                        <th class="border border-gray-300 px-[8px]">ຈຳນວນຄົນທີ່ຕ້ອງຈ່າຍ</th>
                        <th class="border border-gray-300 px-[8px]">ຈ່າຍແລ້ວ</th>
                        <th class="border border-gray-300 px-[8px]">ຍັງບໍ່ຈ່າຍ</th>
                        <th class="border border-gray-300 px-[8px]">ຈຳນວນເງິນທັງໝົດ</th>
                        <th class="border border-gray-300 px-[8px]">ຈ່າຍແລ້ວ</th>
                        <th class="border border-gray-300 px-[8px]">ຍັງບໍ່ຈ່າຍ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="100%" ><n-skeleton text :repeat="1" /></td>
                    </tr>
                    <tr v-for="(item, index) in filterCustomers" :key  ="index">
                        <td class="border border-gray-300 px-[8px]">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.payment_month }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.payment_year }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ getTotalListToPay(item?.payment_details) }} ຄົນ</td>
                        <td class="border border-gray-300 px-[8px]">{{ countAlreadyPay(item?.payment_details) }} ຄົນ</td>
                        <td class="border border-gray-300 px-[8px]">{{ countNotAlreadyPay(item?.payment_details) }} ຄົນ</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(calTotalPrice(item?.payment_details)) }} ກີບ</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(calTotalPayPrice(item?.payment_details)) }} ກີບ</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(calTotalNotPayPrice(item?.payment_details)) }} ກີບ</td>
                    </tr>

                    <tr v-if="!loading && filterCustomers.length > 0">
                        <th colspan="3">ລວມ</th>
                        <td class="border border-gray-300 px-[8px]">{{ sumTotalListToPay() }} ຄົນ</td>
                        <td class="border border-gray-300 px-[8px]">{{ sumCountAlreadyPay() }} ຄົນ</td>
                        <td class="border border-gray-300 px-[8px]">{{ sumCountNotAlreadyPay() }} ຄົນ</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(sumCallTotalPrice()) }} ກີບ</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(sumCallTotalPayPrice()) }} ກີບ</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(sumCallTotalNotPayPrice()) }} ກີບ</td>
                    </tr>

                    <tr v-if="!loading && filterCustomers.length == 0">
                        <td colspan="100%" >
                            <div class="w-full flex justify-center">
                                ບໍ່ມີຂໍ້ມູນ
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { File as FileIcon } from '@vicons/fa'
import { timeFormatter, formatCurrency } from '~~/utils/helpers';
import { useMessage } from "naive-ui";
const message = useMessage();
import * as XLSX from 'xlsx'

const { getUrl } = useFile();

const { getAll } = usePayment();

const range = ref([Date.now(), Date.now()])

const customers = ref([]);
const filterCustomers = ref([]);

const loading = ref(false);

const getTotalListToPay = (item) => {
    if(!item){
        return 0;
    }
    return item.length;
}

const countAlreadyPay = (item) => {
    let count = 0;
    item.forEach((item) => {
        if(item?.payment_detail_is_approved == "success"){
            count++;
        }
    })
    return count;
}

const countNotAlreadyPay = (item) => {
    let count = 0;
    item.forEach((item) => {
        if(item?.payment_detail_is_approved != "success"){
            count++;
        }
    })
    return count;
}

const calTotalPrice = (item) => {
    let total = 0;
    item.forEach((item) => {
        total += item?.payment_deatil_total_price;
    })
    return total;
}

const calTotalPayPrice = (item) => {
    let total = 0;
    item.forEach((item) => {
        if(item?.payment_detail_is_approved == "success"){
            total += item?.payment_deatil_total_price;
        }
    })
    return total;
}

const calTotalNotPayPrice = (item) => {
    let total = 0;
    item.forEach((item) => {
        if(item?.payment_detail_is_approved != "success"){
            total += item?.payment_deatil_total_price;
        }
    })
    return total;
}

const sumTotalListToPay = () => {
    let total = 0;
    filterCustomers.value.forEach((item) => {
        total += getTotalListToPay(item?.payment_details);
    })
    return total;
}

const sumCountAlreadyPay = () => {
    let total = 0;
    filterCustomers.value.forEach((item) => {
        total += countAlreadyPay(item?.payment_details);
    })
    return total;
}

const sumCountNotAlreadyPay = () => {
    let total = 0;
    filterCustomers.value.forEach((item) => {
        total += countNotAlreadyPay(item?.payment_details);
    })
    return total;
}

const sumCallTotalPrice = () => {
    let total = 0;
    filterCustomers.value.forEach((item) => {
        total += calTotalPrice(item?.payment_details);
    })
    return total;
}

const sumCallTotalPayPrice = () => {
    let total = 0;
    filterCustomers.value.forEach((item) => {
        total += calTotalPayPrice(item?.payment_details);
    })
    return total;
}

const sumCallTotalNotPayPrice = () => {
    let total = 0;
    filterCustomers.value.forEach((item) => {
        total += calTotalNotPayPrice(item?.payment_details);
    })
    return total;
}

const getAllCustomers = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    customers.value = addIndex;
    filterCustomers.value = addIndex;
}

onMounted( async () => {
    loading.value = true;
    await getAllCustomers();
    loading.value = false;
})

const filterByDate = () => {
    if(!range.value){
        filterCustomers.value = customers.value;
        return;
    }
    filterCustomers.value = customers.value.filter((item) => {
        return (new Date(item?.created_at) >= range.value[0]) && (new Date(item?.created_at) <= range.value[1])
    })
    console.log("filterByDate =>", filterCustomers.value);
}

const exportExcel = () => {
  if(filterCustomers.value.length === 0){
    message.error("ບໍ່ມີຂໍ້ມູນໃຫ້ Export")
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(filterCustomers.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, "DataExport.xlsx")
}

watch(range, () => {
    filterByDate();
})

</script>