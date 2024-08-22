<template>
    <div class="w-screen h-screen bg-white flex">
        <div class="min-w-[220px] max-w-[220px] h-screen"></div>
        <div class="min-w-[220px] max-w-[220px] h-screen bg-white fixed shadow-xl p-4 z-10">
            <div class="w-full flex gap-4 items-center mb-12">
                <div class="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                    <img src="~/assets/image/logo/anna_icon.png" alt="logo" class="w-full h-full object-contain" />
                </div>
                <p class="text-gray-700">ເວັບໄຊຈັດການຫໍພັກແອນນາ</p>
            </div>
            <NuxtLink v-if="isCurrentNav('/')" to="/">
                <div class="w-full bg-[#18a058] flex items-center rounded-lg overflow-hidden hover:shadow-[#18a058] shadow-sm">
                    <div class="w-10 h-10  flex justify-center items-center">
                        <Icon name="tabler:home" size="20" color="white" />
                    </div>
                    <p class="text-white font-medium">ລາຍງານ</p>
                </div>
            </NuxtLink>
            <NuxtLink v-else to="/">
                <div class="w-full flex items-center rounded-lg overflow-hidden hover:bg-gray-100 transition-all ease-in-out duration-200">
                    <div class="w-10 h-10  flex justify-center items-center">
                        <Icon name="tabler:home" size="20" color="#9ca3af" />
                    </div>
                    <p class="text-gray-500">ລາຍງານ</p>
                </div>
            </NuxtLink>
            <p class="text-gray-400 mt-4 text-sm mb-2">ຈັດການຂໍ້ມູນຫຼັກ</p>
            <div class="cursor-pointer w-full flex justify-between items-center rounded-lg overflow-hidden hover:bg-gray-100 transition-all ease-in-out duration-200 mb-2" @click="navIsOpen = !navIsOpen">
                <div class="flex items-center">
                    <div class="w-10 h-10  flex justify-center items-center">
                        <Icon name="mingcute:user-setting-line" size="20" color="gray" />
                    </div>
                    <p class="text-gray-500 font-normal">ຈັດການຂໍ້ມູນຜູ້ເຊົ່າ</p>
                </div>
                <div class="w-10 h-10 flex justify-center items-center">
                    <Icon v-if="!navIsOpen" name="mingcute:down-fill" size="20" class="text-gray-400" />
                    <Icon v-else name="mingcute:up-fill" size="20" class="text-gray-400" />
                </div>
            </div>
            <div class="w-full mb-4" :class="[navIsOpen ? 'flex' : 'hidden']">
                <div class="grow">
                    <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.path">
                        <div v-if="isCurrentNav(item.path)" class="grow h-10 flex items-center rounded-md overflow-hidden bg-[#18a058] hover:opacity-80 transition-all ease-in-out duration-200 mb-2">
                            <div class="w-3">
                            </div>
                            <div class="w-10 h-10 flex justify-center items-center">
                                <div class="w-3 h-[3px] bg-gray-300 rounded-full"></div>
                            </div>
                            <p class="text-white font-normal text-sm">{{ item.name }}</p>
                        </div>
                        <div v-else class="grow h-10 flex items-center rounded-md overflow-hidden hover:bg-gray-100 transition-all ease-in-out duration-200 mb-2">
                            <div class="w-3">
                            </div>
                            <div class="w-10 h-10 flex justify-center items-center">
                                <div class="w-3 h-[3px] bg-gray-300 rounded-full"></div>
                            </div>
                            <p class="text-gray-500 font-normal text-sm">{{ item.name }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <NuxtLink v-if="isCurrentNav('/staff')" to="/staff">
                <div class="w-full flex items-center rounded-lg overflow-hidden bg-[#18a058] hover:opacity-80 transition-all ease-in-out duration-200 mb-2">
                    <div class="w-10 h-10  flex justify-center items-center">
                        <Icon name="octicon:person-24" size="20" class="text-white"/>
                    </div>
                    <p class="text-white font-medium">ຂໍ້ມູນຜູ້ໃຊ້</p>
                </div>
            </NuxtLink>
            <NuxtLink v-else to="/staff">
                <div class="w-full flex items-center rounded-lg overflow-hidden hover:bg-gray-100 transition-all ease-in-out duration-200 mb-2">
                    <div class="w-10 h-10  flex justify-center items-center">
                        <Icon name="octicon:person-24" size="20" class="text-gray-500"/>
                    </div>
                    <p class="text-gray-500 font-medium">ຂໍ້ມູນຜູ້ໃຊ້</p>
                </div>
            </NuxtLink>
            <div @click="showModal = true" class="cursor-pointer w-full bg-red-500 flex items-center rounded-lg overflow-hidden shadow-red-200 shadow-md">
                <div class="w-10 h-10  flex justify-center items-center">
                    <Icon name="ci:exit" size="20" color="white" />
                </div>
                <p class="text-white font-medium">ອອກຈາກລະບົບ</p>
                <n-modal
                    v-model:show="showModal"
                    preset="dialog"
                    title="ຢືນຢັນການອອກຈາກລະບົບ"
                    content="ອອກຈາກລະບົບ?"
                    positive-text="ຕົກລົງ"
                    negative-text="ຍົກເລີກ"
                    @positive-click="onPositiveClick"
                    @negative-click="onNegativeClick"
                />
            </div>
        </div>
        <div class="grow px-4">
            <div class="max-w-screen-xl mx-auto">
                <div class="w-full bg-white shadow-md rounded-md mt-2 flex justify-between items-center px-2 py-1">
                    <div class="flex items-center">
                        <p class="text-gray-800 font-medium">Anna Dormitory Management System</p>
                    </div>
                    <div class="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center">

                    </div>
                </div>
            </div>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { onBeforeRouteUpdate } from 'vue-router';


const navIsOpen = ref(false);
const showModal = ref(false)

const onPositiveClick = () => {
    showModal.value = false
    navigateTo('/login')
}
const onNegativeClick = () => {
    showModal.value = false
}

const isCurrentNav = (path) => {
    const fullRoute = useRoute().path;
    let routeName = fullRoute.split('/')[1];
    if(routeName == "") {
        routeName = "/";
    } else {
        routeName = "/" + routeName;
    };
    return routeName === path;
}


const navItems = [
    { name: "ຂໍ້ມູນຜູ້ເຊົ່າ", path: "/customer" },
    { name: "ຂໍ້ມູນຫ້ອງເຊົ່າ", path: "/room" },
    { name: "ຂໍ້ມູນການເຊົ່າ", path: "/renting" },
    { name: "ຂໍ້ມູນແຈ້ງການ", path: "/announcement" },
    { name: "ຂໍ້ມູນຜູ້ເຊົ່າສົ່ງລາຍງານ", path: "/issue-report" },
    { name: "ຂໍ້ມູນການຊຳລະເງິນ", path: "/payment" },
]

</script>