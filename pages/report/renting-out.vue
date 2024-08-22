<template>
    <div class="w-full mt-4">
        <div>
            <nuxt-link to="/" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
            </nuxt-link>
        </div>
        <div class="w-full flex justify-center items-center">
            <p class="text-xl font-medium text-gray-600">ລາຍງານການອອກເຊົ່າທັງໝົດ</p>
        </div>
        <div class="w-full grid grid-cols-12 mt-4">
            <div class="col-start-2 col-span-4">
                <p>ເລືອກໄລຍະເວລາອອກການເຊົ່າ</p>
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
                        <th class="border border-gray-300 px-[8px]">ໂປຟາຍ</th>
                        <th class="border border-gray-300 px-[8px]">ຊື່</th>
                        <th class="border border-gray-300 px-[8px]">ນາມສະກຸນ</th>
                        <th class="border border-gray-300 px-[8px]">ເບີໂທ</th>
                        <th class="border border-gray-300 px-[8px]">ຫ້ອງ</th>
                        <th class="border border-gray-300 px-[8px]">ອາຄານ</th>
                        <th class="border border-gray-300 px-[8px]">ໃບສັນຍາ</th>
                        <th class="border border-gray-300 px-[8px]">ຄ່າຈອງ</th>
                        <th class="border border-gray-300 px-[8px]">ສະຖານະ</th>
                        <th class="border border-gray-300 px-[8px]">ວັນທີອອກເຊົ່າ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="100%" ><n-skeleton text :repeat="1" /></td>
                    </tr>
                    <tr v-for="(item, index) in filterCustomers" :key  ="index">
                        <td class="border border-gray-300 px-[8px]">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-[8px]">
                            <div class="w-[20px] h-[20px]">
                                <img class="w-full h-full object-cover" :src="getUrl(item?.customer?.customer_profile, 100)" />
                            </div>
                        </td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.customer?.customer_firstname }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.customer?.customer_lastname }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.customer?.customer_phone }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.room?.room_number }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.room?.room_building_name }}</td>
                        <td class="border border-gray-300 px-[8px]">
                            <div class="w-[20px] h-[20px]">
                                <img class="w-full h-full object-cover" :src="getUrl(item?.renting_lease_agreement, 100)" />
                            </div>
                        </td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(item?.renting_deposit) }} ກີບ</td>
                        <td class="border border-gray-300 px-[8px] text-gray-500 ">ອອກແລ້ວ</td>
                        <td class="border border-gray-300 px-[8px]">{{ timeFormatter(item?.renting_start_date) }}</td>
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

const { getAll } = useRenting();

const range = ref([Date.now(), Date.now()])

const customers = ref([]);
const filterCustomers = ref([]);

const loading = ref(false);

const getAllCustomers = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    let addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    addIndex = addIndex.filter((item) => item?.renting_status == "left");

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
        return (new Date(item?.renting_end_date) >= range.value[0]) && (new Date(item?.renting_end_date) <= range.value[1])
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