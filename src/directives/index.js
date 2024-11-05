// 引入懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    // 自定义图片懒加载指令
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 当前div元素 binding：指令传递的值
        // console.log(el, binding);
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            // isIntersecting: 目标可见性（布尔值）
            console.log('isIntersecting:', isIntersecting);
            if (isIntersecting) {
              // 图片可见，加载图片地址
              el.src = binding.value
              // 停止监听，优化性能
              stop()
            }
          },
        )
      }
    })
  }
}
