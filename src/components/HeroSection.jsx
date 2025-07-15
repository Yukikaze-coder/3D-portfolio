import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  return (
    <section id="home" className="h-screen bg-gradient-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">

        {/* Left section */}
        <div className="z-40 xl:mb-0 mb-[20%]">
            <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ 
                type: "spring",
                stiffness: 40,
                damping: 25,
                delay: 1.3,    
                duration: 0.8
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6">
                迅速な構築 <br /> 信頼性の高い結果
            </motion.h1>

            <motion.p 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ 
                type: "spring",
                stiffness: 40,
                damping: 25,
                delay: 1.8,    
                duration: 0.8
            }}
            className="text-xl md:text-1xl lg:text-2xl text-purple-200 max-w-2xl">
                堅牢で本番環境に対応したWebサイト・Webアプリケーションをスピードと精度をもって開発します。すべてのプロジェクトで、クリーンなコード、明確なコミュニケーション、そして納期厳守をお約束します。

            </motion.p>

        </div>

        {/* Right section */}
        <Spline className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0"
        scene="https://prod.spline.design/eu8ydTm5qMXIyxbH/scene.splinecode" />

    </section>
  )
}

export default HeroSection


