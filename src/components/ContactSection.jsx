import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
    // Contact modal state
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const openContactForm = () => {
        setContactFormOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const closeContactForm = () => {
        setContactFormOpen(false);
        document.body.style.overflow = 'unset';
    };

    // Contact form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus('');
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => {
                setSubmitStatus('');
                closeContactForm();
            }, 2000);
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsLoading(false);
        }
    };
    // Main refs
    const circleRef = useRef(null);
    const sectionRef = useRef(null);
    const initialTextRef = useRef(null);
    const finalTextRef = useRef(null);

    useEffect(() => {
        // Register Gsap plugin
        gsap.registerPlugin(ScrollTrigger);

        // make sure all ScrollTrigger instances are properly killed
        const cleanUp = () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.vars.trigger === sectionRef.current) {
                    st.kill();
                }
            });
        }

        // Clean up any existing ScrollTrigger
        cleanUp();

        // Set initial states
        gsap.set(circleRef.current, { scale: 1, backgroundColor: "white" });
        gsap.set(initialTextRef.current, { opacity: 1 });
        gsap.set(finalTextRef.current, { opacity: 0 });

        // Create the main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true
            }
        });

        // Initial state to mid-zoom (0-50%)
        tl.to(circleRef.current, 
            {
                scale: 5,
                backgroundColor: "#9333EA",
                ease: "power1.inOut",
                duration: 0.5
            }, 0
        );

        // Fade out initial text during first half
        tl.to(initialTextRef.current,
            {
                opacity: 0,
                ease: "power1.inOut",
                duration: 0.2
            }, 0.1
        );

        // Mid-zoom to final state (50-100%)
        tl.to(
            circleRef.current,
            {
                scale: 17,
                backgroundColor: "#E9D5FF",
                boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
                ease: "power2.inOut",
                duration: 0.5
            }, 0.5
        );

        // Fade in final text duuring second half
        tl.to(
            finalTextRef.current,
            {
                opacity: 1,
                ease: "power2.inOut",
                duration: 0.2,
            }, 0.7
        );

        // Return clean up function
        return () => {
            cleanUp();
            // Restore scroll if component unmounts while modal is open
            document.body.style.overflow = 'unset';
        };
    }, [])

  return (
    <section id="contact"
        ref={sectionRef}
        className="flex items-center justify-center bg-black relative"
        style={{ overscrollBehavior: "none" }}
    >

        {/* Simple circle with minimal nesting */}
        <div
            ref={circleRef}
            className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-gradient-to-r from-violet-400 to-pink-100"
        >
            {/* Initial text */}
            <p
                ref={initialTextRef} 
                className="text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center"   
            >
                Scroll down
            </p>

            {/* Final text */}
            <div
                ref={finalTextRef}
                className="text-center relative flex flex-col items-center justify-center opacity-0"
            >
                <h1 className="text-black md:w-[10rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-5">
                    未来へ踏み出そう
                </h1>

                <p className="text-black lg:w-[40rem] w-[20rem] absolute sm:mt-3 mt-1 md:scale-[0.1] scale-[0.068]">
                    フルスタック開発者であり、React、Tailwind CSS、および高度なUIアニメーション技術を使用して、モダンでレスポンシブなウェブインターフェースを構築することに特化しています。クリーンなコードと、際立つピクセルパーフェクトなデザインに焦点を当てています。
                    Node.js、Express、PostgreSQLなどのバックエンド技術の実践経験があります。RESTful APIの構築、サーバーサイドロジックの処理、データベース管理に精通しています。
                </p>

                <button
                    className="px-10 py-2 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-500 scale-[0.1] absolute sm:mt-9 mt-7 text-nowrap"
                    onClick={openContactForm}
                >
                    お問い合わせ
                </button>

            </div>

        </div>

        {/* Contact Modal (copied from Header) */}
        <AnimatePresence>
        {contactFormOpen && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 min-h-screen bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            >
                <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 30 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    duration: 0.8
                }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-300">
                            お問い合わせ
                        </h1>
                        <button onClick={closeContactForm}>
                            <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                        </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    名前
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="あなたの名前"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="あなたのメール"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                    メッセージ
                                </label>
                                <textarea
                                    rows="4"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="あなたのメッセージ"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            {submitStatus === 'success' && (
                                <div className="mb-4 p-2 bg-green-500/20 border border-green-500 rounded text-green-300 text-sm">
                                    メッセージが正常に送信されました！
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
                                    エラーが発生しました。もう一度お試しください。
                                </div>
                            )}
                            <motion.button 
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: isLoading ? 1 : 1.03 }}
                                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                                className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? '送信中...' : 'メッセージを送信'}
                            </motion.button>
                        </form>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    </section>
  )
}

export default ContactSection