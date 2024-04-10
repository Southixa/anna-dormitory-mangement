<template>
    <div class="w-full bg-gray-200 min-h-screen flex relative">
      <nav class="h-full w-72 bg-primary p-5 fixed top-0 left-0">
        <div class="h-full w-full">
          <div class="w-full h-16 flex items-center">
            <div class="w-16 h-16">
              <img src="~/assets/image/logo/logo_white_bg.png" alt="">
            </div>
            <div class="p-4 grow">
              <p class="text-white text-xl font-bold">Sangsavanh</p>
            </div>
          </div>
          <div class="w-full h-[300px] mt-16">

            <NavManu v-for="item in navMenuList" :key="item.name" :name="item.name" :icon="item.icon" :size="item.size" :path="item.path" :active="getRouteName() == item.path"/>

          </div>
        </div>
      </nav>
      <div class="h-full min-w-72">
      </div>
      <div class="grow bg-gray-100">
        <div class="w-full bg-white shadow-sm flex items-center justify-between px-4 py-2">
          <div class="w-8 h-8 flex justify-center items-center">
            <Icon name="fa:navicon" size="24" class="text-gray-500"></Icon>
          </div>
          <div class="  flex gap-3 items-center">
            <p class="font-normal text-gray-800">Admin</p>
            <div class="w-12 h-12 rounded-full">
              <img src="~/assets/image/avatar/avatar1.png" alt="" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
        <div class="px-6">
          <div class="max-w-screen-2xl mx-auto my-4">
            <h2 class="font-bold text-xl text-gray-900">{{ getPageTitle() }}</h2>
            <p class="font-light text-normal text-gray-600 mt-1">{{ getPageName() }}</p>
          </div>
          <div>
            <slot />  
          </div>
        </div>
        
      </div>
    </div>
  </template>

<script setup>
const navMenuList = [
  {
    name: 'ລາຍງານ',
    icon: 'entypo:bar-graph',
    size: '24',
    path: '/dashboard',
    pageTitle: 'ລາຍງານສະພາບລວມ'
  },
  {
    name: 'ຂໍ້ມູນຜູ້ໃຊ້',
    icon: 'bi:people-fill',
    size: '24',
    path: '/user',
    pageTitle: 'ຈັດການຂໍ້ມູນຜູ້ໃຊ້ເວັບໄຊ'
  },
  {
    name: 'ຂໍ້ມູນນັກສຶກສາ',
    icon: 'ph:student-fill',
    size: '24',
    path: '/student',
    pageTitle: 'ຈັດການຂໍ້ມູນນັກສຶກສາ'
  },
  {
    name: 'ຂໍ້ມູນສາຂາຮຽນ',
    icon: 'entypo:bar-graph',
    size: '24',
    path: '/major',
    pageTitle: 'ຈັດການຂໍ້ມູນສາຂາຮຽນ'
  },
  {
    name: 'ຂໍ້ມູນບົດຈົບ',
    icon: 'bi:people-fill',
    size: '24',
    path: '/thesis',
    pageTitle: 'ຈັດການບົດຈົບທັງໝົດ'
  },
  {
    name: 'ຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ',
    icon: 'ph:student-fill',
    size: '24',
    path: '/stuff',
    pageTitle: 'ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ'
  },
  {
    name: 'ອອກຈາກລະບົບ',
    icon: 'ph:student-fill',
    size: '24',
    path: '/login',
    pageTitle: 'ເຂົ້າສູ່ລະບົບ'
  }
]

function getRouteName() {
  const fullRoute = useRoute().path;
  const routeName = fullRoute.split('/')[1];
  if(routeName == "") return navMenuList[0].path;
  return "/" + routeName;
}

function getPageTitle() {
  const routeName = getRouteName();
  const pageTitle = navMenuList.find(x => x.path == routeName).pageTitle;
  return pageTitle;
}

function getPageName() {
  const routeName = getRouteName();
  const pageName = navMenuList.find(x => x.path == routeName).name;
  return pageName;
}

</script>