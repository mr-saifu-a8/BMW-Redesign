import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const initTextSplit = (containerRef) => {
  const textElements = containerRef.querySelectorAll(
    ".col-3 h1, .col-3 p, .col-6 h1, .col-6 p"
  );

  textElements.forEach((element) => {
    if (element.querySelector(".line span")) return;

    const split = new SplitText(element, {
      type: "lines",
      linesClass: "line",
    });

    split.lines.forEach(
      (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
    );
  });
};

const StickyCols = () => {
  const stickyContainer = useRef(null);

  useEffect(() => {
    const container = stickyContainer.current;
    if (!container) return;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    initTextSplit(container);

    gsap.set(
      container.querySelectorAll(".col-3 .col-content-wrapper-2 .line span"),
      { y: "-125%" }
    );
    gsap.set(container.querySelector(".col-4"), { x: "100%", y: "100%" });

    gsap.set(container.querySelector(".col-5"), {
      x: "0%",
      y: "0%",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(container.querySelector(".col-5 .col-img-wrapper img"), {
      scale: 1.25,
    });

    gsap.set(container.querySelector(".col-6"), { x: "100%", y: "100%" });
    gsap.set(
      container.querySelectorAll(".col-6 .col-content-wrapper-2 .line span"),
      { y: "-125%" }
    );

    const totalDuration = window.innerHeight * 9;

    let currentPhase = 0;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container.querySelector(".sticky-cols"),
      start: "top top",
      end: `+=${totalDuration}px`,
      pin: true,
      pinSpacing: true,

      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= 0.1 && currentPhase === 0) {
          currentPhase = 1;

          gsap.to(container.querySelector(".col-1"), {
            opacity: 0,
            scale: 0.75,
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-3"), {
            x: "0%",
            y: "0%",
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-img-1 img"), {
            scale: 1.25,
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-img-2"), {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-img-2 img"), {
            scale: 1,
            duration: 0.75,
          });

          gsap.to(
            container.querySelector(".col-3 .col-content-wrapper-1 .line span"),
            { y: "-125%", duration: 0.75 }
          );
          gsap.to(
            container.querySelector(".col-3 .col-content-wrapper-2 .line span"),
            { y: "0%", duration: 0.75, delay: 0.5 }
          );
        } else if (progress >= 0.3 && currentPhase === 1) {
          currentPhase = 2;

          gsap.to(container.querySelector(".col-2"), {
            opacity: 0,
            scale: 0.75,
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-4"), {
            x: "0%",
            y: "0%",
            duration: 0.75,
          });
        } else if (progress >= 0.5 && currentPhase === 2) {
          currentPhase = 3;

          gsap.to(container.querySelector(".col-4"), {
            x: "100%",
            y: "100%",
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-5"), {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
            ease: "power2.out",
          });
          gsap.to(container.querySelector(".col-5 .col-img-wrapper img"), {
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
          });
        } else if (progress >= 0.7 && currentPhase === 3) {
          currentPhase = 4;

          gsap.to(container.querySelector(".col-3"), {
            x: "100%",
            y: "100%",
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-6"), {
            x: "0%",
            y: "0%",
            duration: 0.75,
          });

          gsap.to(
            container.querySelector(".col-6 .col-content-wrapper-1 .line span"),
            { y: "-125%", duration: 0.75 }
          );
          gsap.to(
            container.querySelector(".col-6 .col-content-wrapper-2 .line span"),
            { y: "0%", duration: 0.75, delay: 0.5 }
          );
        } else if (progress < 0.7 && currentPhase === 4) {
          currentPhase = 3;

          gsap.to(container.querySelector(".col-3"), {
            x: "0%",
            y: "0%",
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-6"), {
            x: "100%",
            y: "100%",
            duration: 0.75,
          });

          gsap.to(
            container.querySelector(".col-6 .col-content-wrapper-1 .line span"),
            { y: "0%", duration: 0.75, delay: 0.5 }
          );
          gsap.to(
            container.querySelector(".col-6 .col-content-wrapper-2 .line span"),
            { y: "-125%", duration: 0.75 }
          );
        } else if (progress < 0.5 && currentPhase === 3) {
          currentPhase = 2;

          gsap.to(container.querySelector(".col-4"), {
            x: "0%",
            y: "0%",
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-5"), {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.75,
            ease: "power2.in",
          });
          gsap.to(container.querySelector(".col-5 .col-img-wrapper img"), {
            scale: 1.25,
            duration: 0.75,
            ease: "power2.in",
          });
        } else if (progress < 0.3 && currentPhase === 2) {
          currentPhase = 1;

          gsap.to(container.querySelector(".col-2"), {
            opacity: 1,
            scale: 1,
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-4"), {
            x: "100%",
            y: "100%",
            duration: 0.75,
          });
        } else if (progress < 0.1 && currentPhase >= 1) {
          currentPhase = 0;

          gsap.to(container.querySelector(".col-1"), {
            opacity: 1,
            scale: 1,
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-3"), {
            x: "100%",
            y: "100%",
            duration: 0.75,
          });

          gsap.to(container.querySelector(".col-img-1 img"), {
            scale: 1,
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-img-2"), {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.75,
          });
          gsap.to(container.querySelector(".col-img-2 img"), {
            scale: 1.25,
            duration: 0.75,
          });

          gsap.to(
            container.querySelector(".col-3 .col-content-wrapper-1 .line span"),
            { y: "0%", duration: 0.75, delay: 0.5 }
          );
          gsap.to(
            container.querySelector(".col-3 .col-content-wrapper-2 .line span"),
            { y: "-125%", duration: 0.75 }
          );
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={stickyContainer}>
      <section className="sticky-cols h-screen w-screen relative p-2 text-black overflow-hidden">
        <div className="sticky-cols-wrapper relative w-full h-full">
          <div className="col col-1 absolute w-1/2 h-full top-0 left-0 will-change-transform">
            <div className="col-content relative w-full h-full">
              <div className="col-content-wrapper relative w-full h-full rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden">
                <h1 className="text-xl md:text-6xl font-medium w-[45vw] text-black">
                  The Ultimate Driving Machine
                </h1>
                <p className="text-2xl font-medium w-3/5 text-black">
                  BMW har car ko performance aur luxury ka perfect balance dene
                  ke liye banata hai. Chahe city drive ho ya highway ride, BMW
                  ki cars ek smooth aur powerful experience deti hain jo driver
                  ko ek alag hi level ka control aur confidence deti hai.
                </p>
              </div>
            </div>
          </div>

          <div className="col col-2 absolute w-1/2 h-full top-0 left-1/2 will-change-transform">
            <div className="col-img col-img-1 absolute w-full h-full top-0 left-0">
              <div className="col-img-wrapper relative w-full h-full bg-gray-800 rounded-[3rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJtd3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="Interior image 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-img col-img-2 absolute w-full h-full top-0 left-0 clip-polygon-hidden">
              <div className="col-img-wrapper relative w-full h-full bg-gray-800 rounded-[3rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1612603810075-b714656621d6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxibXd8ZW58MHx8MHx8fDA%3D"
                  alt="Interior image 2"
                  className="w-full h-full object-cover scale-[1.25]"
                />
              </div>
            </div>
          </div>

          <div className="col col-3 absolute w-1/2 h-full will-change-transform translate-x-full translate-y-full p-2">
            <div className="col-content relative w-full h-full">
              <div className="sticky-cols-wrapper relative w-full h-full">
                <div className="col col-1 absolute w-1/2 h-full top-0 left-0 will-change-transform">
                  <div className="col-content relative w-full h-full">
                    <div className="col-content-wrapper relative w-full h-full rounded-[3rem] p-10 flex flex-col justify-between ">
                      <h1 className="text-xl md:text-6xl font-medium w-[45vw] text-black">
                        Precision Engineering at Its Best
                      </h1>
                      <p className="text-2xl font-medium w-[45vw] text-black">
                        BMW apni German engineering ke liye world-famous hai.
                        Har car me advanced technology, aerodynamics aur premium
                        materials ka perfect combination hota hai, jo long-term
                        durability aur unmatched performance ensure karta hai.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col col-4 absolute w-1/2 h-full top-0 left-1/2 will-change-transform translate-x-full translate-y-full p-2">
            <div className="col-img relative w-full h-full">
              <div className="col-img-wrapper relative w-full h-full bg-gray-800 rounded-[3rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1749566710691-f959646d0330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGJtdyUyMHJlZHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Interior image 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="col col-5 absolute w-1/2 h-full top-0 left-1/2 will-change-transform p-2">
            <div className="col-img relative w-full h-full">
              <div className="col-img-wrapper relative w-full h-full bg-gray-800 rounded-[3rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Interior image 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="col col-6 absolute w-1/2 h-full will-change-transform translate-x-full translate-y-full p-2">
            <div className="col-content relative w-full h-full">
              <div className="col-content-wrapper relative w-full h-full rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden">
                <div className="col col-1 absolute w-1/2 h-full top-0 left-0 will-change-transform">
                  <div className="col-content relative w-full h-full">
                    <div className="col-content-wrapper relative w-full h-full rounded-[3rem] p-10 flex flex-col justify-between">
                      <h1 className="text-xl md:text-6xl font-medium w-[45vw] text-black">
                        Design That Defines Elegance
                      </h1>
                      <p className="text-2xl font-medium w-[45vw] text-black">
                        BMW cars ka design sirf dekhne me hi nahi, experience
                        karne me bhi classy hota hai. Bold lines, signature
                        kidney grille, aur dynamic LED lights har model ko ek
                        modern aur elegant identity dete hain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StickyCols;
