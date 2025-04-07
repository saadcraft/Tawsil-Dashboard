import React, { useEffect } from 'react'
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { StatsCard } from './carte';
import {
    MdMap,
    MdOutlineDeliveryDining,
    MdOutlineDesktopMac,
    MdOutlineFactCheck,
    MdOutlineLocalTaxi,
    MdOutlineStorefront,
    MdSupervisorAccount,
    MdSupportAgent
} from 'react-icons/md';
import { GrUserWorker } from 'react-icons/gr';

export default function Satistic({ data }: { data: Context | null }) {

    useEffect(() => {

        const createSplide = () => {
            const screenWidth = window.innerWidth;
            let perPage = 5;

            if (screenWidth < 560) {
                perPage = 1;
            } else if (screenWidth < 850) {
                perPage = 2;
            } else if (screenWidth < 1150) {
                perPage = 3;
            }
            else if (screenWidth < 1700) {
                perPage = 4;
            }

            return new Splide('#splide', {
                perPage: perPage,
                type: 'loop',
                autoplay: true,
                arrows: false,
                gap: 30,
            }).mount();
        };

        let splide = createSplide();

        const handleResize = () => {
            splide.destroy(); // Destroy the current instance
            splide = createSplide(); // Recreate with updated settings
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            splide.destroy(); // Clean up on unmount
        };

    }, []);


    return (
        <div className='bg-white rounded-lg '>
            <div id="splide" className='splide pb-10 px-5'>
                <div className="splide__track">
                    <ul className="splide__list">
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Chef bureux' value={data?.total_users_chef_bureux.toString() || 'NaN'} icon={<MdOutlineDesktopMac />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Agent administratif' value={data?.tolat_users_agents.toString() || 'NaN'} icon={<GrUserWorker />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Centre d&apos;appel' value={data?.total_users_centre_appel.toString() || 'NaN'} icon={<MdSupportAgent />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Livreur' value={data?.total_partners__livreur.toString() || 'NaN'} icon={<MdOutlineDeliveryDining />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Magasin' value={data?.total_partners__magasin.toString() || 'NaN'} icon={<MdOutlineStorefront />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Choffeur' value={data?.total_partners__choffeur.toString() || 'NaN'} icon={<MdOutlineLocalTaxi />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Superviseurs' value={data?.total_users_superviseurs.toString() || 'NaN'} icon={<MdSupervisorAccount />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Courses' value={data?.total_courses.toString() || 'NaN'} icon={<MdMap />} />
                            </div>
                        </li>
                        <li className="splide__slide bg-opacity-30 py-5 rounded-lg">
                            <div className='slide_carte'>
                                <StatsCard title='Validation' value={data?.total_users_validation.toString() || 'NaN'} icon={<MdOutlineFactCheck />} />
                            </div>
                        </li>
                    </ul>
                </div >
            </div >
        </div >
    )
}
