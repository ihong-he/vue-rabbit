import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'
// 封装倒计时逻辑函数
export const useCountDown = () => {
    // 倒计时时间
    const time = ref(0)
    let timer = ref(null)
    // 格式化时间 为 xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 开始倒计时
    const startCountDown = (currentTime) => {

        // 开始倒计时的逻辑
        // 核心逻辑的编写：每隔1s就减一
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }

    onUnmounted(() => {
        timer && clearInterval(timer)
    })

    return {
        formatTime,
        startCountDown
    }
}