import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlShareAlt } from "react-icons/sl";

const ProjectSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const horizontalRef = useRef(null);
  const triggerRef = useRef(null);

  // Project images data
  const projectImages = [
    {
      id: 1,
      title: "Meta Game Website",
      imageSrc: "/images/project-1.png",
      url: "https://gaming-50q0.onrender.com/"

    },
    {
      id: 2,
      title: "3D Gaming Website",
      imageSrc: "/images/project-2.png",
      url :"https://gaming-website-cqgx.onrender.com/"

    },
    {
      id: 3,
      title: "English Portfolio",
      imageSrc: "/images/project-3.png",
      url: "https://morandini.online/"
    },
    {
      id: 4,
      title: "Japan Events",
      imageSrc: "/images/project-4.png",
      url: "https://eventsjp.com/"
    },
    {
      id: 5,
      title: "Game-Finder",
      imageSrc: "/images/project-5.png",
      url: "https://game-finder.online/"
    }
  
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
       }
    )

    // Title line animation
    gsap.fromTo(
      titleLineRef.current,
      { width: 0, opacity: 0 },
      { width: "100%", 
        opacity: 1, 
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Section entrance effect
    gsap.fromTo(
      triggerRef.current,
      {
        y: 100,
        rotationX: 20,
        opacity: 0
      },
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Paralax effect for the entire section
    gsap.fromTo(
      sectionRef.current,
      {
        backgroundPosition: "50% 0%",
      },
      {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )

    // Horizontal scrolling animation
    const horizontalScroll = gsap.to(".panel", {
      xPercent: -100 * (projectImages.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => {
          // Use a much larger multiplier for mobile to ensure last project scrolls far enough
          return `+=${horizontalRef.current.offsetWidth * 2.8}`;
        },
        pin: true,
        scrub: 2,
        snap: {
          snapTo: 1 / (projectImages.length - 1),
          duration: { min: 0.3, max: 0.5 },
          delay: 0.2
        }, 
        invalidateOnRefresh: true
      }
    })

    // Image animation
    const panels = gsap.utils.toArray(".panel")
    panels.forEach((panel) => {
      const image = panel.querySelector(".project-image");
      const imageTitle = panel.querySelector(".project-title");

      // Timleine for each panel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: "left right",
          end: "right left",
          scrub: true
        }
      })

      // Image scale and opacity animation
      tl.fromTo(image, { scale: 0, rotate: -20 }, { scale: 1, rotate: 1, duration: 0.5})

      // Title animation if it exists
      if (imageTitle) {
        tl.fromTo(imageTitle, { y: 30 }, { y: -100, duration: 0.3}, 0.2 )
      }

    })
  

  }, [projectImages.length]);

  return (
    <section
        ref={sectionRef}
        id="projects"
        className="relative py-20 bg-[#f6f6f6] overflow-hidden"
    >
      {/* Section title */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0">
          プロジェクト
        </h2>
        <div ref={titleLineRef} className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0">

        </div>
      </div>

      {/* Horizontal scroll section */}
      <div ref={triggerRef} className="overflow-hidden opacity-0">
        <div ref={horizontalRef} className="horizontal-section flex md:w-[400%] w-[500%]">

          {projectImages.map((project) => (
            <div loading key={project.id} className="panel relative flex items-center justify-center">
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p8 md:p-12">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    className="project-image max-w-full max-h-full rounded-2xl object-cover hover:opacity-80 transition-opacity duration-300"
                    src={project.imageSrc}
                    alt="Project-img"
                  />
                </a>
                <h2 className="project-title flex items-center gap-3 md:text-3xl text-sm md:font-bold text-black mt-6 z-50 text-nowrap hover:text-gray-400 transition-colors duration-300">
                  {project.title} <SlShareAlt />
                </h2>
                </div>
              </div>
          
          ))}

        </div>

      </div>
    </section>
  )
}

export default ProjectSection