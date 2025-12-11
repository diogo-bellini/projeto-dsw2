import { useEffect, useState } from "react";

export default function BannerMobile ({ banners }) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % banners.length);
                setFade(false)
            }, 700)
        }, 3000)
        return () => clearInterval(interval)
    }, [banners.length]);

    if (!banners || banners.length === 0) return null;

    return (
        <div className="mb-12 md:hidden">
      <img
        src={banners[index].url}
        alt=""
        className={`object-cover h-full w-full transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
    )
}