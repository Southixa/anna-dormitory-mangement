<template>
    <div>
        <NuxtLink :to="path">
            <div v-if="active" class="w-full bg-white bg-opacity-5 flex items-center px-4 py-2 rounded-lg gap-3 mt-4">
                <div class="h-8 w-8 flex justify-center items-center">
                    <Icon :name="icon" :size="size" color="white"/>
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-base">{{ name }}</p>
                </div>
            </div>
            <div v-else class="w-full opacity-60 flex items-center px-4 py-2 rounded-lg gap-3 mt-4">
                <div class="h-8 w-8 flex justify-center items-center">
                    <Icon :name="icon" :size="size" color="white"/>
                </div>
                <div class="grow">
                    <p class="text-white font-normal text-base">{{ name }}</p>
                </div>
            </div>
        </NuxtLink>
        
    </div>
</template>

<script setup>
// defineProps with default value
//defineProps(['name', 'icon', 'size', 'path'])

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: 24
    },
    path: {
        type: String,
        required: true,
        default: '/'
    },
    active: {
        type: Boolean,
        default: false
    }
})
</script>