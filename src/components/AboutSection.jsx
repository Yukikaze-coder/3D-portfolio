import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const introRef = useRef(null);
    const starsRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Capture the current ref value
        const currentSection = sectionRef.current;
        
        // Title animation
        gsap.fromTo(
            titleRef.current,
            { y: 100, opacity: 0 },
            { 
                y: -300, 
                opacity: 1, 
                duration: 0.8, 
                scrollTrigger: { 
                    trigger: currentSection,
                    start: "top 40%",
                    toggleActions: "play none none reverse"
                }
            }
        )
        // Intro animation
        gsap.fromTo(
            introRef.current,
            { y: 100, opacity: 0, filter: "blur(10px)" },
            {
                y: -400,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.5,
                scrollTrigger: {
                    trigger: currentSection,
                    start: "top 40%",
                    toggleActions: "play none none reverse"
                }
            }
        )
        // Stars animation with different speeds and directions
        starsRef.current.forEach((star, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const speed = 0.5 + Math.random() * 0.5;

            gsap.to(star, {
                x: `+=${direction * (100 + index * 20)}`,
                y: `+=${direction * -50 + index * 10}`,
                rotation:  direction * 360,
                ease: "none",
                scrollTrigger: {
                    trigger: currentSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: speed
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars?.trigger === currentSection) {
                    trigger.kill();
                }
            });
        };
    });

    const addToStars = (el) => {
        if (el && !starsRef.current.includes(el)) {
            starsRef.current.push(el);
        }
    };

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50]">
        <div className="absolute inset-0 overflow-hidden">
            {/* Stars */}
            {[...Array(10)].map((_, index) => (
                <div 
                ref={addToStars}
                key={`star-${index}`} 
                className="absolute rounded-full"
                style={{
                    width: `${10 + index * 3}px`,
                    height: `${10 + index * 3}px`,
                    backgroundColor: "white",
                    opacity: 0.2 + Math.random() * 0.4,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                }}
                />
            ))}
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0">
                私について
            </h1>
        </div>

        <div ref={ introRef } className="absolute lg:bottom-[-20rem] md:bottom-[-10rem] bottom-[-20rem] left-0 w-full flex md:flex-row flex-col justify-between lg:px-24 px-5 items-center opacity-0">
            <h3 className="text-sm md:text-2xl font-bold text-purple-200 z-50 lg:max-w-[45rem] max-w-[27rem] tracking-wider md:mt-20 sm:mt-[-40rem] mt-[-32rem]">
                私は情熱的なウェブ開発者であり、高速で信頼性が高く、本番環境に対応したウェブサイトとウェブアプリケーションの開発に注力しています。私の得意分野は、クリーンなコード、明確なコミュニケーション、そして納期厳守です。クライアントのニーズを満たすだけでなく、期待を超える堅牢なソリューションを構築することにやりがいを感じています。
            </h3>
            <img className="lg:h-[40rem] md:h-[25rem] h-[20rem] mix-blend-lighten" src="images/person.png" alt="profile-img" />
        </div>
    </section>
  )
}

export default AboutSection