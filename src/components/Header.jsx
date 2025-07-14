import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { TbFileCv } from "react-icons/tb";
import emailjs from '@emailjs/browser';


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen)

    const [ contactFormOpen, setContactFormOpen] = useState(false);
    const openContactForm = () => setContactFormOpen(true);
    const closeContactForm = () => setContactFormOpen(false);

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
            console.error('EmailJS send error:', error);
            setSubmitStatus('error');
        } finally {
            setIsLoading(false);
        }
    };
    // Navigation scroll handler
    const scrollToSection = (sectionId) => {
        // Try to scroll after menu closes (for mobile)
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // fallback: use anchor navigation
                window.location.hash = `#${sectionId}`;
            }
        }, 100);
    };
    // Navigation items with their corresponding section IDs
    const navItems = [
        { name: "ホーム", id: "home" },
        { name: "アバウト", id: "about" },
        { name: "プロジェクト", id: "projects" },
        { name: "お問い合わせ", id: "contact" }
    ];
    
    
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-sm">

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">

        {/* Logo/name */}
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 25, 
            delay: 0.3, 
            duration: 1.2 
        }}
        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-300"
        onClick={() => scrollToSection('home')}>

          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
            ML
            </div>

        <span className="font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent text-base sm:text-xl whitespace-nowrap">
            モランディニ・ルイ－ジ
        </span>
          
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="lg:flex hidden space-x-8">
            {navItems.map((item, index) => (
                <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20, delay: 0.7 + index * 0.2 
                }}
                className="relative text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group"
                onClick={() => scrollToSection(item.id)}>
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
            ))}
        </nav>

        {/* Social icons - Desktop */}
        <div className="md:flex hidden items-center space-x-4">

            <motion.a 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ 
                delay: 1.3, duration: 0.8
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://www.linkedin.com/in/luigi-morandini-22307b34b/?locale=ja_JP" target="_blank" rel="noopener noreferrer">
                <FiLinkedin className="w-5 h-5"/>
            </motion.a>

            <motion.a 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ 
                delay: 1.3, duration: 0.8
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://github.com/Yukikaze-coder" target="_blank" rel="noopener noreferrer">
                <FiGithub className="w-5 h-5"/>
            </motion.a>

            <motion.a 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ 
                delay: 1.3, duration: 0.8
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://flowcv.com/resume/8q0nsf6hqf40" target="_blank" rel="noopener noreferrer">
                <TbFileCv className="w-5 h-5"/>
            </motion.a>

        </div>

        <div>

        {/* Contact Button */}
        <motion.button
        onClick={openContactForm}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
            delay: 1.6, 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
         }}
         className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500">
            Contact
        </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            <motion.button
            whileTap={{ scale: 0.7 }} 
            onClick={toggleMenu}
            className="text-gray-300">

                { isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </motion.button>
        </div>

    </div>
   
    {/* Mobile Menu */}
    <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ 
        opacity: isOpen ? 1 : 0, 
        height: isOpen ? "auto" : 0 
    }}
    transition={{ duration: 0.5 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5">
            <nav className="flex flex-col space-y-3">
                 {navItems.map((item) => (
                    <button 
                        key={item.name}
                        onClick={() => {
                            scrollToSection(item.id);
                            toggleMenu();
                        }} 
                        className="text-gray-300 font-medium py-2 text-left">
                        {item.name}
                    </button>
                 ))}
            </nav>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-5">
                    <a href="https://www.linkedin.com/in/luigi-morandini-22307b34b/?locale=ja_JP" target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className="h-5 w-5 text-gray-300"/>
                    </a>
                    <a href="https://github.com/Yukikaze-coder" target="_blank" rel="noopener noreferrer">
                        <FiGithub className="h-5 w-5 text-gray-300"/>
                    </a>
                    <a href="https://flowcv.com/resume/8q0nsf6hqf40" target="_blank" rel="noopener noreferrer">
                        <TbFileCv className="h-5 w-5 text-gray-300"/>
                    </a>
                </div>

                <button 
                onClick={() => {
                    toggleMenu()
                    openContactForm()
                }}
                className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold">
                    お問い合わせ
                </button>
            </div>
        </motion.div>

        {/* Contact Form */}
        <AnimatePresence>
        {contactFormOpen && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 min-h-screen bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center"
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

                        {/* Input forms */}
                        <form onSubmit={handleSubmit}>
                            <div>
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

                            <div>
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

                            <div>
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

                            {/* Status messages */}
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


    </header>
  )
}

export default Header
