<template>
  <div class="max-w-screen-2xl mx-auto">
    <div class="grid grid-cols-5 gap-5">

      <div class="w-full h-36 bg-white rounded-md shadow-sm flex justify-center items-center flex-col gap-2">
        <span class="text-3xl font-bold">{{ totalUserCount }}</span>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-orange-600 rounded-full"></div>
          <span>ຜູ້ໃຊ້</span>
        </div>
      </div>

      <div class="w-full h-36 bg-white rounded-md shadow-sm flex justify-center items-center flex-col gap-2">
        <span class="text-3xl font-bold">{{ totalStudentCount }}</span>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-green-600 rounded-full"></div>
          <span>ນັກສຶກສາ</span>
        </div>
      </div>

      <div class="w-full h-36 bg-white rounded-md shadow-sm flex justify-center items-center flex-col gap-2">
        <span class="text-3xl font-bold">{{ totalMajorCount }}</span>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-yellow-600 rounded-full"></div>
          <span>ສາຂາ</span>
        </div>
      </div>

      <div class="w-full h-36 bg-white rounded-md shadow-sm flex justify-center items-center flex-col gap-2">
        <span class="text-3xl font-bold">{{ totalThesisCount }}</span>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span>ບົດຈົບ</span>
        </div>
      </div>

      <div class="w-full h-36 bg-white rounded-md shadow-sm flex justify-center items-center flex-col gap-2">
        <span class="text-3xl font-bold">{{ totalStaffCount }}</span>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
          <span>ຜູ້ໃຊ້ລະບົບ</span>
        </div>
      </div>
      
    </div>


    <div class="w-full bg-slate-200 min-h-[550px] mt-6 flex gap-6">
      <div class="grow bg-white rounded-md p-4">
        <div class="text-gray-800 font-medium mb-4">ບົດຈົບນຳເຂົ້າ</div>
        <div class="min-h-[400px] w-full" ref="chartDom">
          ok
        </div>
        <div class="flex gap-3 mt-4 ml-4 items-center">
          <div class="w-16 h-6 bg-blue-600 rounded-md"></div>
          <span>ບົດຈົບ</span>
        </div>
      </div>
      <div class="w-80 min-h-[400px] bg-white rounded-md p-4">
        <div class="text-gray-800 font-medium mb-4">ປະເພດບົດຈົບ</div>
        <div class="w-full h-full" ref="chartDomDonut">

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Models from '../../model/index.js';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';

const { nhost } = useNhost();



const totalUserCount = ref(0);
const totalStudentCount = ref(0);
const totalMajorCount = ref(0);
const totalThesisCount = ref(0);
const totalStaffCount = ref(0);

const chartDom = ref(null);
const chartDomDonut = ref(null);

async function loadTotalUserCount() {
  try {
    const resUser = await nhost.graphql.request(Models.User.countAll);
    if(resUser.error) throw new Error(resUser.error);
    totalUserCount.value = resUser.data.user_tb_aggregate.aggregate.count;
  } catch (error) {
    console.log("error accoured while load total list count => ", error);
  }
}

async function loadTotalStudentCount() {
  try {
    const resStudent = await nhost.graphql.request(Models.Student.countAll);
    if(resStudent.error) throw new Error(resStudent.error);
    totalStudentCount.value = resStudent.data.student_aggregate.aggregate.count;
  } catch (error) {
    console.log("error accoured while load total list count => ", error);
  }
}

async function loadTotalMajorCount() {
  try {
    const resMajor = await nhost.graphql.request(Models.Major.countAll);
    if(resMajor.error) throw new Error(resMajor.error);
    totalMajorCount.value = resMajor.data.major_aggregate.aggregate.count;
  } catch (error) {
    console.log("error accoured while load total list count => ", error);
  }
}

async function loadTotalThesisCount() {
  try {
    const resThesis = await nhost.graphql.request(Models.Thesis.countAll);
    if(resThesis.error) throw new Error(resThesis.error);
    totalThesisCount.value = resThesis.data.thesis_aggregate.aggregate.count;
  } catch (error) {
    console.log("error accoured while load total list count => ", error);
  }
}

async function loadTotalStaffCount() {
  try {
    const resStaff = await nhost.graphql.request(Models.Staff.countAll);
    if(resStaff.error) throw new Error(resStaff.error);
    totalStaffCount.value = resStaff.data.staff_aggregate.aggregate.count;
  } catch (error) {
    console.log("error accoured while load total list count => ", error);
  }
}

const option = {
  height: '300px',
  xAxis: {
    type: 'category',
    data: ['24/04', '25/04', '26/04', '27/04', '28/04', '29/04', '30/04', '31/04', '01/05', '02/05', '03/05', '04/05', '05/05']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [1, 0, 2, 3, 1, 2, 1, 0, 1, 2, 3, 2, 4],
      type: 'bar'
    }
  ]
};

const optionDonut = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '5%',
    left: 'center'
  },
  series: [
    {
      center: ['50%', '30%'],
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 648, name: 'ນັກສຶກສາ' },
        { value: 214, name: 'ອາຈານ' },
        { value: 72, name: 'ສະຖາບັນ' },
      ]
    }
  ]
};

function loadChart() {
  echarts.use([GridComponent, BarChart, CanvasRenderer])
  const myChart = echarts.init(chartDom.value);
  myChart.setOption(option);
}

function loadChartDonut() {
  echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
  ])
  const myChart = echarts.init(chartDomDonut.value);
  myChart.setOption(optionDonut);
}

onMounted( async () => {
  await Promise.all([
  loadTotalUserCount(),
  loadTotalStudentCount(),
  loadTotalMajorCount(),
  loadTotalThesisCount(),
  loadTotalStaffCount()
  ]);
  loadChart();
  loadChartDonut();
})


</script>