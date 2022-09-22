import { useEffect, useState } from "react"
import { unsplashService } from "../../services/unsplash.service"
import { Loader } from "../loader"

export const SideMenuPhotos = () => {
    const [photos, setPhotos] = useState(null)

    const getPhotos = async () => {
        const photos = await unsplashService.getPhotos()
        setPhotos(photos)
    }

    useEffect(() => {
        getPhotos()
        .catch(console.log('Cant get photos'))
    },[])


    if(!photos) return <Loader/>
    return <section className="side-menu-photos">
        <input/>
        <section className="photo-list">
            {
                photos.map(photo => <div className="display" style={{ background:`url('${photo.background}') center center / cover` }}></div>)
            }
        </section>
    </section>
    
}