import { View, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useRef, useEffect } from 'react'
import lottie from 'lottie-miniprogram' // 引入依赖
import './index.less'

export default function Index() {
  const animation = useRef(null)

  useEffect(() => {
    // 获取canvas组件
    Taro.createSelectorQuery().select('#lottie-canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')

      // 调用lottie的loadAnimation加载动画
      animation.current = lottie.loadAnimation({
        loop: true, // 是否循环播放
        autoplay: true, // 是否自动播放
        path: 'http://8.134.72.11',//lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
        rendererSettings: {
          context
        }
      })

      animation.current.addEventListener('loopComplete', () => {
        console.log("loopComplete")
      })
    }).exec();

    return () => {
      // 销毁动画
      animation.current.destroy()
    }
  }, [])

  return (
    <View className='index'>
      <Canvas id="lottie-canvas" type="2d" style={{ width: '300px', height: '300px' }}></Canvas>
    </View>
  )
}
