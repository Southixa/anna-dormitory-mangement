<template>
    <div class="w-full mt-4">
        <div>
            <nuxt-link to="/" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
            </nuxt-link>
        </div>
        <div class="w-full flex justify-center items-center">
            <p class="text-xl font-medium text-gray-600">ລາຍງານຫ້ອງທັງໝົດ</p>
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
                        <th class="border border-gray-300 px-[8px]">ເລກຫ້ອງ</th>
                        <th class="border border-gray-300 px-[8px]">ຊື່ອາຄານ</th>
                        <th class="border border-gray-300 px-[8px]">ລາຄາຕໍ່ເດືອນ</th>
                        <th class="border border-gray-300 px-[8px]">ຈຳນວນຄົນຢູ່ໄດ້ສູງສຸດ</th>
                        <th class="border border-gray-300 px-[8px]">ສ້າງວັນທີ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="100%" ><n-skeleton text :repeat="1" /></td>
                    </tr>
                    <tr v-for="(item, index) in filterRooms" :key  ="index">
                        <td class="border border-gray-300 px-[8px]">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.room_number }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.room_building_name }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ formatCurrency(item?.room_price) }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.room_quantity }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ timeFormatter(item?.created_at) }}</td>
                    </tr>

                    <tr v-if="!loading && filterRooms.length == 0">
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

const { getAll } = useRoom();

const range = ref([Date.now(), Date.now()])

const rooms = ref([]);
const filterRooms = ref([]);

const loading = ref(false);

const getAllRooms = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    rooms.value = addIndex;
    filterRooms.value = addIndex;
}

onMounted( async () => {
    loading.value = true;
    await getAllRooms();
    loading.value = false;
})

const filterByDate = () => {
    if(!range.value){
        filterRooms.value = rooms.value;
        return;
    }
    filterRooms.value = rooms.value.filter((item) => {
        return (new Date(item?.created_at) >= range.value[0]) && (new Date(item?.created_at) <= range.value[1])
    })
    console.log("filterByDate =>", filterRooms.value);
}

const exportExcel = () => {
  if(filterRooms.value.length === 0){
    message.error("ບໍ່ມີຂໍ້ມູນໃຫ້ Export")
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(filterRooms.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, "DataExport.xlsx")
}

watch(range, () => {
    filterByDate();
})

</script>