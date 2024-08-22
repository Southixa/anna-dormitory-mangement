<template>
    <div class="w-full mt-4">
        <div>
            <nuxt-link to="/" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
            </nuxt-link>
        </div>
        <div class="w-full flex justify-center items-center">
            <p class="text-xl font-medium text-gray-600">ລາຍງານຜູ້ໃຊ້ງານລະບົບທັງໝົດ</p>
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
                        <th class="border border-gray-300 px-[8px]">ໂປຟາຍ</th>
                        <th class="border border-gray-300 px-[8px]">ຊື່</th>
                        <th class="border border-gray-300 px-[8px]">ເບີໂທ</th>
                        <th class="border border-gray-300 px-[8px]">ອີເມວ</th>
                        <th class="border border-gray-300 px-[8px]">ລະຫັດຜ່ານ</th>
                        <th class="border border-gray-300 px-[8px]">ວັນທີຖືກສ້າງ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="100%" ><n-skeleton text :repeat="1" /></td>
                    </tr>
                    <tr v-for="(item, index) in filterStaffs" :key  ="index">
                        <td class="border border-gray-300 px-[8px]">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-[8px]">
                            <div class="w-[20px] h-[20px]">
                                <img class="w-full h-full object-cover" :src="getUrl(item?.avatarUrl, 100)" />
                            </div>
                        </td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.displayName }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.phoneNumber }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.email }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ item?.currentChallenge }}</td>
                        <td class="border border-gray-300 px-[8px]">{{ timeFormatter(item?.createdAt) }}</td>
                    </tr>

                    <tr v-if="!loading && filterStaffs.length == 0">
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

const { getAll } = useStaff();

const range = ref([Date.now(), Date.now()])

const staffs = ref([]);
const filterStaffs = ref([]);

const loading = ref(false);

const getAllStaff = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    staffs.value = addIndex;
    filterStaffs.value = addIndex;
}

onMounted( async () => {
    loading.value = true;
    await getAllStaff();
    loading.value = false;
})

const filterByDate = () => {
    if(!range.value){
        filterStaffs.value = staffs.value;
        return;
    }
    filterStaffs.value = staffs.value.filter((item) => {
        return (new Date(item?.created_at) >= range.value[0]) && (new Date(item?.created_at) <= range.value[1])
    })
    console.log("filterByDate =>", filterStaffs.value);
}

const exportExcel = () => {
  if(filterStaffs.value.length === 0){
    message.error("ບໍ່ມີຂໍ້ມູນໃຫ້ Export")
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(filterStaffs.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, "DataExport.xlsx")
}

watch(range, () => {
    filterByDate();
})

</script>