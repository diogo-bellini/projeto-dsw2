export default function BannerCarousel({ banners }){
    return(
        <div className="hidden md:flex overflow-x-auto hide-scrollbar space-x-12 px-6 mb-12">
            {banners.map((banner) => (
                <img src={banner.url} alt="" />
            ))}
        </div>
    )
}