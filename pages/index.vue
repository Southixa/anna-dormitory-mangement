<template>
    <div class="w-full h-24 mt-4 grid grid-cols-5 gap-4">
        <nuxt-link to="/customer">
            <div class="w-full h-24 bg-blue-400 rounded-lg overflow-hidden flex hover:shadow-lg transition-all duration-200">
                <div class="w-24 h-24 flex justify-center items-center">
                    <Icon name="mdi:user" style="color: white" size="50" />
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-sm mt-5">ຈຳນວນຜູ້ເຊົ່າທັງໝົດ</p>
                    <p class="text-white font-semibold text-2xl mt-2">{{ customers.length }} ຄົນ</p>
                </div>
            </div>
        </nuxt-link>
        <nuxt-link to="/room">
            <div class="w-full h-24 bg-emerald-400 rounded-lg overflow-hidden flex hover:shadow-lg transition-all duration-200">
                <div class="w-24 h-24 flex justify-center items-center">
                    <Icon name="material-symbols:meeting-room" style="color: white" size="50" />
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-sm mt-5">ຈຳນວນຫ້ອງທັງໝົດ</p>
                    <p class="text-white font-semibold text-2xl mt-2">{{ rooms.length }} ຫ້ອງ</p>
                </div>
            </div>
        </nuxt-link>
        <nuxt-link to="/renting">
            <div class="w-full h-24 bg-purple-400 rounded-lg overflow-hidden flex hover:shadow-lg transition-all duration-200">
                <div class="w-24 h-24 flex justify-center items-center">
                    <Icon name="fluent:phone-key-20-filled" style="color: white" size="50" />
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-sm mt-5">ຈຳນວນການເຊົ່າທັງໝົດ</p>
                    <p class="text-white font-semibold text-2xl mt-2">{{ rentings.length }} ສັນຍາ</p>
                </div>
            </div>
        </nuxt-link>
        <nuxt-link to="/announcement">
            <div class="w-full h-24 bg-orange-400 rounded-lg overflow-hidden flex hover:shadow-lg transition-all duration-200">
                <div class="w-24 h-24 flex justify-center items-center">
                    <Icon name="mingcute:news-fill" style="color: white" size="50" />
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-sm mt-5">ຈຳນວນຂ່າວທັງໝົດ</p>
                    <p class="text-white font-semibold text-2xl mt-2">{{ announcements.length }} ໂພສ</p>
                </div>
            </div>
        </nuxt-link>
        <nuxt-link to="/issue-report">
            <div class="w-full h-24 bg-cyan-400 rounded-lg overflow-hidden flex hover:shadow-lg transition-all duration-200">
                <div class="w-24 h-24 flex justify-center items-center">
                    <Icon name="material-symbols:breaking-news-alt-1-rounded" style="color: white" size="50" />
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-sm mt-2">ຈຳນວນຜູ້ເົຊົ່າລາຍງານທັງໝົດ</p>
                    <p class="text-white font-semibold text-2xl mt-2">{{ reportIssues.length }} ຄັ້ງ</p>
                </div>
            </div>
        </nuxt-link>
    </div>
    <div class="w-full mt-4">
        <p class="text-lg font-semibold text-gray-600">ລາຍງານທັງໝົດ</p>
        <div class="w-full grid grid-cols-5 gap-4 mt-4">
            <div class="col-span-1">
                <nuxt-link to="/report/customer">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານຜູ້ເຊົ່າທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/room">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານຫ້ອງທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/renting-in">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານການເຂົ້າເຊົ່າທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/renting-out">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານການອອກເຊົ່າທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/announcement">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານແຈ້ງການທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/issue-report">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານຜູ້ເຊົ່າລາຍງານທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/payment">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານການຊຳລະເງິນທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-span-1">
                <nuxt-link to="/report/staff">
                    <div class="w-full h-24 bg-red-400 rounded-lg flex justify-center items-center">
                        <p class="text-white font-semibold text-lg text-center">ລາຍງານຜູ້ໃຊ້ງານລະບົບທັງໝົດ</p>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>

const { getAll: getAllCustomer } = useCustomer();
const { getAll: getAllRoom } = useRoom();
const { getAll: getAllRenting } = useRenting();
const { getAll: getAllAnnouncement } = useAnnouncement();
const { getAll: getAllReportIssue } = useReportIssue();

const customers = ref([]);
const rooms = ref([]);
const rentings = ref([]);
const announcements = ref([]);
const reportIssues = ref([]);

const loading = ref(false);

const getAllData = async () => {
    const resGetAll = await Promise.all([
        getAllCustomer(),
        getAllRoom(),
        getAllRenting(),
        getAllAnnouncement(),
        getAllReportIssue(),
    ])
    customers.value = resGetAll[0];
    rooms.value = resGetAll[1];
    rentings.value = resGetAll[2];
    announcements.value = resGetAll[3];
    reportIssues.value = resGetAll[4];

    console.log(resGetAll);
}

onMounted( async () => {
    await getAllData();
})

</script>