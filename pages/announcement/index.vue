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
                <n-input @keyup.enter="handleSearch" v-model:value="search" type="text" placeholder="ຄົ້ນຫາຫົວຂໍ້ ແລະ ລາຍລະອຽດ..." class="mt-1" >
                    <template #prefix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="col-start-12 col-span-2 w-full flex items-end text-white">
                <NuxtLink to="/announcement/add">
                    <n-button color="#18a058">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        ເພີ່ມແຈ້ງການ
                    </n-button>
                </NuxtLink>
            </div>
        </div>
        <div class="w-full mt-8">
            <p class="text-gray-600 mb-2">ແຈ້ງການທັງໝົດ <span class="text-gray-800 font-semibold">{{ announcements.length }}</span> ລາຍການ</p>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="announcements"
            >
                <template v-slot:item.announcement_thumbnail="{ value }">
                    <div class="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                        <n-image
                            :src="getUrl(value, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </template>
                <template v-slot:item.announcement_detail="{ value }">
                    {{ setMaxText(value, 10) }}
                </template>
                <template v-slot:item.created_at="{ value }">
                    {{ timeFormatter(value) }}
                </template>
                <template v-slot:item.manage="{ item }">
                    <div class="w-full flex items-center gap-2">
                        <NuxtLink :to="`/announcement/${item.announcement_id}`">
                            <n-button circle>
                                <template #icon>
                                    <n-icon><edit-icon class="text-gray-500" /></n-icon>
                                </template>
                            </n-button>
                        </NuxtLink>
                        <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" :positive-button-props="{ type: 'error', class: 'text-white' }" @positive-click="handleDelete(item.announcement_id, item.announcement_thumbnail)">
                            <template #activator>
                                <n-button class="w-9 h-9 text-white group">
                                    <template #icon>
                                        <n-icon size="18"><trash-icon class="group-hover:text-red-500 text-gray-500"/></n-icon>
                                    </template>
                                </n-button>
                            </template>
                            ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ຫຼືບໍ່?
                        </n-popconfirm>
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
import { Edit32Filled as EditIcon } from '@vicons/fluent'
import { Random, Trash as TrashIcon } from "@vicons/fa";
import { onMounted } from 'vue';
import { formatCurrency, timeFormatter, setMaxText } from '~~/utils/helpers';


const { getUrl } = useFile();
const { getAll, del, searchAnnouncement } = useAnnouncement();

const items = [
    {
        title: 'ແຈ້ງການ',
        disabled: true,
        href: '/customer',
    },
];

const search = ref('')
const headers = [
        { title: 'ລຳດັບ', key: 'index'},
        { title: 'ຮູບແຈ້ງການ', key: 'announcement_thumbnail' },
        { title: 'ຫົວຂໍ້', key: 'announcement_title' },
        { title: 'ລາຍລະອຽດ', key: 'announcement_detail' },
        { title: 'ໂພສວັນທີ', key: 'created_at' },
        { title: 'ຈັດການ', key: 'manage' },
      ]

const announcements = ref([]);
const loading = ref(false);

const editItem = (item) => {
    console.log(item)
}
const deleteItem = (item) => {
    console.log(item)
}

const getAllAnnouncements = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    announcements.value = addIndex;
}

const handleSearch = async () => {
    loading.value = true;
    if(!search.value){
        await getAllAnnouncements();
        loading.value = false;
        return;
    }
    const resSearch = await searchAnnouncement(search.value);
    if(!resSearch){
        loading.value = false;
        return;
    }
    const addIndex = resSearch.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    announcements.value = addIndex;
    loading.value = false;
}

onMounted( async () => {
    loading.value = true;
    await getAllAnnouncements();
    loading.value = false;
})

const handleDelete = async (id, thumbnail) => {

    loading.value = true;
    const resDel = await del(id, thumbnail);
    if(!resDel){
        loading.value = false;
        return;
    }
    await getAllAnnouncements();
    loading.value = false;
}

</script>