import BannerCarousel from "./BannerCarousel";
import BannerMobile from "./BannerMobile";

export default function BannerGeral({ banners }){
    return (
        <>
            <BannerCarousel banners={banners}/>
            <BannerMobile banners={banners}/>
        </>
    )
}